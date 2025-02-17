import { Search as SearchIcon } from 'lucide-react'

const SearchFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="pb-4 pt-4 pl-1 bg-white border-none">
      <div className="relative max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or ID number..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-2 focus:border-transparent"
        />
      </div>
    </div>
  )
}

export default SearchFilter 