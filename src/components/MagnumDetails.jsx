const MagnumDetails = ({ magnumData }) => {
  const formatDecision = (decision) => {
    if (!decision) return '-'
    return decision.charAt(0).toUpperCase() + decision.slice(1).toLowerCase()
  }

  const formatAdjustment = (adjustment) => {
    if (!adjustment) return 'No Adjustment'
    return Object.entries(adjustment).map(([key, value]) => (
      <div key={key} className="flex items-center gap-2">
        <span className="text-[#213547]/70">{key}:</span>
        <span>{value}%</span>
      </div>
    ))
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
      <h3 className="text-lg font-bold text-[#213547] mb-4">Magnum Results</h3>
      <table className="drawer-table">
        <tbody>
          <tr>
            <td>Decision</td>
            <td>{formatDecision(magnumData.decision)}</td>
          </tr>
          <tr>
            <td>Smoking Table</td>
            <td>{magnumData.smokingtable || '-'}</td>
          </tr>
          <tr>
            <td>Adjustments</td>
            <td className="flex flex-col gap-1">
              {formatAdjustment(magnumData.adjustment)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MagnumDetails 