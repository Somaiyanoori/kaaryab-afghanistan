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
  Save,
  RefreshCw,
  Printer,
  Eye,
  Edit3,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

import { useCVStore } from "../../store/index.js";
import { sampleCVData, cvTemplates } from "../../data/cvSampleData.js";
import ConfirmModal from "../../components/shared/ConfirmModal.jsx";
import ModernTemplate from "../../components/cv-builder/templates/ModernTemplate.jsx";
import ClassicTemplate from "../../components/cv-builder/templates/ClassicTemplate.jsx";
import MinimalTemplate from "../../components/cv-builder/templates/MinimalTemplate.jsx";
import ProfessionalTemplate from "../../components/cv-builder/templates/ProfessionalTemplate.jsx";
import { cn, generateId } from "../../lib/utils.js";

// ============================================
// SKILL LEVELS
// ============================================
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const LANGUAGE_LEVELS = ["Basic", "Conversational", "Fluent", "Native"];

// ============================================
// TEMPLATE COMPONENTS MAP
// ============================================
const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
};

export default function CVBuilderPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' | 'preview'
  const [activeSection, setActiveSection] = useState("personal");
  const [showTemplateSelect, setShowTemplateSelect] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

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

  const handlePrint = () => {
    window.print();
    toast.success("Opening print dialog...");
  };

  const handleLoadSample = () => {
    loadSampleData(sampleCVData);
    toast.success("Sample data loaded! ✨");
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-preview,
          #cv-preview * {
            visibility: visible;
          }
          #cv-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* ============================================
          HERO HEADER
      ============================================ */}
      <section className="no-print relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-8 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full"
              >
                <Sparkles size={14} className="text-yellow-400" />
                <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
                  Free CV Builder
                </span>
              </motion.div>

              <h1
                className="text-3xl md:text-5xl font-black text-white mb-2"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Build Your <span className="gradient-text">CV</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base">
                Create a professional resume in minutes. Choose a template and
                start building.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleLoadSample}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Sparkles size={16} />
                <span>Load Sample</span>
              </button>

              <button
                onClick={() => setShowClearModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 text-sm font-semibold rounded-xl transition-colors"
              >
                <Trash2 size={16} />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MOBILE TABS (Edit / Preview)
      ============================================ */}
      <div className="no-print sticky top-16 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 lg:hidden">
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

      {/* ============================================
          MAIN CONTENT
      ============================================ */}
      <section className="bg-gray-50 dark:bg-slate-950 py-8 min-h-screen">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ============================================
                LEFT: FORM
            ============================================ */}
            <div
              className={cn(
                "lg:block",
                activeTab === "edit" ? "block" : "hidden",
              )}
            >
              {/* Section Tabs */}
              <div className="no-print bg-white dark:bg-slate-800 rounded-2xl p-2 mb-4 border border-gray-100 dark:border-slate-700 overflow-x-auto scrollbar-hide">
                <div className="flex gap-1 min-w-max">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors",
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

              {/* Form Sections */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                {/* Personal Info */}
                {activeSection === "personal" && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Full Name *"
                        value={cvData.personal.fullName}
                        onChange={(v) =>
                          updatePersonal({ ...cvData.personal, fullName: v })
                        }
                      />
                      <FormInput
                        label="Job Title"
                        value={cvData.personal.jobTitle}
                        onChange={(v) =>
                          updatePersonal({ ...cvData.personal, jobTitle: v })
                        }
                      />
                      <FormInput
                        label="Email *"
                        type="email"
                        value={cvData.personal.email}
                        onChange={(v) =>
                          updatePersonal({ ...cvData.personal, email: v })
                        }
                      />
                      <FormInput
                        label="Phone"
                        value={cvData.personal.phone}
                        onChange={(v) =>
                          updatePersonal({ ...cvData.personal, phone: v })
                        }
                      />
                      <FormInput
                        label="City"
                        value={cvData.personal.city}
                        onChange={(v) =>
                          updatePersonal({ ...cvData.personal, city: v })
                        }
                      />
                      <FormInput
                        label="Website"
                        value={cvData.personal.website}
                        onChange={(v) =>
                          updatePersonal({ ...cvData.personal, website: v })
                        }
                      />
                      <div className="md:col-span-2">
                        <FormInput
                          label="LinkedIn"
                          value={cvData.personal.linkedin}
                          onChange={(v) =>
                            updatePersonal({ ...cvData.personal, linkedin: v })
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FormTextarea
                          label="Professional Summary"
                          value={cvData.personal.summary}
                          onChange={(v) =>
                            updatePersonal({ ...cvData.personal, summary: v })
                          }
                          rows={4}
                          maxLength={500}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience */}
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
                        <FormInput
                          label="Position"
                          value={item.position}
                          onChange={(v) =>
                            updateSection("experiences", item.id, {
                              position: v,
                            })
                          }
                        />
                        <FormInput
                          label="Company"
                          value={item.company}
                          onChange={(v) =>
                            updateSection("experiences", item.id, {
                              company: v,
                            })
                          }
                        />
                        <FormInput
                          label="Location"
                          value={item.location}
                          onChange={(v) =>
                            updateSection("experiences", item.id, {
                              location: v,
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <FormInput
                            label="Start Date"
                            type="month"
                            value={item.startDate}
                            onChange={(v) =>
                              updateSection("experiences", item.id, {
                                startDate: v,
                              })
                            }
                          />
                          <FormInput
                            label="End Date"
                            type="month"
                            value={item.endDate}
                            onChange={(v) =>
                              updateSection("experiences", item.id, {
                                endDate: v,
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
                        <FormTextarea
                          label="Description"
                          value={item.description}
                          onChange={(v) =>
                            updateSection("experiences", item.id, {
                              description: v,
                            })
                          }
                        />
                      </>
                    )}
                  />
                )}

                {/* Education */}
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
                        <FormInput
                          label="Degree"
                          value={item.degree}
                          onChange={(v) =>
                            updateSection("education", item.id, { degree: v })
                          }
                        />
                        <FormInput
                          label="Field of Study"
                          value={item.field}
                          onChange={(v) =>
                            updateSection("education", item.id, { field: v })
                          }
                        />
                        <FormInput
                          label="School"
                          value={item.school}
                          onChange={(v) =>
                            updateSection("education", item.id, { school: v })
                          }
                        />
                        <FormInput
                          label="Location"
                          value={item.location}
                          onChange={(v) =>
                            updateSection("education", item.id, { location: v })
                          }
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <FormInput
                            label="Start"
                            type="month"
                            value={item.startDate}
                            onChange={(v) =>
                              updateSection("education", item.id, {
                                startDate: v,
                              })
                            }
                          />
                          <FormInput
                            label="End"
                            type="month"
                            value={item.endDate}
                            onChange={(v) =>
                              updateSection("education", item.id, {
                                endDate: v,
                              })
                            }
                          />
                          <FormInput
                            label="GPA"
                            value={item.gpa}
                            onChange={(v) =>
                              updateSection("education", item.id, { gpa: v })
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                )}

                {/* Skills */}
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
                        <FormInput
                          label="Skill Name"
                          value={item.name}
                          onChange={(v) =>
                            updateSection("skills", item.id, { name: v })
                          }
                        />
                        <FormSelect
                          label="Level"
                          value={item.level}
                          onChange={(v) =>
                            updateSection("skills", item.id, { level: v })
                          }
                          options={SKILL_LEVELS}
                        />
                      </div>
                    )}
                  />
                )}

                {/* Languages */}
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
                        <FormInput
                          label="Language"
                          value={item.name}
                          onChange={(v) =>
                            updateSection("languages", item.id, { name: v })
                          }
                        />
                        <FormSelect
                          label="Proficiency"
                          value={item.proficiency}
                          onChange={(v) =>
                            updateSection("languages", item.id, {
                              proficiency: v,
                            })
                          }
                          options={LANGUAGE_LEVELS}
                        />
                      </div>
                    )}
                  />
                )}

                {/* Projects */}
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
                        <FormInput
                          label="Project Name"
                          value={item.name}
                          onChange={(v) =>
                            updateSection("projects", item.id, { name: v })
                          }
                        />
                        <FormTextarea
                          label="Description"
                          value={item.description}
                          onChange={(v) =>
                            updateSection("projects", item.id, {
                              description: v,
                            })
                          }
                        />
                        <FormInput
                          label="Link"
                          value={item.link}
                          onChange={(v) =>
                            updateSection("projects", item.id, { link: v })
                          }
                        />
                        <FormInput
                          label="Technologies (comma separated)"
                          value={item.technologies.join(", ")}
                          onChange={(v) =>
                            updateSection("projects", item.id, {
                              technologies: v
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

                {/* Certifications */}
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
                        <FormInput
                          label="Certificate Name"
                          value={item.name}
                          onChange={(v) =>
                            updateSection("certifications", item.id, {
                              name: v,
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <FormInput
                            label="Issuer"
                            value={item.issuer}
                            onChange={(v) =>
                              updateSection("certifications", item.id, {
                                issuer: v,
                              })
                            }
                          />
                          <FormInput
                            label="Date"
                            type="month"
                            value={item.date}
                            onChange={(v) =>
                              updateSection("certifications", item.id, {
                                date: v,
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                )}
              </div>
            </div>

            {/* ============================================
                RIGHT: PREVIEW
            ============================================ */}
            <div
              className={cn(
                "lg:block",
                activeTab === "preview" ? "block" : "hidden",
              )}
            >
              {/* Preview Controls */}
              <div className="no-print flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTemplateSelect(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:border-yellow-500 transition-colors"
                  >
                    <Layout size={14} />
                    <span>Change Template</span>
                  </button>
                </div>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 font-bold text-sm rounded-xl shadow-lg transition-all"
                >
                  <Printer size={14} />
                  <span>Print / Save PDF</span>
                </button>
              </div>

              {/* CV Preview */}
              <div className="bg-white shadow-2xl overflow-hidden rounded-lg lg:sticky lg:top-24">
                <div
                  id="cv-preview"
                  className="transform scale-[0.5] md:scale-[0.65] lg:scale-[0.7] xl:scale-[0.8] origin-top-left"
                  style={{
                    width: "210mm",
                    minHeight: "297mm",
                  }}
                >
                  <TemplateComponent data={cvData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Selector Modal */}
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

      {/* Clear Confirmation */}
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

// ============================================
// FORM INPUT COMPONENT
// ============================================
function FormInput({ label, value, onChange, type = "text", disabled }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
      />
    </div>
  );
}

// ============================================
// FORM TEXTAREA COMPONENT
// ============================================
function FormTextarea({ label, value, onChange, rows = 3, maxLength }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        maxLength={maxLength}
        className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 resize-none"
      />
    </div>
  );
}

// ============================================
// FORM SELECT COMPONENT
// ============================================
function FormSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// ============================================
// DYNAMIC SECTION COMPONENT
// ============================================
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
