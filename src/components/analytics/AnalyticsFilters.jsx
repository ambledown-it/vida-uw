import { useState, useRef, useEffect } from 'react';
import useAnalyticsFilterStore from '../../store/useAnalyticsFilterStore';
import { ChevronDown, RotateCcw } from 'lucide-react';

const AnalyticsFilters = () => {
  const { statusFilter, setStatusFilter, resetFilters } = useAnalyticsFilterStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
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
  
  const handleResetFilters = () => {
    resetFilters();
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

  return (
    <div className="bg-[#213547] border border-gray-100 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-full md:w-auto">
          
          {/* Status Dropdown with Label */}
          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <label className="block text-white text-sm font-medium mb-1">
              Application Status
            </label>
            <button
              onClick={toggleDropdown}
              className="filter-dropdown flex items-center justify-between w-full px-3 py-2 bg-white text-[#213547] rounded-md text-sm font-medium"
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