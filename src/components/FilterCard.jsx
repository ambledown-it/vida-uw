import { Search as SearchIcon } from 'lucide-react'

const FilterCard = ({ 
  searchTerm, 
  onSearchChange, 
  termFilter, 
  onTermFilterChange,
  dateRange,
  onDateRangeChange
}) => {
  const handleTermChange = (e) => {
    const value = e.target.value
    // Convert to number, if empty string or invalid, set to 0 (All)
    const numValue = value === '' ? 0 : Number(value)
    // Only allow numbers between 0 and 30
    if (numValue >= 0 && numValue <= 30) {
      onTermFilterChange(numValue)
    }
  }

  const handleDateChange = (field) => (e) => {
    onDateRangeChange({
      ...dateRange,
      [field]: e.target.value
    })
  }

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-6 items-end">
        {/* Search Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#213547] mb-1">
            Search Applications
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

        {/* Date Range Filter */}
        <div className="min-w-[300px]">
          <label className="block text-sm font-medium text-[#213547] mb-1">
            Date Range
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={dateRange.from}
              onChange={handleDateChange('from')}
              className="flex-1 px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#213547] focus:border-transparent"
            />
            <span className="text-[#213547]">to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={handleDateChange('to')}
              className="flex-1 px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#213547] focus:border-transparent"
            />
          </div>
        </div>

        {/* Term Filter */}
        <div className="min-w-[140px]">
          <label className="block text-sm font-medium text-[#213547] mb-1">
            Term (Years)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="30"
              placeholder="All"
              value={termFilter || ''}
              onChange={handleTermChange}
              className="w-20 px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#213547] focus:border-transparent"
            />
            <span className="text-sm text-[#213547]">
              {termFilter ? 'years' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterCard 