import { create } from 'zustand'

const useAnalyticsFilterStore = create((set) => ({
  // Global filters
  dateRange: {
    start: null,
    end: null,
  },
  
  // Status filter (for applications dashboard)
  statusFilter: [], // Empty array means "all statuses"
  
  // Filter actions
  setDateRange: (start, end) => set({ dateRange: { start, end } }),
  setStatusFilter: (statuses) => set({ statusFilter: statuses }),
  
  // Reset filters
  resetFilters: () => set({
    dateRange: { start: null, end: null },
    statusFilter: [],
  }),
}))

export default useAnalyticsFilterStore 