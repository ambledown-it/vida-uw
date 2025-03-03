import { useState, useRef, useEffect } from 'react';
import useAnalyticsFilterStore from '../../store/useAnalyticsFilterStore';
import { ChevronDown, RotateCcw, Calendar } from 'lucide-react';

const AnalyticsFilters = () => {
  const { statusFilter, dateRange, setStatusFilter, setDateRange, resetFilters } = useAnalyticsFilterStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Set default start date to February 1, 2025 if not already set
  useEffect(() => {
    if (!dateRange.start) {
      const defaultStartDate = '2025-02-01';
      setDateRange(defaultStartDate, dateRange.end);
    }
  }, [dateRange.start, dateRange.end, setDateRange]);
  
  const statusOptions = [
    { id: '1', label: 'Open' },
    { id: '2', label: 'Referred' },
    { id: '3', label: 'Accepted' },
    { id: '4', label: 'Rejected' }
  ];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleStatusChange = (statusId) => {
    if (statusFilter.includes(statusId)) {
      // If already selected, remove it
      setStatusFilter(statusFilter.filter(id => id !== statusId));
    } else {
      // If not selected, add it
      setStatusFilter([...statusFilter, statusId]);
    }
  };
  
  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setDateRange(value, dateRange.end);
    } else {
      setDateRange(dateRange.start, value);
    }
  };
  
  const handleResetFilters = () => {
    resetFilters();
    // Re-set default start date after reset
    const defaultStartDate = '2025-02-01';
    setDateRange(defaultStartDate, null);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // Get labels for selected statuses for the dropdown preview
  const getSelectedStatusLabels = () => {
    if (statusFilter.length === 0) return "All Statuses";
    
    return statusFilter.map(id => 
      statusOptions.find(option => option.id === id)?.label
    ).join(', ');
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Check if date filter is active (has end date)
  const isDateFilterActive = !!dateRange.end;

  return (
    <div className="bg-[#213547] border border-gray-100 rounded-lg shadow-sm p-4 mb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-start">
          
          {/* Status Dropdown with Label */}
          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <label className="block text-white text-sm font-medium mb-1">
              Application Status
            </label>
            <button
              onClick={toggleDropdown}
              className="filter-dropdown flex items-center justify-between w-full px-3 py-2 bg-white text-[#213547] rounded-md text-sm font-medium h-10"
            >
              <span className="truncate">
                {getSelectedStatusLabels()}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            
            {/* Dropdown options */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {statusOptions.map(status => (
                  <div
                    key={status.id}
                    onClick={() => handleStatusChange(status.id)}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={statusFilter.includes(status.id)}
                      onChange={() => {}}
                      className="filter-checkbox mr-2"
                    />
                    <span>{status.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Date Range Filter Group */}
          <div className="w-full md:flex md:gap-2 items-start">
            <div className="relative w-full md:w-64">
              <label className="block text-white text-sm font-medium mb-1">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dateRange.start || '2025-02-01'}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className={`filter-dropdown w-full px-3 py-2 bg-white text-[#213547] rounded-md text-sm font-medium pr-10 h-10 ${isDateFilterActive ? 'ring-2 ring-blue-400' : ''}`}
                  style={{ colorScheme: 'light' }}
                />
              </div>
            </div>
            
            <div className="relative w-full md:w-64 mt-4 md:mt-0">
              <label className="block text-white text-sm font-medium mb-1">
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dateRange.end || ''}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className={`filter-dropdown w-full px-3 py-2 bg-white text-[#213547] rounded-md text-sm font-medium pr-10 h-10 ${isDateFilterActive ? 'ring-2 ring-blue-400' : ''}`}
                  style={{ colorScheme: 'light' }}
                />

              </div>
            </div>
            
            {/* Active Date Range Indicator */}
            {isDateFilterActive && (
              <div className="mt-4 md:mt-8 text-white text-sm p-1 px-2 bg-blue-500 bg-opacity-20 rounded-md inline-flex items-center md:ml-2">
                <span>Filtering: {formatDate(dateRange.start)} - {formatDate(dateRange.end)}</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleResetFilters}
          className="reset-button mt-3 md:mt-0 px-4 py-2 bg-white hover:bg-gray-100 text-[#213547] rounded-md text-sm font-medium"
        >
          <RotateCcw />
        </button>
      </div>
    </div>
  );
};

export default AnalyticsFilters; 