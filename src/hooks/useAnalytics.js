import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAppStore from '../store/useAppStore'

export function useAnalytics() {
  const token = useAppStore(state => state.token)
  
  // Query to fetch application status counts
  const applicationStatusQuery = useQuery({
    queryKey: ['analytics', 'application-status'],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  // Query to fetch application trend data
  const applicationTrendQuery = useQuery({
    queryKey: ['analytics', 'application-trend'],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/analytics/applications/count-trend`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
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
    }
  }
} 