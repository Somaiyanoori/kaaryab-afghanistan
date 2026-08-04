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
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

import PageHeader from "../../components/layout/PageHeader.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Select from "../../components/ui/Select.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import DynamicListInput from "../../components/forms/DynamicListInput.jsx";
import OpportunityCard from "../../components/opportunities/OpportunityCard.jsx";

import { opportunitySchema } from "../../lib/validators.js";
import { categories, locations } from "../../data/opportunities.js";
import { createOpportunity } from "../../lib/db.js";
import { slugify, generateId } from "../../lib/utils.js";

// SECTION HEADER
function SectionHeader({ number, title, subtitle, color }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold`}
      >
        {number}
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

// MAIN PAGE

export default function AddOpportunityPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [tags, setTags] = useState([]);

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

  const formValues = watch();

  // Sync requirements and tags to form
  useEffect(() => {
    setValue("requirements", requirements);
  }, [requirements, setValue]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags, setValue]);

  // Live preview data
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
    requirements,
    tags,
    featured: false,
    urgent: false,
    verified: false,
    views: 0,
    saves: 0,
    postedDate: new Date().toISOString().split("T")[0],
  };

  // SUBMIT HANDLER → SUPABASE
  const onSubmit = async (data) => {
    // Guard: must be signed in
    if (!isLoaded) return;

    if (!user) {
      toast.error("You must be signed in to submit an opportunity");
      router.push("/sign-in");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build slug
      const slug = `${slugify(data.title)}-${Date.now()}`;

      // Prepare data for Supabase
      const opportunityData = {
        user_id: user.id,
        title: data.title,
        organization: data.organization,
        category: data.category,
        location: data.location,
        type: data.type,
        deadline: data.deadline,
        short_desc: data.shortDesc,
        description: data.description,
        requirements: requirements,
        apply_link: data.applyLink,
        tags: tags,
        contact_email: data.contactEmail || null,
        salary: data.salary || null,
        duration: data.duration || null,
        seats: data.seats ? parseInt(data.seats) : null,
        gender: data.gender || "Any",
        language: data.language || "Any",
        featured: false,
        urgent: false,
        verified: false,
        slug,
        posted_date: new Date().toISOString().split("T")[0],
      };

      // Save to Supabase
      const newOpp = await createOpportunity(opportunityData);

      toast.success("Opportunity submitted successfully! 🎉", {
        duration: 3000,
      });

      // Redirect to new opportunity
      setTimeout(() => {
        router.push(`/opportunities/${newOpp.slug || newOpp.id}`);
      }, 1000);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.message || "Failed to submit. Please try again.");
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
      {/* HERO HEADER */}
      <PageHeader
        backHref="/opportunities"
        backLabel="Back to Opportunities"
        badge="Share an Opportunity"
        badgeIcon={Sparkles}
        title="Post a New"
        highlightedText="Opportunity"
        description="Help other Afghan youth discover new opportunities. Fill in the details below."
      />

      {/* FORM CONTENT */}
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
                >
                  <Card variant="default" padding="lg">
                    <SectionHeader
                      number={1}
                      title="Basic Information"
                      subtitle="Tell us about the opportunity"
                      color="from-yellow-500 to-orange-500"
                    />
                    <div className="space-y-4">
                      <Input
                        label="Opportunity Title"
                        name="title"
                        register={register}
                        error={errors.title}
                        placeholder="e.g., Frontend Developer Intern"
                        required
                        icon={FileText}
                      />
                      <Input
                        label="Organization Name"
                        name="organization"
                        register={register}
                        error={errors.organization}
                        placeholder="e.g., Kabul Tech Community"
                        required
                        icon={Building2}
                      />
                      <Textarea
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
                  </Card>
                </motion.div>

                {/* Section 2: Classification */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card variant="default" padding="lg">
                    <SectionHeader
                      number={2}
                      title="Classification"
                      subtitle="Help users find your opportunity"
                      color="from-blue-500 to-indigo-600"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
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
                      <Select
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
                      <Select
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
                      <Input
                        label="Deadline"
                        name="deadline"
                        type="date"
                        register={register}
                        error={errors.deadline}
                        required
                        icon={Calendar}
                      />
                    </div>
                  </Card>
                </motion.div>

                {/* Section 3: Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card variant="default" padding="lg">
                    <SectionHeader
                      number={3}
                      title="Full Details"
                      subtitle="Describe the opportunity in detail"
                      color="from-purple-500 to-pink-600"
                    />
                    <div className="space-y-4">
                      <Textarea
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
                  </Card>
                </motion.div>

                {/* Section 4: Application */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card variant="default" padding="lg">
                    <SectionHeader
                      number={4}
                      title="Application Info"
                      subtitle="How can candidates apply?"
                      color="from-green-500 to-teal-600"
                    />
                    <div className="space-y-4">
                      <Input
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
                      <Input
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
                  </Card>
                </motion.div>

                {/* Section 5: Optional Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card variant="default" padding="lg">
                    <SectionHeader
                      number={5}
                      title="Additional Details"
                      subtitle="Optional but helpful"
                      color="from-amber-500 to-orange-600"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Salary / Stipend"
                        name="salary"
                        register={register}
                        error={errors.salary}
                        placeholder="e.g., $500-800/month"
                        icon={DollarSign}
                      />
                      <Input
                        label="Duration"
                        name="duration"
                        register={register}
                        error={errors.duration}
                        placeholder="e.g., 3 months"
                        icon={Clock}
                      />
                      <Input
                        label="Available Seats"
                        name="seats"
                        type="number"
                        register={register}
                        error={errors.seats}
                        placeholder="e.g., 5"
                        icon={Users}
                      />
                      <Select
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
                      <Select
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
                  </Card>
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
                    onClick={() => {
                      reset();
                      setRequirements([]);
                      setTags([]);
                    }}
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

            {/*  RIGHT: LIVE PREVIEW */}
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

                <Card variant="gradient" padding="md">
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
                </Card>

                {/* Sign In Notice */}
                {isLoaded && !user && (
                  <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                      ⚠️ You need to{" "}
                      <a href="/sign-in" className="underline font-bold">
                        sign in
                      </a>{" "}
                      to submit an opportunity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
