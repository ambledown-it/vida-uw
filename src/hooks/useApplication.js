import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAppStore from '../store/useAppStore'

export function useApplication(applicationId) {
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
    enabled: !!applicationId && !!token // Only run query if we have an applicationId and token
  })
} 