"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  FileText,
  Phone,
  ChevronDown,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import toast from "react-hot-toast";
import SuccessState from "../../components/states/SuccessState.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Select from "../../components/ui/Select.jsx";
import { contactSchema } from "../../lib/validators.js";
import { cn } from "../../lib/utils.js";
import Button from "../../components/ui/Button.jsx";
import PageHeader from "../../components/layout/PageHeader.jsx";

// CONTACT INFO
const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@kaaryab.af",
    subtitle: "We reply within 24 hours",
    color: "#EAB308",
    href: "mailto:hello@kaaryab.af",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "Kabul, Afghanistan",
    subtitle: "Available Nationwide",
    color: "#3B82F6",
  },
  {
    icon: Clock,
    title: "Office Hours",
    detail: "Sat - Thu",
    subtitle: "9:00 AM - 6:00 PM",
    color: "#A855F7",
  },
];

// ============================================
// SUBJECT OPTIONS
// ============================================
const SUBJECT_OPTIONS = [
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Feedback", label: "Submit Feedback" },
  { value: "Report Issue", label: "Report an Issue" },
  { value: "Partnership", label: "Partnership Opportunity" },
  { value: "Suggest Opportunity", label: "Suggest an Opportunity" },
  { value: "Technical Support", label: "Technical Support" },
  { value: "Other", label: "Other" },
];

// ============================================
// SOCIAL LINKS
// ============================================
const SOCIAL_LINKS = [
  {
    icon: FaFacebook,
    name: "Facebook",
    href: "#",
    color: "hover:text-blue-500",
  },
  { icon: FaTwitter, name: "Twitter", href: "#", color: "hover:text-sky-400" },
  {
    icon: FaLinkedin,
    name: "LinkedIn",
    href: "#",
    color: "hover:text-blue-600",
  },
  {
    icon: FaInstagram,
    name: "Instagram",
    href: "#",
    color: "hover:text-pink-500",
  },
  { icon: FaGithub, name: "GitHub", href: "#", color: "hover:text-white" },
];

// ============================================
// FAQ DATA
// ============================================
const FAQS = [
  {
    question: "Is KaarYab really free?",
    answer:
      "Yes! KaarYab is 100% free and always will be. We believe every young Afghan deserves equal access to opportunities without any cost barriers.",
  },
  {
    question: "How can I submit an opportunity?",
    answer:
      'Simply click on "Add Opportunity" in the navigation menu. Fill in the form with the opportunity details, and it will be visible to all users immediately.',
  },
  {
    question: "In what languages is the platform available?",
    answer:
      "Currently, the platform is available in English. We are working on adding Dari and Pashto support in future updates.",
  },
  {
    question: "How do I save opportunities?",
    answer:
      'Click the bookmark icon on any opportunity card. Your saved opportunities are stored in your browser and can be accessed anytime from the "Saved" page in the navigation.',
  },
  {
    question: "Can I edit or delete opportunities I posted?",
    answer:
      "Yes, you can manage your submitted opportunities from the Dashboard page. You have full control to view, edit, or delete them anytime.",
  },
  {
    question: "Are all opportunities verified?",
    answer:
      "We do our best to ensure quality. However, we recommend always verifying details directly with the organization before applying.",
  },
];

// ============================================
// FAQ ITEM COMPONENT
// ============================================
function FAQItem({ faq, isOpen, onClick }) {
  return (
    <motion.div
      layout
      className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden"
    >
      <motion.button
        layout
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
            isOpen
              ? "bg-yellow-500 text-gray-900"
              : "bg-gray-100 dark:bg-slate-700 text-gray-500",
          )}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// MAIN CONTACT PAGE
