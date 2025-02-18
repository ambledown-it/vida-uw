import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const SingleApplicationContext = createContext({})

export function SingleApplicationProvider({ children }) {
  const [applicationDetails, setApplicationDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  const fetchApplicationDetails = async (applicationId) => {
    if (!user || !applicationId) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/application/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setApplicationDetails(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch application details')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SingleApplicationContext.Provider value={{ 
      applicationDetails, 
      loading, 
      error, 
      fetchApplicationDetails 
    }}>
      {children}
    </SingleApplicationContext.Provider>
  )
}

export const useSingleApplication = () => useContext(SingleApplicationContext) 