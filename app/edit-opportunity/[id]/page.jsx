"use client";

import { use, useState, useEffect } from "react";
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
  Save,
  Trash2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import FormField from "../../../components/forms/FormField.jsx";
import FormTextarea from "../../../components/forms/FormTextarea.jsx";
import FormSelect from "../../../components/forms/FormSelect.jsx";
import DynamicListInput from "../../../components/forms/DynamicListInput.jsx";
import ConfirmModal from "../../../components/shared/ConfirmModal.jsx";

import { opportunitySchema } from "../../../lib/validators.js";
import { categories, locations } from "../../../data/opportunities.js";
import { useOpportunitiesStore } from "../../../store/index.js";
import { cn } from "../../../lib/utils.js";

export default function EditOpportunityPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [tags, setTags] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const userOpportunities = useOpportunitiesStore(
    (state) => state.userOpportunities,
  );
  const updateOpportunity = useOpportunitiesStore(
    (state) => state.updateOpportunity,
  );
  const deleteOpportunity = useOpportunitiesStore(
    (state) => state.deleteOpportunity,
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(opportunitySchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load existing opportunity data
  useEffect(() => {
    if (!mounted) return;

    const opportunity = userOpportunities.find(
      (opp) => opp.id === id || opp.slug === id,
    );

    if (!opportunity) {
      setNotFound(true);
      return;
    }

    // Pre-fill the form
    reset({
      title: opportunity.title,
      organization: opportunity.organization,
      category: opportunity.category,
      location: opportunity.location,
      type: opportunity.type,
      deadline: opportunity.deadline,
      shortDesc: opportunity.shortDesc,
      description: opportunity.description,
      applyLink: opportunity.applyLink,
      contactEmail: opportunity.contactEmail || "",
      salary: opportunity.salary || "",
      duration: opportunity.duration || "",
      seats: opportunity.seats || "",
      gender: opportunity.gender || "Any",
      language: opportunity.language || "Any",
    });

    setRequirements(opportunity.requirements || []);
    setTags(opportunity.tags || []);
  }, [mounted, id, userOpportunities, reset]);

  // Sync requirements and tags
  useEffect(() => {
    setValue("requirements", requirements);
  }, [requirements, setValue]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      updateOpportunity(id, {
        ...data,
        requirements,
        tags,
      });
      toast.success("Opportunity updated successfully!");
      setTimeout(() => router.push(`/opportunities/${id}`), 800);
    } catch {
      toast.error("Failed to update. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    deleteOpportunity(id);
    toast.success("Opportunity deleted");
    router.push("/dashboard");
  };

  // Not Found State
  if (mounted && notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl">
            <AlertCircle size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Opportunity Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You can only edit opportunities you have submitted.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            <ArrowLeft size={16} />
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Loading State
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-12 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </Link>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-blue-500/20 border border-blue-500/30 rounded-full"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Edit Mode
              </span>
            </motion.div>

            <h1
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Edit <span className="gradient-text">Opportunity</span>
            </h1>
            <p className="text-gray-300">
              Update the details of your opportunity below.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-gray-50 dark:bg-slate-950 py-12 min-h-screen">
        <div className="container-custom max-w-4xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Basic Information
              </h2>
              <div className="space-y-4">
                <FormField
                  label="Title"
                  name="title"
                  register={register}
                  error={errors.title}
                  required
                  icon={FileText}
                />
                <FormField
                  label="Organization"
                  name="organization"
                  register={register}
                  error={errors.organization}
                  required
                  icon={Building2}
                />
                <FormTextarea
                  label="Short Description"
                  name="shortDesc"
                  register={register}
                  error={errors.shortDesc}
                  required
                  icon={FileText}
                  rows={2}
                  maxLength={300}
                />
              </div>
            </div>

            {/* Classification */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Classification
              </h2>
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
            </div>

            {/* Details */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Full Details
              </h2>
              <div className="space-y-4">
                <FormTextarea
                  label="Description"
                  name="description"
                  register={register}
                  error={errors.description}
                  required
                  icon={FileText}
                  rows={6}
                  maxLength={2000}
                />
                <DynamicListInput
                  label="Requirements"
                  items={requirements}
                  onChange={setRequirements}
                  required
                  icon={ListChecks}
                  maxItems={15}
                />
                <DynamicListInput
                  label="Tags"
                  items={tags}
                  onChange={setTags}
                  icon={Tag}
                  maxItems={10}
                />
              </div>
            </div>

            {/* Application */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Application Info
              </h2>
              <div className="space-y-4">
                <FormField
                  label="Apply Link"
                  name="applyLink"
                  type="url"
                  register={register}
                  error={errors.applyLink}
                  required
                  icon={LinkIcon}
                />
                <FormField
                  label="Contact Email"
                  name="contactEmail"
                  type="email"
                  register={register}
                  error={errors.contactEmail}
                  icon={Mail}
                />
              </div>
            </div>

            {/* Optional Details */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Additional Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Salary"
                  name="salary"
                  register={register}
                  error={errors.salary}
                  icon={DollarSign}
                />
                <FormField
                  label="Duration"
                  name="duration"
                  register={register}
                  error={errors.duration}
                  icon={Clock}
                />
                <FormField
                  label="Seats"
                  name="seats"
                  type="number"
                  register={register}
                  error={errors.seats}
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
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center justify-center gap-2",
                  "px-6 py-3 rounded-xl",
                  "bg-red-50 hover:bg-red-100",
                  "dark:bg-red-500/10 dark:hover:bg-red-500/20",
                  "text-red-600 dark:text-red-400",
                  "border-2 border-red-200 dark:border-red-500/30",
                  "font-semibold text-sm",
                  "transition-colors",
                )}
              >
                <Trash2 size={16} />
                <span>Delete Opportunity</span>
              </motion.button>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2",
                  "px-6 py-3 rounded-xl",
                  "bg-gradient-to-r from-yellow-500 to-orange-500",
                  "hover:from-yellow-400 hover:to-orange-400",
                  "text-gray-900 font-bold text-sm",
                  "shadow-lg hover:shadow-yellow-glow-lg",
                  "transition-all",
                  "disabled:opacity-70",
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </section>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete this opportunity?"
        message="This action cannot be undone. The opportunity will be permanently removed."
        confirmText={isDeleting ? "Deleting..." : "Yes, Delete"}
        variant="danger"
        icon={Trash2}
      />
    </>
  );
}
