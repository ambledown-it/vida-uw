import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAppStore from '../store/useAppStore'
import useAnalyticsFilterStore from '../store/useAnalyticsFilterStore'

export function useAnalytics() {
  const token = useAppStore(state => state.token)
  const { statusFilter, dateRange } = useAnalyticsFilterStore()
  
  // Build query parameters based on filters
  const getQueryParams = () => {
    const params = new URLSearchParams()
    
    // Add status filter if specified
    if (statusFilter && statusFilter.length > 0) {
      statusFilter.forEach(status => params.append('status', status))
    }
    
    // Add date range if specified
    if (dateRange.start) params.append('startDate', dateRange.start)
    if (dateRange.end) params.append('endDate', dateRange.end)
    
    return params.toString()
  }
  
  // Query to fetch application status counts with filters
  const applicationStatusQuery = useQuery({
    queryKey: ['analytics', 'application-status', statusFilter, dateRange],
    queryFn: async () => {
      const queryParams = getQueryParams()
      const url = `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-status${queryParams ? `?${queryParams}` : ''}`
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Query to fetch Magnum decision counts with filters
  const magnumDecisionQuery = useQuery({
    queryKey: ['analytics', 'magnum-decision', statusFilter, dateRange],
    queryFn: async () => {
      const queryParams = getQueryParams()
      const url = `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-magnum${queryParams ? `?${queryParams}` : ''}`
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  // Query to fetch application trend data with filters
  const applicationTrendQuery = useQuery({
    queryKey: ['analytics', 'application-trend', statusFilter, dateRange],
    queryFn: async () => {
      const queryParams = getQueryParams()
      const url = `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-trend${queryParams ? `?${queryParams}` : ''}`
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  // Query to fetch application summary counts with filters
  const applicationSummaryQuery = useQuery({
    queryKey: ['analytics', 'application-summary', statusFilter, dateRange],
    queryFn: async () => {
      const queryParams = getQueryParams()
      const url = `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-summary${queryParams ? `?${queryParams}` : ''}`
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  // Query to fetch province data with filters
  const provinceDataQuery = useQuery({
    queryKey: ['analytics', 'province-data', statusFilter, dateRange],
    queryFn: async () => {
      const queryParams = getQueryParams()
      const url = `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-province${queryParams ? `?${queryParams}` : ''}`
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  // Query to fetch gender data with filters
  const genderDataQuery = useQuery({
    queryKey: ['analytics', 'gender-data', statusFilter, dateRange],
    queryFn: async () => {
      const queryParams = getQueryParams()
      const url = `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-gender${queryParams ? `?${queryParams}` : ''}`
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  // Query to fetch age bin data with filters
  const ageBinDataQuery = useQuery({
    queryKey: ['analytics', 'age-bin-data', statusFilter, dateRange],
    queryFn: async () => {
      const queryParams = getQueryParams()
      const url = `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-age${queryParams ? `?${queryParams}` : ''}`
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  // Query to fetch income data with filters
  const incomeDataQuery = useQuery({
    queryKey: ['analytics', 'income-data', statusFilter, dateRange],
    queryFn: async () => {
      const queryParams = getQueryParams()
      const url = `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-income${queryParams ? `?${queryParams}` : ''}`
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  return {
    applicationStatus: {
      data: applicationStatusQuery.data,
      isLoading: applicationStatusQuery.isLoading,
      error: applicationStatusQuery.error
    },
    magnumDecision: {
      data: magnumDecisionQuery.data,
      isLoading: magnumDecisionQuery.isLoading,
      error: magnumDecisionQuery.error
    },
    applicationTrend: {
      data: applicationTrendQuery.data,
      isLoading: applicationTrendQuery.isLoading,
      error: applicationTrendQuery.error
    },
    applicationSummary: {
      data: applicationSummaryQuery.data,
      isLoading: applicationSummaryQuery.isLoading,
      error: applicationSummaryQuery.error
    },
    provinceData: {
      data: provinceDataQuery.data,
      isLoading: provinceDataQuery.isLoading,
      error: provinceDataQuery.error
    },
    genderData: {
      data: genderDataQuery.data,
      isLoading: genderDataQuery.isLoading,
      error: genderDataQuery.error
    },
    ageBinData: {
      data: ageBinDataQuery.data,
      isLoading: ageBinDataQuery.isLoading,
      error: ageBinDataQuery.error
    },
    incomeData: {
      data: incomeDataQuery.data,
      isLoading: incomeDataQuery.isLoading,
      error: incomeDataQuery.error
    },
    // Add a refetch function to manually trigger data refresh
    refetch: () => {
      applicationStatusQuery.refetch()
      magnumDecisionQuery.refetch()
      applicationTrendQuery.refetch()
      applicationSummaryQuery.refetch()
      provinceDataQuery.refetch()
      genderDataQuery.refetch()
      ageBinDataQuery.refetch()
      incomeDataQuery.refetch()
    }
  }
} 