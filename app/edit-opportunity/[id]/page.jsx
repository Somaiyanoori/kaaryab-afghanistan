"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
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
} from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/layout/PageHeader.jsx";
import Input from "../../../components/ui/Input.jsx";
import Textarea from "../../../components/ui/Textarea.jsx";
import Select from "../../../components/ui/Select.jsx";
import Button from "../../../components/ui/Button.jsx";
import Card from "../../../components/ui/Card.jsx";
import ErrorState from "../../../components/states/ErrorState.jsx";
import DynamicListInput from "../../../components/forms/DynamicListInput.jsx";
import ConfirmModal from "../../../components/shared/ConfirmModal.jsx";

import { opportunitySchema } from "../../../lib/validators.js";
import { categories, locations } from "../../../data/opportunities.js";
import {
  getAllOpportunities,
  updateOpportunityById,
  deleteOpportunityById,
} from "../../../lib/db.js";

export default function EditOpportunityPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [tags, setTags] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [opportunity, setOpportunity] = useState(null);

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

  // Load opportunity from DB
  useEffect(() => {
    if (!mounted || !isLoaded) return;

    const loadOpportunity = async () => {
      try {
        const allOpps = await getAllOpportunities();
        const found = allOpps.find((opp) => opp.id === id || opp.slug === id);

        if (!found) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        setOpportunity(found);

        // Pre-fill form
        reset({
          title: found.title,
          organization: found.organization,
          category: found.category,
          location: found.location,
          type: found.type,
          deadline: found.deadline,
          shortDesc: found.short_desc || found.shortDesc,
          description: found.description,
          applyLink: found.apply_link || found.applyLink,
          contactEmail: found.contact_email || "",
          salary: found.salary || "",
          duration: found.duration || "",
          seats: found.seats ? String(found.seats) : "",
          gender: found.gender || "Any",
          language: found.language || "Any",
        });

        setRequirements(found.requirements || []);
        setTags(found.tags || []);
      } catch (error) {
        console.error("Load error:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadOpportunity();
  }, [mounted, isLoaded, id, reset]);

  useEffect(() => {
    setValue("requirements", requirements);
  }, [requirements, setValue]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags, setValue]);

  // SUBMIT
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await updateOpportunityById(opportunity.id, {
        title: data.title,
        organization: data.organization,
        category: data.category,
        location: data.location,
        type: data.type,
        deadline: data.deadline,
        short_desc: data.shortDesc,
        description: data.description,
        requirements,
        apply_link: data.applyLink,
        tags,
        contact_email: data.contactEmail || null,
        salary: data.salary || null,
        duration: data.duration || null,
        seats: data.seats ? parseInt(data.seats) : null,
        gender: data.gender || "Any",
        language: data.language || "Any",
        updated_at: new Date().toISOString(),
      });

      toast.success("Opportunity updated successfully!");
      setTimeout(
        () =>
          router.push(`/opportunities/${opportunity.slug || opportunity.id}`),
        800,
      );
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update. Please try again.");
      setIsSubmitting(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteOpportunityById(opportunity.id);
      toast.success("Opportunity deleted");
      router.push("/dashboard");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete");
      setIsDeleting(false);
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not Found
  if (notFound) {
    return (
      <ErrorState
        fullPage
        title="Opportunity Not Found"
        description="This opportunity doesn't exist or has been removed."
        actionLabel="Go to Dashboard"
        actionHref="/dashboard"
      />
    );
  }

  return (
    <>
      <PageHeader
        backHref="/dashboard"
        backLabel="Back to Dashboard"
        badge="Edit Mode"
        badgeIcon={Sparkles}
        badgeColor="blue"
        title="Edit"
        highlightedText="Opportunity"
        description="Update the details below."
      />

      <section className="bg-gray-50 dark:bg-slate-950 py-12 min-h-screen">
        <div className="container-custom max-w-4xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <Card variant="default" padding="lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Basic Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Title"
                  name="title"
                  register={register}
                  error={errors.title}
                  required
                  icon={FileText}
                />
                <Input
                  label="Organization"
                  name="organization"
                  register={register}
                  error={errors.organization}
                  required
                  icon={Building2}
                />
                <Textarea
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
            </Card>

            {/* Classification */}
            <Card variant="default" padding="lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Classification
              </h2>
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

            {/* Details */}
            <Card variant="default" padding="lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Full Details
              </h2>
              <div className="space-y-4">
                <Textarea
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
            </Card>

            {/* Application */}
            <Card variant="default" padding="lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Application Info
              </h2>
              <div className="space-y-4">
                <Input
                  label="Apply Link"
                  name="applyLink"
                  type="url"
                  register={register}
                  error={errors.applyLink}
                  required
                  icon={LinkIcon}
                />
                <Input
                  label="Contact Email"
                  name="contactEmail"
                  type="email"
                  register={register}
                  error={errors.contactEmail}
                  icon={Mail}
                />
              </div>
            </Card>

            {/* Optional */}
            <Card variant="default" padding="lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Additional Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Salary"
                  name="salary"
                  register={register}
                  error={errors.salary}
                  icon={DollarSign}
                />
                <Input
                  label="Duration"
                  name="duration"
                  register={register}
                  error={errors.duration}
                  icon={Clock}
                />
                <Input
                  label="Seats"
                  name="seats"
                  type="number"
                  register={register}
                  error={errors.seats}
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

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="danger"
                size="md"
                icon={Trash2}
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Save}
                isLoading={isSubmitting}
                fullWidth
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete this opportunity?"
        message="This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Yes, Delete"}
        variant="danger"
        icon={Trash2}
      />
    </>
  );
}
