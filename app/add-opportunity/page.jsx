"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  Tag,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  Globe,
  Link as LinkIcon,
  Mail,
  ListChecks,
  Sparkles,
  Send,
  CheckCircle2,
  Eye,
  Save,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

import FormField from "../../components/forms/FormField.jsx";
import FormTextarea from "../../components/forms/FormTextarea.jsx";
import FormSelect from "../../components/forms/FormSelect.jsx";
import DynamicListInput from "../../components/forms/DynamicListInput.jsx";
import OpportunityCard from "../../components/opportunities/OpportunityCard.jsx";

import { opportunitySchema } from "../../lib/validators.js";
import { categories, locations } from "../../data/opportunities.js";
import { useOpportunitiesStore } from "../../store/index.js";
import Link from "next/link";
import { cn } from "../../lib/utils.js";
import Button from "../../components/ui/Button.jsx";
export default function AddOpportunityPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [tags, setTags] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const addOpportunity = useOpportunitiesStore((state) => state.addOpportunity);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: "",
      organization: "",
      category: "",
      location: "",
      type: "Remote",
      deadline: "",
      shortDesc: "",
      description: "",
      requirements: [],
      applyLink: "",
      tags: [],
      contactEmail: "",
      salary: "",
      duration: "",
      seats: "",
      gender: "Any",
      language: "Any",
    },
  });

  // Watch form values for live preview
  const formValues = watch();

  // Sync requirements to form
  useEffect(() => {
    setValue("requirements", requirements);
  }, [requirements, setValue]);

  // Sync tags to form
  useEffect(() => {
    setValue("tags", tags);
  }, [tags, setValue]);

  // Preview data
  const previewData = {
    id: "preview",
    slug: "preview",
    title: formValues.title || "Your Opportunity Title",
    organization: formValues.organization || "Organization Name",
    category: formValues.category || "Job",
    location: formValues.location || "Location",
    type: formValues.type || "Remote",
    deadline:
      formValues.deadline ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    shortDesc: formValues.shortDesc || "Short description will appear here...",
    description: formValues.description || "",
    requirements: requirements,
    tags: tags,
    featured: false,
    urgent: false,
    verified: false,
    views: 0,
    saves: 0,
    postedDate: new Date().toISOString().split("T")[0],
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const newOpp = addOpportunity({
        ...data,
        requirements: requirements,
        tags: tags,
      });

      toast.success("🎉 Opportunity submitted successfully!", {
        duration: 3000,
      });

      // Redirect to detail page
      setTimeout(() => {
        router.push(`/opportunities/${newOpp.slug || newOpp.id}`);
      }, 1000);
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    toast.error("Please fix the errors in the form");
    const firstError = document.querySelector('[class*="border-red-500"]');
    firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* ============================================
          HERO HEADER
      ============================================ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to Opportunities</span>
          </Link>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full"
            >
              <Sparkles size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
                Share an Opportunity
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Post a New <span className="gradient-text">Opportunity</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-300"
            >
              Help other Afghan youth discover new opportunities. Fill in the
              details below.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ============================================
          FORM CONTENT
      ============================================ */}
      <section className="bg-gray-50 dark:bg-slate-950 py-12 min-h-screen">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ============================================
                LEFT: FORM
            ============================================ */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-6"
              >
                {/* Section 1: Basic Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Basic Information
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Tell us about the opportunity
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      label="Opportunity Title"
                      name="title"
                      register={register}
                      error={errors.title}
                      placeholder="e.g., Frontend Developer Intern"
                      required
                      icon={FileText}
                    />

                    <FormField
                      label="Organization Name"
                      name="organization"
                      register={register}
                      error={errors.organization}
                      placeholder="e.g., Kabul Tech Community"
                      required
                      icon={Building2}
                    />

                    <FormTextarea
                      label="Short Description"
                      name="shortDesc"
                      register={register}
                      error={errors.shortDesc}
                      placeholder="A brief summary (shown in cards)"
                      required
                      icon={FileText}
                      rows={2}
                      maxLength={300}
                      value={formValues.shortDesc}
                    />
                  </div>
                </motion.div>

                {/* Section 2: Classification */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Classification
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Help users find your opportunity
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormSelect
                      label="Category"
                      name="category"
                      register={register}
                      error={errors.category}
                      required
                      icon={Tag}
                      options={categories.map((c) => ({
                        value: c.name,
                        label: c.name,
                      }))}
                    />

                    <FormSelect
                      label="Location"
                      name="location"
                      register={register}
                      error={errors.location}
                      required
                      icon={MapPin}
                      options={locations.map((l) => ({
                        value: l.name,
                        label: l.name,
                      }))}
                    />

                    <FormSelect
                      label="Work Type"
                      name="type"
                      register={register}
                      error={errors.type}
                      required
                      icon={Briefcase}
                      options={[
                        { value: "Remote", label: "Remote" },
                        { value: "On-site", label: "On-site" },
                        { value: "Hybrid", label: "Hybrid" },
                      ]}
                    />

                    <FormField
                      label="Deadline"
                      name="deadline"
                      type="date"
                      register={register}
                      error={errors.deadline}
                      required
                      icon={Calendar}
                    />
                  </div>
                </motion.div>

                {/* Section 3: Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Full Details
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Describe the opportunity in detail
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormTextarea
                      label="Full Description"
                      name="description"
                      register={register}
                      error={errors.description}
                      placeholder="Describe the opportunity in detail..."
                      required
                      icon={FileText}
                      rows={6}
                      maxLength={2000}
                      value={formValues.description}
                    />

                    <DynamicListInput
                      label="Requirements"
                      items={requirements}
                      onChange={setRequirements}
                      placeholder="e.g., Basic knowledge of React"
                      required
                      icon={ListChecks}
                      helper="Add requirements one by one. Press Enter or click Add."
                      error={errors.requirements?.message}
                      maxItems={15}
                    />

                    <DynamicListInput
                      label="Tags"
                      items={tags}
                      onChange={setTags}
                      placeholder="e.g., React, JavaScript"
                      icon={Tag}
                      helper="Optional. Add keywords to help users find this opportunity."
                      maxItems={10}
                    />
                  </div>
                </motion.div>

                {/* Section 4: Application */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Application Info
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        How can candidates apply?
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      label="Apply Link"
                      name="applyLink"
                      type="url"
                      register={register}
                      error={errors.applyLink}
                      placeholder="https://example.com/apply"
                      required
                      icon={LinkIcon}
                      helper="URL where candidates can apply"
                    />

                    <FormField
                      label="Contact Email"
                      name="contactEmail"
                      type="email"
                      register={register}
                      error={errors.contactEmail}
                      placeholder="contact@organization.com"
                      icon={Mail}
                      helper="Optional. For candidate inquiries."
                    />
                  </div>
                </motion.div>

                {/* Section 5: Optional Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                      5
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Additional Details
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Optional but helpful
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Salary / Stipend"
                      name="salary"
                      register={register}
                      error={errors.salary}
                      placeholder="e.g., $500-800/month"
                      icon={DollarSign}
                    />

                    <FormField
                      label="Duration"
                      name="duration"
                      register={register}
                      error={errors.duration}
                      placeholder="e.g., 3 months"
                      icon={Clock}
                    />

                    <FormField
                      label="Available Seats"
                      name="seats"
                      type="number"
                      register={register}
                      error={errors.seats}
                      placeholder="e.g., 5"
                      icon={Users}
                    />

                    <FormSelect
                      label="Gender"
                      name="gender"
                      register={register}
                      error={errors.gender}
                      icon={Users}
                      options={[
                        { value: "Any", label: "Any Gender" },
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                      ]}
                    />

                    <FormSelect
                      label="Language"
                      name="language"
                      register={register}
                      error={errors.language}
                      icon={Globe}
                      options={[
                        { value: "Any", label: "Any Language" },
                        { value: "Dari", label: "Dari" },
                        { value: "Pashto", label: "Pashto" },
                        { value: "English", label: "English" },
                      ]}
                    />
                  </div>
                </motion.div>

                {/* Submit Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => reset()}
                  >
                    Reset Form
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={Send}
                    isLoading={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? "Submitting..." : "Submit Opportunity"}
                  </Button>
                </motion.div>
              </form>
            </div>

            {/* ============================================
                RIGHT: LIVE PREVIEW
            ============================================ */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye size={16} className="text-yellow-500" />
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Live Preview
                  </h3>
                </div>

                <div className="pointer-events-none">
                  <OpportunityCard opportunity={previewData} index={0} />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Sparkles
                      size={14}
                      className="text-yellow-500 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-yellow-800 dark:text-yellow-300 leading-relaxed">
                      <strong>Preview updates in real-time!</strong> This is how
                      your opportunity will look to others.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
