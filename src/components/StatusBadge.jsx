const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch(status?.toLowerCase()) {
      case 'accepted':
        return 'bg-[#F3F7E9] text-[#93b244]'
      case 'referred':
        return 'bg-amber-50 text-amber-700'
      case 'rejected':
        return 'bg-red-50 text-red-700'
      case 'pending':
        return 'bg-gray-50 text-gray-700'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  const formatStatus = (status) => {
    if (!status) return 'Pending'
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  return (
    <span className={`
      inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium
      ${getStatusStyles(status)}
    `}>
      {formatStatus(status)}
    </span>
  )
}

export default StatusBadge 