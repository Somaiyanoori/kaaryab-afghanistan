"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Lightbulb,
  Plus,
  Trash2,
  Download,
  Layout,
  Sparkles,
  Eye,
  Edit3,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

import { useCVStore } from "../../store/index.js";
import { sampleCVData, cvTemplates } from "../../data/cvSampleData.js";
import ConfirmModal from "../../components/shared/ConfirmModal.jsx";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Select from "../../components/ui/Select.jsx";
import ModernTemplate from "../../components/cv-builder/templates/ModernTemplate.jsx";
import ClassicTemplate from "../../components/cv-builder/templates/ClassicTemplate.jsx";
import MinimalTemplate from "../../components/cv-builder/templates/MinimalTemplate.jsx";
import ProfessionalTemplate from "../../components/cv-builder/templates/ProfessionalTemplate.jsx";
import { cn, generateId } from "../../lib/utils.js";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const LANGUAGE_LEVELS = ["Basic", "Conversational", "Fluent", "Native"];

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
};

export default function CVBuilderPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [activeSection, setActiveSection] = useState("personal");
  const [showTemplateSelect, setShowTemplateSelect] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const cvData = useCVStore((state) => state.cvData);
  const selectedTemplate = useCVStore((state) => state.selectedTemplate);
  const updatePersonal = useCVStore((state) => state.updatePersonal);
  const addSection = useCVStore((state) => state.addSection);
  const updateSection = useCVStore((state) => state.updateSection);
  const removeSection = useCVStore((state) => state.removeSection);
  const setTemplate = useCVStore((state) => state.setTemplate);
  const clearCV = useCVStore((state) => state.clearCV);
  const loadSampleData = useCVStore((state) => state.loadSampleData);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const loadingToast = toast.loading("Generating your PDF...");

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("cv-preview-content");

      if (!element) {
        toast.dismiss(loadingToast);
        toast.error("CV content not found");
        setIsDownloading(false);
        return;
      }

      // Save original parent state
      const parentContainer = element.closest(".cv-preview-container");
      const grandParent = element.closest(".cv-preview-wrapper");
      const mainContainer = element.closest(".lg\\:block");

      // Save all original styles
      const originalStyles = {
        elementTransform: element.style.transform,
        elementDisplay: element.style.display,
        parentDisplay: parentContainer?.style.display,
        grandParentDisplay: grandParent?.style.display,
        mainDisplay: mainContainer?.style.display,
      };

      // FORCE everything to be visible for capture
      if (mainContainer) mainContainer.style.display = "block";
      if (grandParent) grandParent.style.display = "block";
      if (parentContainer) parentContainer.style.display = "block";
      element.style.display = "block";
      element.style.transform = "none";

      // Wait for browser to render
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Take screenshot
      const canvas = await html2canvas(element, {
        scale: 1.5,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 794, // A4 width in pixels at 96 DPI
        windowWidth: 794,
      });

      // Restore all original styles
      element.style.transform = originalStyles.elementTransform;
      element.style.display = originalStyles.elementDisplay;
      if (parentContainer)
        parentContainer.style.display = originalStyles.parentDisplay || "";
      if (grandParent)
        grandParent.style.display = originalStyles.grandParentDisplay || "";
      if (mainContainer)
        mainContainer.style.display = originalStyles.mainDisplay || "";

      const imgData = canvas.toDataURL("image/jpeg", 0.85);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST",
      );

      const fileName = cvData.personal.fullName
        ? `${cvData.personal.fullName.replace(/\s+/g, "-")}-CV.pdf`
        : "My-CV-KaarYab.pdf";

      pdf.save(fileName);

      toast.dismiss(loadingToast);
      toast.success("CV downloaded successfully!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to generate PDF. Please try again.");
      console.error("PDF Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLoadSample = () => {
    loadSampleData(sampleCVData);
    toast.success("Sample data loaded!");
  };

  const handleClearAll = () => {
    clearCV();
    toast.success("CV cleared successfully");
  };

  const SECTIONS = [
    { id: "personal", label: "Personal", icon: User },
    { id: "experiences", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Award },
    { id: "languages", label: "Languages", icon: Globe },
    { id: "projects", label: "Projects", icon: Lightbulb },
    { id: "certifications", label: "Certifications", icon: Sparkles },
  ];

  const TemplateComponent = TEMPLATES[selectedTemplate] || ModernTemplate;

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* HERO HEADER */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-8 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative container-custom">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full"
              >
                <Sparkles size={14} className="text-yellow-400" />
                <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
                  Free CV Builder
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-white mb-2"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Build Your <span className="gradient-text">CV</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-300 text-sm md:text-base"
              >
                Create a professional resume in minutes. Choose a template and
                start building.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <Button
                variant="glass"
                size="md"
                icon={Sparkles}
                onClick={handleLoadSample}
              >
                Load Sample
              </Button>

              <button
                onClick={() => setShowClearModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 text-sm font-semibold rounded-xl transition-colors"
              >
                <Trash2 size={16} />
                <span>Clear All</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MOBILE TABS */}
      <div className="sticky top-16 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 lg:hidden">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab("edit")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors",
                activeTab === "edit"
                  ? "bg-yellow-500 text-gray-900"
                  : "text-gray-600 dark:text-gray-400",
              )}
            >
              <Edit3 size={14} />
              Edit
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors",
                activeTab === "preview"
                  ? "bg-yellow-500 text-gray-900"
                  : "text-gray-600 dark:text-gray-400",
              )}
            >
              <Eye size={14} />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="bg-gray-50 dark:bg-slate-950 py-8 min-h-screen">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT: FORM */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={cn(
                "lg:block",
                activeTab === "edit" ? "block" : "hidden",
              )}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 mb-4 border border-gray-100 dark:border-slate-700">
                <div className="hidden md:grid grid-cols-7 gap-1">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg text-[10px] font-semibold transition-colors",
                          activeSection === section.id
                            ? "bg-yellow-500 text-gray-900"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700",
                        )}
                      >
                        <Icon size={16} />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="md:hidden flex gap-1 overflow-x-auto scrollbar-hide">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0",
                          activeSection === section.id
                            ? "bg-yellow-500 text-gray-900"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700",
                        )}
                      >
                        <Icon size={14} />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                {activeSection === "personal" && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        required
                        value={cvData.personal.fullName}
                        onChange={(e) =>
                          updatePersonal({
                            ...cvData.personal,
                            fullName: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Job Title"
                        value={cvData.personal.jobTitle}
                        onChange={(e) =>
                          updatePersonal({
                            ...cvData.personal,
                            jobTitle: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Email"
                        type="email"
                        required
                        value={cvData.personal.email}
                        onChange={(e) =>
                          updatePersonal({
                            ...cvData.personal,
                            email: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Phone"
                        value={cvData.personal.phone}
                        onChange={(e) =>
                          updatePersonal({
                            ...cvData.personal,
                            phone: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="City"
                        value={cvData.personal.city}
                        onChange={(e) =>
                          updatePersonal({
                            ...cvData.personal,
                            city: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Website"
                        value={cvData.personal.website}
                        onChange={(e) =>
                          updatePersonal({
                            ...cvData.personal,
                            website: e.target.value,
                          })
                        }
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="LinkedIn"
                          value={cvData.personal.linkedin}
                          onChange={(e) =>
                            updatePersonal({
                              ...cvData.personal,
                              linkedin: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Textarea
                          label="Professional Summary"
                          value={cvData.personal.summary}
                          onChange={(e) =>
                            updatePersonal({
                              ...cvData.personal,
                              summary: e.target.value,
                            })
                          }
                          rows={4}
                          maxLength={500}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "experiences" && (
                  <DynamicSection
                    title="Work Experience"
                    items={cvData.experiences}
                    onAdd={() =>
                      addSection("experiences", {
                        id: generateId("exp"),
                        position: "",
                        company: "",
                        location: "",
                        startDate: "",
                        endDate: "",
                        current: false,
                        description: "",
                      })
                    }
                    onRemove={(id) => removeSection("experiences", id)}
                    renderItem={(item) => (
                      <>
                        <Input
                          label="Position"
                          value={item.position}
                          onChange={(e) =>
                            updateSection("experiences", item.id, {
                              position: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Company"
                          value={item.company}
                          onChange={(e) =>
                            updateSection("experiences", item.id, {
                              company: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Location"
                          value={item.location}
                          onChange={(e) =>
                            updateSection("experiences", item.id, {
                              location: e.target.value,
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            label="Start Date"
                            type="month"
                            value={item.startDate}
                            onChange={(e) =>
                              updateSection("experiences", item.id, {
                                startDate: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="End Date"
                            type="month"
                            value={item.endDate}
                            onChange={(e) =>
                              updateSection("experiences", item.id, {
                                endDate: e.target.value,
                              })
                            }
                            disabled={item.current}
                          />
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={item.current}
                            onChange={(e) =>
                              updateSection("experiences", item.id, {
                                current: e.target.checked,
                              })
                            }
                            className="w-4 h-4 accent-yellow-500"
                          />
                          <span>Currently working here</span>
                        </label>
                        <Textarea
                          label="Description"
                          value={item.description}
                          onChange={(e) =>
                            updateSection("experiences", item.id, {
                              description: e.target.value,
                            })
                          }
                        />
                      </>
                    )}
                  />
                )}

                {activeSection === "education" && (
                  <DynamicSection
                    title="Education"
                    items={cvData.education}
                    onAdd={() =>
                      addSection("education", {
                        id: generateId("edu"),
                        degree: "",
                        field: "",
                        school: "",
                        location: "",
                        startDate: "",
                        endDate: "",
                        gpa: "",
                        description: "",
                      })
                    }
                    onRemove={(id) => removeSection("education", id)}
                    renderItem={(item) => (
                      <>
                        <Input
                          label="Degree"
                          value={item.degree}
                          onChange={(e) =>
                            updateSection("education", item.id, {
                              degree: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Field of Study"
                          value={item.field}
                          onChange={(e) =>
                            updateSection("education", item.id, {
                              field: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="School"
                          value={item.school}
                          onChange={(e) =>
                            updateSection("education", item.id, {
                              school: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Location"
                          value={item.location}
                          onChange={(e) =>
                            updateSection("education", item.id, {
                              location: e.target.value,
                            })
                          }
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            label="Start"
                            type="month"
                            value={item.startDate}
                            onChange={(e) =>
                              updateSection("education", item.id, {
                                startDate: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="End"
                            type="month"
                            value={item.endDate}
                            onChange={(e) =>
                              updateSection("education", item.id, {
                                endDate: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="GPA"
                            value={item.gpa}
                            onChange={(e) =>
                              updateSection("education", item.id, {
                                gpa: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                )}

                {activeSection === "skills" && (
                  <DynamicSection
                    title="Skills"
                    items={cvData.skills}
                    onAdd={() =>
                      addSection("skills", {
                        id: generateId("skill"),
                        name: "",
                        level: "Intermediate",
                      })
                    }
                    onRemove={(id) => removeSection("skills", id)}
                    renderItem={(item) => (
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          label="Skill Name"
                          value={item.name}
                          onChange={(e) =>
                            updateSection("skills", item.id, {
                              name: e.target.value,
                            })
                          }
                        />
                        <Select
                          label="Level"
                          value={item.level}
                          onChange={(e) =>
                            updateSection("skills", item.id, {
                              level: e.target.value,
                            })
                          }
                          options={SKILL_LEVELS}
                          placeholder=""
                        />
                      </div>
                    )}
                  />
                )}

                {activeSection === "languages" && (
                  <DynamicSection
                    title="Languages"
                    items={cvData.languages}
                    onAdd={() =>
                      addSection("languages", {
                        id: generateId("lang"),
                        name: "",
                        proficiency: "Conversational",
                      })
                    }
                    onRemove={(id) => removeSection("languages", id)}
                    renderItem={(item) => (
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          label="Language"
                          value={item.name}
                          onChange={(e) =>
                            updateSection("languages", item.id, {
                              name: e.target.value,
                            })
                          }
                        />
                        <Select
                          label="Proficiency"
                          value={item.proficiency}
                          onChange={(e) =>
                            updateSection("languages", item.id, {
                              proficiency: e.target.value,
                            })
                          }
                          options={LANGUAGE_LEVELS}
                          placeholder=""
                        />
                      </div>
                    )}
                  />
                )}

                {activeSection === "projects" && (
                  <DynamicSection
                    title="Projects"
                    items={cvData.projects}
                    onAdd={() =>
                      addSection("projects", {
                        id: generateId("proj"),
                        name: "",
                        description: "",
                        link: "",
                        technologies: [],
                      })
                    }
                    onRemove={(id) => removeSection("projects", id)}
                    renderItem={(item) => (
                      <>
                        <Input
                          label="Project Name"
                          value={item.name}
                          onChange={(e) =>
                            updateSection("projects", item.id, {
                              name: e.target.value,
                            })
                          }
                        />
                        <Textarea
                          label="Description"
                          value={item.description}
                          onChange={(e) =>
                            updateSection("projects", item.id, {
                              description: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Link"
                          value={item.link}
                          onChange={(e) =>
                            updateSection("projects", item.id, {
                              link: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Technologies (comma separated)"
                          value={item.technologies.join(", ")}
                          onChange={(e) =>
                            updateSection("projects", item.id, {
                              technologies: e.target.value
                                .split(",")
                                .map((t) => t.trim())
                                .filter(Boolean),
                            })
                          }
                        />
                      </>
                    )}
                  />
                )}

                {activeSection === "certifications" && (
                  <DynamicSection
                    title="Certifications"
                    items={cvData.certifications}
                    onAdd={() =>
                      addSection("certifications", {
                        id: generateId("cert"),
                        name: "",
                        issuer: "",
                        date: "",
                        link: "",
                      })
                    }
                    onRemove={(id) => removeSection("certifications", id)}
                    renderItem={(item) => (
                      <>
                        <Input
                          label="Certificate Name"
                          value={item.name}
                          onChange={(e) =>
                            updateSection("certifications", item.id, {
                              name: e.target.value,
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            label="Issuer"
                            value={item.issuer}
                            onChange={(e) =>
                              updateSection("certifications", item.id, {
                                issuer: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="Date"
                            type="month"
                            value={item.date}
                            onChange={(e) =>
                              updateSection("certifications", item.id, {
                                date: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                )}
              </div>
            </motion.div>

            {/* RIGHT: PREVIEW */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={cn(
                "lg:block",
                activeTab === "preview" ? "block" : "hidden",
              )}
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="md"
                  icon={Layout}
                  onClick={() => setShowTemplateSelect(true)}
                >
                  Change Template
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  icon={Download}
                  onClick={handleDownloadPDF}
                  isLoading={isDownloading}
                >
                  {isDownloading ? "Downloading..." : "Download PDF"}
                </Button>
              </div>

              <div className="cv-preview-wrapper lg:sticky lg:top-24">
                <div className="cv-preview-container">
                  <div className="cv-preview-scaled" id="cv-preview-content">
                    <TemplateComponent data={cvData} />
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                Scroll to see the full CV preview
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEMPLATE SELECTOR MODAL */}
      <AnimatePresence>
        {showTemplateSelect && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTemplateSelect(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl z-[110]"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Choose a Template
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {cvTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setTemplate(template.id);
                      setShowTemplateSelect(false);
                      toast.success(`${template.name} template selected!`);
                    }}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all",
                      selectedTemplate === template.id
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                        : "border-gray-200 dark:border-slate-700 hover:border-yellow-300",
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {template.name}
                      </h4>
                      {selectedTemplate === template.id && (
                        <Check size={18} className="text-yellow-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {template.description}
                    </p>
                    <div
                      className="mt-3 h-2 rounded-full"
                      style={{ backgroundColor: template.color }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CLEAR CONFIRMATION */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearAll}
        title="Clear all CV data?"
        message="This will remove all your CV information. This action cannot be undone."
        confirmText="Yes, Clear All"
        variant="danger"
        icon={Trash2}
      />
    </>
  );
}

// DYNAMIC SECTION (kept internal — used only here)
function DynamicSection({ title, items, onAdd, onRemove, renderItem }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-gray-900 text-xs font-semibold rounded-lg transition-colors"
        >
          <Plus size={14} />
          <span>Add</span>
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          No items added yet. Click "Add" to start.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600 space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  #{index + 1}
                </span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-500 flex items-center justify-center transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              {renderItem(item)}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
