const PolicyDetails = ({ policyData }) => {
  const formatCurrency = (amount) => {
    return `R ${parseFloat(amount).toLocaleString()}`
  }

  const formatTerm = (months) => {
    return `${months/12} years`
  }

  const formatCommissionStructure = (structure) => {
    switch(structure) {
      case '0':
        return 'Upfront'
      case '1':
        return 'As-and-When'
      case '2':
        return 'Flat Fee'
      default:
        return structure
    }
  }

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm font-medium text-[#213547]/70 mb-1">
          Sum Assured
        </div>
        <div className="text-lg font-bold text-[#213547]">
          {formatCurrency(policyData.sumassured)}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm font-medium text-[#213547]/70 mb-1">
          Term
        </div>
        <div className="text-lg font-bold text-[#213547]">
          {formatTerm(policyData.term)}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm font-medium text-[#213547]/70 mb-1">
          Commission Structure
        </div>
        <div className="text-lg font-bold text-[#213547]">
          {formatCommissionStructure(policyData.commissionstructure)}
        </div>
      </div>
    </div>
  )
}

export default PolicyDetails 