// ============================================
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const messageValue = watch("message", "");

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Contact form data:", data);

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully! 🎉");
    reset();

    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      {/* ============================================
          HERO HEADER
      ============================================ */}
      <PageHeader
        badge="We're Here to Help"
        badgeIcon={MessageSquare}
        title="Get in"
        highlightedText="Touch"
        description="Have a question, suggestion, or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        centered
        size="lg"
      />

      {/* ============================================
          CONTACT INFO CARDS
      ============================================ */}
      <section className="py-12 bg-gray-50 dark:bg-slate-950 relative -mt-12 z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {CONTACT_INFO.map((info, index) => {
              const Icon = info.icon;
              const Component = info.href ? "a" : "div";

              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Component
                    href={info.href}
                    whileHover={{ y: -4 }}
                    className={cn(
                      "block relative overflow-hidden p-6",
                      "bg-white dark:bg-slate-800",
                      "border border-gray-100 dark:border-slate-700",
                      "rounded-2xl shadow-sm hover:shadow-lg",
                      "transition-all duration-200",
                      info.href && "cursor-pointer",
                    )}
                  >
                    {/* Background decoration */}
                    <div
                      className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10 blur-2xl"
                      style={{ backgroundColor: info.color }}
                    />

                    <div className="relative flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                        style={{ backgroundColor: info.color }}
                      >
                        <Icon
                          size={22}
                          className="text-white"
                          strokeWidth={2.5}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                          {info.title}
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white mb-1 truncate">
                          {info.detail}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  </Component>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT FORM + INFO
      ============================================ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ============================================
                LEFT: FORM
            ============================================ */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
              >
                <div className="mb-6">
                  <h2
                    className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Send us a Message
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Fill in the form below and we'll get back to you soon.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <SuccessState
                      title="Message Sent!"
                      description="Thank you for reaching out! We'll respond within 24 hours."
                    />
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <Input
                        label="Full Name"
                        name="fullName"
                        register={register}
                        error={errors.fullName}
                        placeholder="Ahmad Karimi"
                        required
                        icon={User}
                      />

                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        register={register}
                        error={errors.email}
                        placeholder="you@example.com"
                        required
                        icon={Mail}
                      />

                      <Select
                        label="Subject"
                        name="subject"
                        register={register}
                        error={errors.subject}
                        required
                        icon={FileText}
                        placeholder="Select a subject"
                        options={SUBJECT_OPTIONS}
                      />

                      <Textarea
                        label="Your Message"
                        name="message"
                        register={register}
                        error={errors.message}
                        placeholder="Tell us how we can help..."
                        required
                        icon={MessageSquare}
                        rows={6}
                        maxLength={1000}
                        value={messageValue}
                      />

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        icon={Send}
                        isLoading={isSubmitting}
                        fullWidth
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ============================================
                RIGHT: INFO SIDEBAR
            ============================================ */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Response Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden p-6 rounded-2xl shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #EAB308 0%, #F97316 100%)",
                }}
              >
                {/* Animated particles */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <Sparkles size={24} className="text-white" />
                  </div>

                  <h3 className="text-lg font-black text-white mb-2">
                    Quick Response
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    We respond to all messages within 24 hours. For urgent
                    matters, please email us directly.
                  </p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Connect With Us
                </h3>

                <div className="grid grid-cols-5 gap-2">
                  {SOCIAL_LINKS.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "w-full aspect-square rounded-xl",
                          "bg-gray-100 dark:bg-slate-700",
                          "flex items-center justify-center",
                          "text-gray-600 dark:text-gray-300",
                          "transition-all duration-200",
                          social.color,
                        )}
                        aria-label={social.name}
                        title={social.name}
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Alternative Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Other Ways to Reach Us
                </h3>

                <div className="space-y-3">
                  <a
                    href="mailto:hello@kaaryab.af"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-gray-900 transition-colors">
                      <Mail
                        size={16}
                        className="text-yellow-600 dark:text-yellow-400 group-hover:text-gray-900"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        hello@kaaryab.af
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                      <Phone
                        size={16}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        +93 700 000 000
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
      ============================================ */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-yellow-100 dark:bg-yellow-500/20 border border-yellow-500/30 rounded-full">
              <HelpCircle
                size={14}
                className="text-yellow-600 dark:text-yellow-400"
              />
              <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wider">
                FAQ
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about KaarYab. Can't find the answer?
              Send us a message!
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
