import { ChevronDown, ChevronUp, Wallet, TrendingUp, Ban } from 'lucide-react'
import { useState } from 'react'

const PremiumDetails = ({ premiumData, magnumDecision }) => {
  const [isPremiumExpanded, setIsPremiumExpanded] = useState(false)
  const isPremiumAvailable = magnumDecision?.toLowerCase() === 'accept'

  const formatCurrency = (amount) => {
    return `R ${parseFloat(amount).toLocaleString()}`
  }

  const premiumSchedule = JSON.parse(premiumData.premium_schedule || '{}')

  if (!isPremiumAvailable) {
    return (
      <div className="mt-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Premium Status</div>
              <div className="text-xl font-bold">
                Premium Unavailable
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Wallet className="w-5 h-5 text-[#213547]" />
          </div>
          <div>
            <div className="text-sm text-[#213547]/70">Initial Premium</div>
            <div className="text-xl font-bold text-[#213547]">
              {formatCurrency(premiumData.initial_premium)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setIsPremiumExpanded(!isPremiumExpanded)}
          className="premium-schedule-button"
        >
          <div className="bg-gray-100 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-[#213547]" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-[#213547]">Premium Schedule</div>
            <div className="text-sm text-[#213547]/70">View total  yearly premiums</div>
          </div>
          {isPremiumExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#213547]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#213547]" />
          )}
        </button>
        {isPremiumExpanded && (
          <div className="premium-schedule-content">
            {Object.entries(premiumSchedule).map(([year, amount]) => (
              <div key={year} className="premium-schedule-row">
                <span className="text-sm text-[#213547]/70">Year {year}</span>
                <span className="font-medium text-[#213547]">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PremiumDetails 