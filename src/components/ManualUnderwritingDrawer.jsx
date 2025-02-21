import { X, CheckCircle2, XCircle, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useManualUnderwriting } from '../hooks/useManualUnderwriting'
import { useQueryClient } from '@tanstack/react-query'

const ManualUnderwritingDrawer = ({ isOpen, onClose, applicationId }) => {
  const queryClient = useQueryClient()
  const [decision, setDecision] = useState('')
  const [hasAdjustments, setHasAdjustments] = useState(false)
  const [hasExclusions, setHasExclusions] = useState(false)
  const [hasNotes, setHasNotes] = useState(false)
  const [adjustments, setAdjustments] = useState([
    { id: 1, type: '', value: '' }
  ])
  const [exclusions, setExclusions] = useState([
    { id: 1, exclusion: '' }
  ])
  const [notes, setNotes] = useState('')
  const { mutate: submitManualUnderwriting, isLoading: isSubmitting } = useManualUnderwriting()

  const handleClose = () => {
    // Reset form state
    setDecision('')
    setHasAdjustments(false)
    setHasExclusions(false)
    setHasNotes(false)
    setAdjustments([{ id: 1, type: '', value: '' }])
    setExclusions([{ id: 1, exclusion: '' }])
    setNotes('')
    
    // Invalidate both queries to ensure fresh data
    queryClient.invalidateQueries({ queryKey: ['applications'] })
    queryClient.invalidateQueries({ queryKey: ['application', applicationId] })
    
    onClose()
  }

  const handleAdjustmentChange = (id, field, value) => {
    if (field === 'value') {
      const numValue = parseFloat(value)
      if (isNaN(numValue) || numValue < 0 || numValue > 100) return
    }
    
    setAdjustments(current =>
      current.map(adj => 
        adj.id === id ? { ...adj, [field]: value } : adj
      )
    )
  }

  const addAdjustment = () => {
    const newId = Math.max(...adjustments.map(adj => adj.id)) + 1
    setAdjustments(current => [...current, { id: newId, type: '', value: '' }])
  }

  const removeAdjustment = (id) => {
    setAdjustments(current => current.filter(adj => adj.id !== id))
  }

  const handleExclusionChange = (id, value) => {
    setExclusions(current =>
      current.map(excl => 
        excl.id === id ? { ...excl, exclusion: value } : excl
      )
    )
  }

  const addExclusion = () => {
    const newId = Math.max(...exclusions.map(excl => excl.id)) + 1
    setExclusions(current => [...current, { id: newId, exclusion: '' }])
  }

  const removeExclusion = (id) => {
    setExclusions(current => current.filter(excl => excl.id !== id))
  }

  const handleSubmit = async () => {
    if (!decision) return

    const data = {
      decision,
      adjustments: hasAdjustments ? adjustments : null,
      exclusions: hasExclusions ? exclusions : null,
      notes: hasNotes ? notes : null
    }

    submitManualUnderwriting(
      { applicationId, data },
      {
        onSuccess: () => {
          handleClose()
        },
        onError: (error) => {
          console.error('Failed to submit:', error)
        }
      }
    )
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="drawer-backdrop"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-[80%] bg-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          z-[60] shadow-lg flex flex-col
        `}
      >
        {/* Header */}
        <div className="bg-[#213547] h-24 px-6 flex items-center" style={{ backgroundImage: 'url("/bg-header.svg")' }}>
          <button
            onClick={handleClose}
            className="drawer-exit-button text-white hover:text-gray-200 mr-6"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-white text-lg font-medium">
            Manual Underwriting
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {/* Decision Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-[#213547] mb-4">Decision</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setDecision('ACCEPT')}
                className={`decision-button ${decision === 'ACCEPT' ? 'accept' : ''}`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Accept Application</span>
              </button>
              <button
                onClick={() => setDecision('REJECT')}
                className={`decision-button ${decision === 'REJECT' ? 'reject' : ''}`}
              >
                <XCircle className="w-5 h-5" />
                <span>Reject Application</span>
              </button>
            </div>
          </div>

          {/* Form Fields Cards */}
          {decision && (
            <>
              {decision === 'ACCEPT' && (
                <>
                  {/* Adjustments Card */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#213547]">Adjustments</h3>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="hasAdjustments"
                            checked={hasAdjustments}
                            onChange={() => setHasAdjustments(true)}
                            className="custom-radio"
                          />
                          <span className="text-sm text-[#213547]">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="hasAdjustments"
                            checked={!hasAdjustments}
                            onChange={() => setHasAdjustments(false)}
                            className="custom-radio"
                          />
                          <span className="text-sm text-[#213547]">No</span>
                        </label>
                      </div>
                    </div>
                    {hasAdjustments && (
                      <div className="space-y-4">
                        {/* Adjustments Table Header */}
                        <div className="grid grid-cols-2 gap-4 px-3 py-2 bg-gray-50 rounded-t-lg">
                          <div className="text-xs font-medium text-[#213547]">Type</div>
                          <div className="text-xs font-medium text-[#213547]">Value (%)</div>
                        </div>

                        {/* Adjustment Rows */}
                        {adjustments.map((adjustment) => (
                          <div key={adjustment.id} className="grid grid-cols-2 gap-4 items-center">
                            <select
                              value={adjustment.type}
                              onChange={(e) => handleAdjustmentChange(adjustment.id, 'type', e.target.value)}
                              className="p-2 text-sm border border-gray-200 rounded-lg bg-white"
                            >
                              <option value="">Select type...</option>
                              <option value="loading">Extra Mortality (EM)</option>
                              <option value="discount">per Mille (PM)</option>
                            </select>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                value={adjustment.value}
                                onChange={(e) => handleAdjustmentChange(adjustment.id, 'value', e.target.value)}
                                className="p-2 text-sm border border-gray-200 rounded-lg w-full"
                                placeholder="Enter value..."
                                min="0"
                                max="100"
                                step="1"
                              />
                              {adjustments.length > 1 && (
                                <button
                                  onClick={() => removeAdjustment(adjustment.id)}
                                  className="delete-adjustment-button"
                                  title="Remove Adjustment"
                                >
                                  <Trash2 />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Add Button */}
                        <button
                          onClick={addAdjustment}
                          className="add-adjustment-button"
                          title="Add Adjustment"
                        >
                          <Plus />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Exclusions Card */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#213547]">Exclusions</h3>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="hasExclusions"
                            checked={hasExclusions}
                            onChange={() => setHasExclusions(true)}
                            className="custom-radio"
                          />
                          <span className="text-sm text-[#213547]">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="hasExclusions"
                            checked={!hasExclusions}
                            onChange={() => setHasExclusions(false)}
                            className="custom-radio"
                          />
                          <span className="text-sm text-[#213547]">No</span>
                        </label>
                      </div>
                    </div>
                    {hasExclusions && (
                      <div className="space-y-4">
                        {/* Exclusions Header */}
                        {/* Exclusion Rows */}
                        {exclusions.map((exclusion) => (
                          <div key={exclusion.id} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={exclusion.exclusion}
                              onChange={(e) => handleExclusionChange(exclusion.id, e.target.value)}
                              className="p-2 text-sm border border-gray-200 rounded-lg flex-1"
                              placeholder="Enter exclusion details..."
                            />
                            {exclusions.length > 1 && (
                              <button
                                onClick={() => removeExclusion(exclusion.id)}
                                className="delete-adjustment-button"
                                title="Remove Exclusion"
                              >
                                <Trash2 />
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Add Button */}
                        <button
                          onClick={addExclusion}
                          className="add-adjustment-button"
                          title="Add Exclusion"
                        >
                          <Plus />
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Notes Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#213547]">Notes</h3>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasNotes"
                        checked={hasNotes}
                        onChange={() => setHasNotes(true)}
                        className="custom-radio"
                      />
                      <span className="text-sm text-[#213547]">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasNotes"
                        checked={!hasNotes}
                        onChange={() => setHasNotes(false)}
                        className="custom-radio"
                      />
                      <span className="text-sm text-[#213547]">No</span>
                    </label>
                  </div>
                </div>
                {hasNotes && (
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 text-sm"
                    rows={4}
                    placeholder="Enter additional notes..."
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Fixed Submit Button */}
        {decision && (
          <div className="border-t border-gray-200 p-0 bg-white">
            <button
              className="drawer-action-button w-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting 
                  ? 'Submitting...' 
                  : `Submit ${decision === 'ACCEPT' ? 'Acceptance' : 'Rejection'}`
                }
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default ManualUnderwritingDrawer 