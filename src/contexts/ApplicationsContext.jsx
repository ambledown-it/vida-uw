import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const ApplicationsContext = createContext({})

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  const fetchApplications = async () => {
    if (!user) return

    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/fetch-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log('Applications data:', response.data)
      setApplications(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError('Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchApplications()
    }
  }, [user])

  return (
    <ApplicationsContext.Provider value={{ applications, loading, error, fetchApplications }}>
      {children}
    </ApplicationsContext.Provider>
  )
}

export const useApplications = () => useContext(ApplicationsContext) 