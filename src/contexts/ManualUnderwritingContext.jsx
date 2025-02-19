import { createContext, useContext } from 'react'

const ManualUnderwritingContext = createContext()

export const useManualUnderwriting = () => {
  const context = useContext(ManualUnderwritingContext)
  if (!context) {
    throw new Error('useManualUnderwriting must be used within a ManualUnderwritingProvider')
  }
  return context
}

export const ManualUnderwritingProvider = ({ children }) => {
  const submitManualUnderwriting = async (applicationId, data) => {
    try {
      // Format adjustments into key-value pairs using the type as the key
      const formattedAdjustments = data.adjustments?.reduce((acc, adj) => {
        if (adj.type && adj.value) {
          // Use the type value directly as the key (EM or PM)
          const key = adj.type === 'loading' ? 'EM' : 'PM'
          acc[key] = adj.value
        }
        return acc
      }, {})

      // Format exclusions into key-value pairs
      const formattedExclusions = data.exclusions?.reduce((acc, excl, index) => {
        if (excl.exclusion) {
          acc[`exclusion${index + 1}`] = excl.exclusion
        }
        return acc
      }, {})

      const payload = {
        applicationid: applicationId,
        decision: data.decision,
        adjustments: Object.keys(formattedAdjustments || {}).length > 0 ? formattedAdjustments : null,
        exclusions: Object.keys(formattedExclusions || {}).length > 0 ? formattedExclusions : null,
        notes: data.notes || null
      }

      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/manual-underwriting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        let errorMessage = 'Failed to submit manual underwriting'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const responseText = await response.text()
      if (!responseText) {
        return { success: true } // Return a default success response if empty
      }

      try {
        return JSON.parse(responseText)
      } catch (e) {
        console.warn('Response was not JSON:', responseText)
        return { success: true, message: responseText }
      }
    } catch (error) {
      console.error('Error submitting manual underwriting:', error)
      throw error
    }
  }

  return (
    <ManualUnderwritingContext.Provider value={{ submitManualUnderwriting }}>
      {children}
    </ManualUnderwritingContext.Provider>
  )
} 