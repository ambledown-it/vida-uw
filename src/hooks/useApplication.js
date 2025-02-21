import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useApplication(applicationId) {
  return useQuery({
    queryKey: ['application', applicationId],
    queryFn: async () => {
      if (!applicationId) return null
      
      const token = localStorage.getItem('token')
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
    enabled: !!applicationId // Only run query if we have an applicationId
  })
} 