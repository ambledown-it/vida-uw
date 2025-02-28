import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAppStore from '../store/useAppStore'

export function useManualUnderwriting() {
  const queryClient = useQueryClient()
  const token = useAppStore(state => state.token)

  return useMutation({
    mutationFn: async ({ applicationId, data }) => {
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
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const responseText = await response.text()
      if (!responseText) {
        return { success: true }
      }

      try {
        return JSON.parse(responseText)
      } catch (e) {
        console.warn('Response was not JSON:', responseText)
        return { success: true, message: responseText }
      }
    },
    onSuccess: (_, variables) => {
      // Invalidate the application query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['application', variables.applicationId] })
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    }
  })
} 