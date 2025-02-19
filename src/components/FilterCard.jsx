import { Search as SearchIcon, RotateCcw } from 'lucide-react'
import SearchFilter from './SearchFilter'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FilterCard = ({ 
  searchTerm, 
  onSearchChange, 
  termFilter, 
  onTermFilterChange,
  dateRange,
  onDateRangeChange,
  salesChannel,
  onSalesChannelChange,
  sumAssuredFilter,
  onSumAssuredChange,
  manualUwFilter,
  onManualUwFilterChange
}) => {
  const handleTermChange = (e) => {
    const value = e.target.value
    onTermFilterChange(Number(value) || 0)
  }

  const handleDateChange = (field) => (e) => {
    onDateRangeChange({
      ...dateRange,
      [field]: e.target.value
    })
  }

  const formatCurrency = (value) => {
    return `R ${parseInt(value).toLocaleString()}`
  }

  const handleReset = () => {
    onSearchChange('')
    onTermFilterChange(0)
    onDateRangeChange({ from: '', to: '' })
    onSalesChannelChange('')
    onSumAssuredChange(0)
    onManualUwFilterChange('')
  }

  const getSliderProgress = (value, min, max) => {
    return ((value - min) / (max - min)) * 100
  }

  return (
    <div className="w-80 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#213547]">Filters</h2>
        <button
          onClick={handleReset}
          className="reset-filter-button"
          title="Reset Filters"
        >
          <RotateCcw />
        </button>
      </div>

      {/* Filter Content */}
      <div className="p-6 divide-y divide-gray-200">
      
        {/* Search Filter */}
        <SearchFilter 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />

        {/* Sales Channel Filter */}
        <div className="py-6">
          <label className="block text-sm font-bold text-[#213547] mb-2">
            Sales Channel
          </label>
          <select
            value={salesChannel}
            onChange={(e) => onSalesChannelChange(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg"
          >
            <option value="">All Channels</option>
            <option value="1">Brokerage</option>
            <option value="2">Call Center</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="py-6">
          <label className="block text-sm font-bold text-[#213547] mb-2">
            Date Created Range
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="date"
              value={dateRange.from}
              onChange={handleDateChange('from')}
              className="border-2 border-gray-200 rounded-lg"
              placeholder="From"
            />
            <input
              type="date"
              value={dateRange.to}
              onChange={handleDateChange('to')}
              className="border-2 border-gray-200 rounded-lg"
              placeholder="To"
            />
          </div>
        </div>

        {/* Term Filter */}
        <div className="py-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-[#213547]">
              Term (Years)
            </label>
            <span className="text-sm text-[#213547] font-medium">
              {termFilter || 'All'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">All</span>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={termFilter}
              onChange={handleTermChange}
              className="slider-track"
              style={{ '--range-progress': `${getSliderProgress(termFilter, 0, 20)}%` }}
            />
            <span className="text-xs text-gray-500">20y</span>
          </div>
        </div>

        {/* Sum Assured Filter */}
        <div className="py-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-[#213547]">
              Minimum Sum Assured
            </label>
            <span className="text-sm text-[#213547] font-medium">
              {sumAssuredFilter ? formatCurrency(sumAssuredFilter) : 'All'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">All</span>
            <input
              type="range"
              min="0"
              max="5000000"
              step="100000"
              value={sumAssuredFilter}
              onChange={(e) => onSumAssuredChange(Number(e.target.value))}
              className="slider-track"
              style={{ '--range-progress': `${getSliderProgress(sumAssuredFilter, 0, 5000000)}%` }}
            />
            <span className="text-xs text-gray-500">5M</span>
          </div>
        </div>

        {/* Manual Underwriting Filter - Now last */}
        <div className="py-6">
          <label className="block text-sm font-bold text-[#213547] mb-2">
            Manual Underwriting
          </label>
          <select
            value={manualUwFilter}
            onChange={(e) => onManualUwFilterChange(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Applications</option>
            <option value="yes">Manually Underwritten</option>
            <option value="no">Not Manually Underwritten</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterCard 