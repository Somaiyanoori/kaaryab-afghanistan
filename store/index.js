import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "../lib/utils.js";
import { STORAGE_KEYS } from "../lib/constants.js";

// ============================================
// SAVED OPPORTUNITIES STORE
// ============================================
export const useSavedStore = create(
  persist(
    (set, get) => ({
      savedIds: [],
      savedOpportunities: [],

      saveOpportunity: (opportunity) => {
        const { savedIds } = get();
        if (savedIds.includes(opportunity.id)) return;

        set((state) => ({
          savedIds: [...state.savedIds, opportunity.id],
          savedOpportunities: [
            ...state.savedOpportunities,
            { ...opportunity, savedAt: new Date().toISOString() },
          ],
        }));
      },

      unsaveOpportunity: (id) => {
        set((state) => ({
          savedIds: state.savedIds.filter((savedId) => savedId !== id),
          savedOpportunities: state.savedOpportunities.filter(
            (opp) => opp.id !== id,
          ),
        }));
      },

      toggleSave: (opportunity) => {
        const { isSaved, saveOpportunity, unsaveOpportunity } = get();
        if (isSaved(opportunity.id)) {
          unsaveOpportunity(opportunity.id);
          return false;
        } else {
          saveOpportunity(opportunity);
          return true;
        }
      },

      isSaved: (id) => get().savedIds.includes(id),
      clearAllSaved: () => set({ savedIds: [], savedOpportunities: [] }),
      getSavedCount: () => get().savedIds.length,
    }),
    { name: STORAGE_KEYS.SAVED },
  ),
);

// ============================================
// USER OPPORTUNITIES STORE
// ============================================
export const useOpportunitiesStore = create(
  persist(
    (set, get) => ({
      userOpportunities: [],

      addOpportunity: (opportunityData) => {
        const newOpp = {
          ...opportunityData,
          id: generateId("user"),
          slug: `${opportunityData.title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
          postedDate: new Date().toISOString().split("T")[0],
          views: 0,
          saves: 0,
          featured: false,
          urgent: false,
          verified: false,
          status: "Active",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          userOpportunities: [newOpp, ...state.userOpportunities],
        }));
        return newOpp;
      },

      updateOpportunity: (id, data) => {
        set((state) => ({
          userOpportunities: state.userOpportunities.map((opp) =>
            opp.id === id
              ? { ...opp, ...data, updatedAt: new Date().toISOString() }
              : opp,
          ),
        }));
      },

      deleteOpportunity: (id) => {
        set((state) => ({
          userOpportunities: state.userOpportunities.filter(
            (opp) => opp.id !== id,
          ),
        }));
      },

      getOpportunityById: (id) => {
        return get().userOpportunities.find((opp) => opp.id === id) || null;
      },
    }),
    { name: STORAGE_KEYS.OPPORTUNITIES },
  ),
);

// ============================================
// FILTERS STORE
// ============================================
export const useFiltersStore = create((set, get) => ({
  search: "",
  category: "All",
  location: "All",
  type: "All",
  deadline: "all",
  sort: "newest",
  viewMode: "grid",
  page: 1,
  perPage: 12,

  setSearch: (search) => set({ search, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setLocation: (location) => set({ location, page: 1 }),
  setType: (type) => set({ type, page: 1 }),
  setDeadline: (deadline) => set({ deadline, page: 1 }),
  setSort: (sort) => set({ sort }),
  setViewMode: (viewMode) => set({ viewMode }),
  setPage: (page) => set({ page }),
  setPerPage: (perPage) => set({ perPage, page: 1 }),

  clearFilters: () =>
    set({
      search: "",
      category: "All",
      location: "All",
      type: "All",
      deadline: "all",
      sort: "newest",
      page: 1,
    }),

  getActiveFilterCount: () => {
    const state = get();
    let count = 0;
    if (state.search) count++;
    if (state.category !== "All") count++;
    if (state.location !== "All") count++;
    if (state.type !== "All") count++;
    if (state.deadline !== "all") count++;
    return count;
  },
}));

// ============================================
// UI STORE
// ============================================
export const useUIStore = create((set) => ({
  isMenuOpen: false,
  isFilterOpen: false,
  activeModal: null,
  scrolled: false,

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
  closeFilter: () => set({ isFilterOpen: false }),
  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),
  setScrolled: (scrolled) => set({ scrolled }),
}));

// ============================================
// CV STORE (UPDATED)
// ============================================
export const useCVStore = create(
  persist(
    (set, get) => ({
      cvData: {
        personal: {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          city: "",
          website: "",
          linkedin: "",
          summary: "",
        },
        experiences: [],
        education: [],
        skills: [],
        languages: [],
        projects: [],
        certifications: [],
      },
      selectedTemplate: "modern",

      setCVData: (data) => set({ cvData: data }),

      updatePersonal: (personal) =>
        set((state) => ({
          cvData: { ...state.cvData, personal },
        })),

      addSection: (section, item) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            [section]: [...state.cvData[section], item],
          },
        })),

      updateSection: (section, id, data) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            [section]: state.cvData[section].map((item) =>
              item.id === id ? { ...item, ...data } : item,
            ),
          },
        })),

      removeSection: (section, id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            [section]: state.cvData[section].filter((item) => item.id !== id),
          },
        })),

      setTemplate: (templateId) => set({ selectedTemplate: templateId }),

      clearCV: () =>
        set({
          cvData: {
            personal: {
              fullName: "",
              jobTitle: "",
              email: "",
              phone: "",
              city: "",
              website: "",
              linkedin: "",
              summary: "",
            },
            experiences: [],
            education: [],
            skills: [],
            languages: [],
            projects: [],
            certifications: [],
          },
        }),

      loadSampleData: (sample) => set({ cvData: sample }),
    }),
    { name: STORAGE_KEYS.CV },
  ),
);
