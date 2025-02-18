import { Search as SearchIcon } from 'lucide-react'

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
  onSumAssuredChange
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-[300px] flex-shrink-0">
      <div className="flex flex-col gap-8">
        {/* Search Filter */}
        <div>
          <label className="block text-sm font-medium text-[#213547] mb-2">
            Search
          </label>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or ID number..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#213547] focus:border-transparent"
            />
          </div>
        </div>

        {/* Sales Channel Filter */}
        <div>
          <label className="block text-sm font-medium text-[#213547] mb-2">
            Sales Channel
          </label>
          <select
            value={salesChannel}
            onChange={(e) => onSalesChannelChange(e.target.value)}
            className="w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#213547] focus:border-transparent"
          >
            <option value="">All Channels</option>
            <option value="1">Brokerage</option>
            <option value="2">Call Center</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-[#213547] mb-2">
            Date Created Range
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="date"
              value={dateRange.from}
              onChange={handleDateChange('from')}
              className="w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#213547] focus:border-transparent"
              placeholder="From"
            />
            <input
              type="date"
              value={dateRange.to}
              onChange={handleDateChange('to')}
              className="w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#213547] focus:border-transparent"
              placeholder="To"
            />
          </div>
        </div>

        {/* Term Filter */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-[#213547]">
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
              className="
                flex-1 h-2 rounded-lg appearance-none cursor-pointer
                bg-gray-200
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#213547]
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#213547]
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer
              "
            />
            <span className="text-xs text-gray-500">20y</span>
          </div>
        </div>

        {/* Sum Assured Filter */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-[#213547]">
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
              className="
                flex-1 h-2 rounded-lg appearance-none cursor-pointer
                bg-gray-200
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#213547]
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#213547]
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer
              "
            />
            <span className="text-xs text-gray-500">5M</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterCard 