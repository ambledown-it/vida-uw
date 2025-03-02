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
  
  return {
    applicationStatus: {
      data: applicationStatusQuery.data,
      isLoading: applicationStatusQuery.isLoading,
      error: applicationStatusQuery.error
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
    // Add a refetch function to manually trigger data refresh
    refetch: () => {
      applicationStatusQuery.refetch()
      applicationTrendQuery.refetch()
      applicationSummaryQuery.refetch()
    }
  }
} 