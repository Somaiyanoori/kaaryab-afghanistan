"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Award,
  GraduationCap,
  Wifi,
  AlertCircle,
  TrendingUp,
  Trash2,
  Eye,
  Pencil,
  Plus,
  Sparkles,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

import PageHeader from "../../components/layout/PageHeader.jsx";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard.jsx";
import ConfirmModal from "../../components/shared/ConfirmModal.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Tooltip from "../../components/ui/Tooltip.jsx";

import { getAllOpportunities, deleteOpportunityById } from "../../lib/db.js";
import {
  calculateStats,
  formatDate,
  formatRelativeDate,
} from "../../lib/utils.js";
import { isPast, parseISO } from "date-fns";

// Normalize DB opportunity
function normalizeOpp(opp) {
  return {
    id: opp.id,
    slug: opp.slug || opp.id,
    title: opp.title,
    organization: opp.organization,
    category: opp.category,
    location: opp.location,
    type: opp.type,
    deadline: opp.deadline,
    shortDesc: opp.short_desc || opp.shortDesc,
    description: opp.description,
    requirements: opp.requirements || [],
    applyLink: opp.apply_link || opp.applyLink,
    tags: opp.tags || [],
    userId: opp.user_id,
    featured: opp.featured || false,
    urgent: opp.urgent || false,
    verified: opp.verified || false,
    views: opp.views || 0,
    saves: opp.saves || 0,
    postedDate:
      opp.posted_date || opp.postedDate || opp.created_at?.split("T")[0],
  };
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dbOpportunities, setDbOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH FROM SUPABASE
  const fetchOpportunities = async () => {
    try {
      const data = await getAllOpportunities();
      setDbOpportunities(data || []);
    } catch (error) {
      console.error("Failed to load:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchOpportunities();
  }, []);

  // NORMALIZE AND COMBINE
  const normalizedDb = dbOpportunities.map(normalizeOpp);

  const allOpportunities = useMemo(() => {
    return normalizedDb;
  }, [dbOpportunities]);

  // User's own opportunities (from DB, filtered by user_id)
  const userOpportunities = useMemo(() => {
    if (!user) return [];
    return normalizedDb.filter((opp) => opp.userId === user.id);
  }, [dbOpportunities, user]);

  const stats = useMemo(
    () => calculateStats(allOpportunities),
    [allOpportunities],
  );

  // Chart data
  const categoryChartData = useMemo(() => {
    const counts = {};
    allOpportunities.forEach((opp) => {
      counts[opp.category] = (counts[opp.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [allOpportunities]);

  const typeChartData = useMemo(() => {
    const counts = { Remote: 0, "On-site": 0, Hybrid: 0 };
    allOpportunities.forEach((opp) => {
      counts[opp.type] = (counts[opp.type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [allOpportunities]);

  const CHART_COLORS = [
    "#EAB308",
    "#3B82F6",
    "#A855F7",
    "#22C55E",
    "#EC4899",
    "#F59E0B",
    "#EF4444",
  ];

  const recentOpportunities = useMemo(() => {
    return [...allOpportunities]
      .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
      .slice(0, 5);
  }, [allOpportunities]);

  const expiringSoon = useMemo(() => {
    return allOpportunities
      .filter((opp) => {
        try {
          const deadline = parseISO(opp.deadline);
          if (isPast(deadline)) return false;
          const days = Math.floor(
            (deadline - new Date()) / (1000 * 60 * 60 * 24),
          );
          return days <= 7;
        } catch {
          return false;
        }
      })
      .slice(0, 5);
  }, [allOpportunities]);

  // DELETE HANDLER
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      console.log("Deleting opportunity:", deleteId);
      await deleteOpportunityById(deleteId);
      console.log("Delete successful");

      // Update state immediately
      setDbOpportunities((prev) => prev.filter((opp) => opp.id !== deleteId));

      toast.success("Opportunity deleted successfully");
      setDeleteId(null);

      // Refresh from database
      await fetchOpportunities();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete: ${error.message}`);
      setDeleteId(null);
    }
  };

  return (
    <>
      <PageHeader
        badge="Analytics & Management"
        badgeIcon={BarChart3}
        title="Dashboard"
        description="Manage opportunities and view analytics"
        actions={
          <Button
            href="/add-opportunity"
            variant="primary"
            size="md"
            icon={Plus}
          >
            Add Opportunity
          </Button>
        }
      />

      <section className="bg-gray-50 dark:bg-slate-950 py-8 md:py-12 min-h-screen">
        <div className="container-custom space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <DashboardStatCard
              label="Total"
              value={stats.total}
              icon={BarChart3}
              gradient="linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)"
              index={0}
            />
            <DashboardStatCard
              label="Jobs"
              value={stats.jobs}
              icon={Briefcase}
              gradient="linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)"
              index={1}
            />
            <DashboardStatCard
              label="Scholarships"
              value={stats.scholarships}
              icon={Award}
              gradient="linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)"
              index={2}
            />
            <DashboardStatCard
              label="Internships"
              value={stats.internships}
              icon={GraduationCap}
              gradient="linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)"
              index={3}
            />
            <DashboardStatCard
              label="Remote"
              value={stats.remote}
              icon={Wifi}
              gradient="linear-gradient(135deg, #22C55E 0%, #15803D 100%)"
              index={4}
            />
            <DashboardStatCard
              label="Expiring Soon"
              value={stats.expiringSoon}
              icon={AlertCircle}
              gradient="linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)"
              index={5}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="default" padding="lg">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 size={18} className="text-yellow-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    By Category
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={categoryChartData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#F1F5F9",
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {categoryChartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="default" padding="lg">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={18} className="text-yellow-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Work Types
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={typeChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                      labelLine={false}
                    >
                      <Cell fill="#22C55E" />
                      <Cell fill="#3B82F6" />
                      <Cell fill="#A855F7" />
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#F1F5F9",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px" }}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          {/* Recent + Expiring */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card variant="default" padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-yellow-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Recent Submissions
                </h3>
              </div>
              <div className="space-y-3">
                {recentOpportunities.map((opp) => (
                  <Link
                    key={opp.id}
                    href={`/opportunities/${opp.slug || opp.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {opp.organization?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-yellow-600">
                        {opp.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {opp.organization} •{" "}
                        {formatRelativeDate(opp.postedDate)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card variant="default" padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={18} className="text-red-500 animate-pulse" />
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Expiring in 7 Days
                </h3>
              </div>
              {expiringSoon.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                  No opportunities expiring soon
                </p>
              ) : (
                <div className="space-y-3">
                  {expiringSoon.map((opp) => (
                    <Link
                      key={opp.id}
                      href={`/opportunities/${opp.slug || opp.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                        <Calendar size={18} className="text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-red-500">
                          {opp.title}
                        </p>
                        <p className="text-xs text-red-500 font-medium">
                          Deadline: {formatDate(opp.deadline)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* User's Submissions Table */}
          {userOpportunities.length > 0 && (
            <Card variant="default" padding="lg">
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  Your Submissions
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage opportunities you have added (
                  {userOpportunities.length})
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                        Title
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                        Deadline
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOpportunities.map((opp) => (
                      <tr
                        key={opp.id}
                        className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {opp.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {opp.organization}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant="primary" size="sm">
                            {opp.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(opp.deadline)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Tooltip content="View" position="left">
                              <Link
                                href={`/opportunities/${opp.slug || opp.id}`}
                                className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors"
                              >
                                <Eye size={14} />
                              </Link>
                            </Tooltip>

                            <Tooltip
                              content="Edit"
                              position="left"
                              color="yellow"
                            >
                              <Link
                                href={`/edit-opportunity/${opp.id}`}
                                className="w-8 h-8 rounded-lg bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-500/20 dark:hover:bg-yellow-500/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center transition-colors"
                              >
                                <Pencil size={14} />
                              </Link>
                            </Tooltip>

                            <Tooltip
                              content="Delete"
                              position="left"
                              color="danger"
                            >
                              <button
                                onClick={() => setDeleteId(opp.id)}
                                className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-600 dark:text-red-400 flex items-center justify-center transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </section>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete this opportunity?"
        message="This action cannot be undone."
        confirmText="Yes, Delete"
        variant="danger"
        icon={Trash2}
      />
    </>
  );
}
