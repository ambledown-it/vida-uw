import { Cigarette, Calculator, PenLine } from 'lucide-react'

const MagnumDetails = ({ magnumData }) => {
  const formatDecision = (decision) => {
    if (!decision) return '-'
    return decision.charAt(0).toUpperCase() + decision.slice(1).toLowerCase()
  }

  const formatAdjustment = (adjustment) => {
    if (!adjustment) return 'No Adjustment'
    return Object.entries(adjustment).map(([key, value]) => (
      <div key={key} className="flex items-center gap-2">
        <span>{key.toUpperCase()}</span>
        <span className="text-amber-600">{value}%</span>
      </div>
    ))
  }

  const formatExclusions = (exclusions) => {
    if (!exclusions) return 'No Exclusions'
    return Object.entries(exclusions).map(([key, value]) => (
      <div key={key} className="text-[#213547]">{value}</div>
    ))
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-[#213547] mb-4">Risk Assessment Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Cigarette className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Smoking Table</div>
              <div className="font-bold text-[#213547]">{magnumData.smokingtable || '-'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Calculator className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Magnum Adjustment</div>
              <div className="font-bold text-[#213547]">{formatAdjustment(magnumData.adjustment)}</div>
            </div>
          </div>
        </div>

        {magnumData.manualuwid && (
          <>
            {magnumData.manual_adjustments && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <PenLine className="w-5 h-5 text-[#213547]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#213547]/70 font-bold">Manual Adjustments</div>
                    <div className="font-bold text-[#213547]">{formatAdjustment(magnumData.manual_adjustments)}</div>
                  </div>
                </div>
              </div>
            )}

            {magnumData.manual_exclusions && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <PenLine className="w-5 h-5 text-[#213547]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#213547]/70 font-bold">Manual Exclusions</div>
                    <div className="space-y-1">{formatExclusions(magnumData.manual_exclusions)}</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MagnumDetails 