const StatusBadge = ({ status, actioner }) => {
  const getStatusStyles = (status) => {
    // If status is a string (legacy support), convert to lowercase for comparison
    if (typeof status === 'string') {
      const statusLower = status.toLowerCase();
      if (statusLower === 'accepted' || statusLower === 'quoted') return 'bg-blue-100 text-blue-700';
      if (statusLower === 'referred') return 'bg-amber-50 text-amber-700';
      if (statusLower === 'rejected') return 'bg-red-50 text-red-700';
      if (statusLower === 'pending') return 'bg-gray-50 text-gray-700';
      return 'bg-gray-200 text-gray-700';
    }
    
    // Handle numeric statusid
    switch(status) {
      case '1': // Open/Pending
        return 'bg-gray-50 text-gray-700';
      case '2': // Referred
        return 'bg-amber-50 text-amber-700';
      case '3': // Quoted
        return 'bg-blue-50 text-blue-700';
      case '4': // Rejected
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  }

  const formatStatus = (status) => {
    // If status is a string (legacy support), format it properly
    if (typeof status === 'string' && isNaN(status)) {
      if (!status) return 'Pending';
      return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    }
    
    // Handle numeric statusid
    switch(status) {
      case '1':
        return 'Pending';
      case '2':
        return 'Referred';
      case '3':
        return 'Quoted';
      case '4':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  // Format the combined text with status and actioner
  const badgeText = actioner 
    ? `${formatStatus(status)} ${actioner}` 
    : formatStatus(status);

  return (
    <span className={`
      inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium
      ${getStatusStyles(status)}
    `}>
      {badgeText}
    </span>
  )
}

export default StatusBadge 