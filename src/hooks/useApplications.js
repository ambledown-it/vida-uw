import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/fetch-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      
      return response.data
    },
    staleTime: 1000 * 60 * 1, // Consider data fresh for 1 minute
    retry: 1
  })
} 