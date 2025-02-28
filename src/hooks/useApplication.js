import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAppStore from '../store/useAppStore'

export function useApplication(applicationId, isOpen = false) {
  const token = useAppStore(state => state.token)
  
  return useQuery({
    queryKey: ['application', applicationId],
    queryFn: async () => {
      if (!applicationId) return null
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/application/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      
      return response.data
    },
    // Only run query if we have an applicationId, token, and the drawer is open
    enabled: !!applicationId && !!token && isOpen,
    // Consider data stale immediately so it's always refetched when drawer opens
    staleTime: 0,
    // Always refetch when component mounts (drawer opens)
    refetchOnMount: true,
    // Retain the data in cache for fast reopening
    cacheTime: 5 * 60 * 1000 // 5 minutes
  })
} 