import { CheckCircle2, XCircle, AlertCircle, Banknote, Clock, Briefcase, PenLine } from 'lucide-react'

const PolicyDetails = ({ policyData }) => {
  const formatCurrency = (amount) => {
    return `R ${parseFloat(amount).toLocaleString()}`
  }

  const formatTerm = (months) => {
    return `${months/12} years`
  }

  const getDecisionColor = (decision) => {
    switch(decision?.toLowerCase()) {
      case 'accept':
        return 'bg-[#F3F7E9] text-[#93b244]'
      case 'refer':
        return 'bg-amber-50 text-amber-700'
      case 'reject':
        return 'bg-red-50 text-red-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  const getDecisionMessage = (decision) => {
    switch(decision?.toLowerCase()) {
      case 'accept':
        return 'Application approved with adjustments'
      case 'refer':
        return 'Application requires manual underwriting review'
      case 'reject':
        return 'Application declined'
      default:
        return ''
    }
  }

  const formatDecision = (decision) => {
    if (!decision) return '-'
    return decision.charAt(0).toUpperCase() + decision.slice(1).toLowerCase()
  }

  const getDecisionIcon = (decision) => {
    switch(decision?.toLowerCase()) {
      case 'accept':
        return <CheckCircle2 className="w-6 h-6 text-[#93b244]" />
      case 'reject':
        return <XCircle className="w-6 h-6 text-red-600" />
      case 'refer':
        return <AlertCircle className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  const getDecisionHighlightColor = (decision) => {
    switch(decision?.toLowerCase()) {
      case 'accept':
        return 'bg-[#93b244]'
      case 'refer':
        return 'bg-amber-500'
      case 'reject':
        return 'bg-red-500'
      default:
        return 'bg-gray-300'
    }
  }

  const getDecisionContent = (decision) => {
    if (!decision) {
      return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-1 bg-gray-300" />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-600">
              No Magnum Decision for this application
            </h3>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className={`h-1 ${getDecisionHighlightColor(decision)}`} />
          <div className={`p-4 flex items-center gap-3`}>
            {getDecisionIcon(decision)}
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1 text-[#213547]">
                Magnum Decision: {formatDecision(decision)}
              </h3>
              <p className="text-sm text-[#213547]/70">
                {getDecisionMessage(decision)}
              </p>
            </div>
          </div>
        </div>

        {policyData.manualuwid && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className={`h-1 ${getDecisionHighlightColor(policyData.manual_decision)}`} />
            <div className={`p-4 flex items-center gap-3`}>
              {getDecisionIcon(policyData.manual_decision)}
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1 text-[#213547]">
                  Manual Underwriting Decision: {formatDecision(policyData.manual_decision)}
                </h3>
                <p className="text-sm text-[#213547]/70">
                  {getDecisionMessage(policyData.manual_decision)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {getDecisionContent(policyData.decision)}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Banknote className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Sum Assured</div>
              <div className="text-lg font-bold text-[#213547]">
                {formatCurrency(policyData.sumassured)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Term</div>
              <div className="text-lg font-bold text-[#213547]">
                {formatTerm(policyData.term)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Briefcase className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Commission</div>
              <div className="text-lg font-bold text-[#213547]">
                {policyData.commissionstructure === '0' ? 'Upfront' : 
                 policyData.commissionstructure === '1' ? 'As-and-When' : 'Flat Fee'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyDetails 