import { X } from 'lucide-react'

const ApplicationDrawer = ({ isOpen, onClose, applicationId, applicantName, idNumber }) => {
  return (
    <div 
      className={`
        fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        z-50
      `}
    >
      {/* Header */}
      <div className="bg-[#213547] h-24 px-6 flex items-center">
        <button
          onClick={onClose}
          className="drawer-exit-button text-white hover:text-gray-200 mr-6"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col">
          <div className="text-white text-lg font-medium">
            Application {applicationId}
          </div>
          <div className="text-white/80 text-sm flex items-center gap-2">
            <span>{applicantName}</span>
            <span className="text-white/40">•</span>
            <span>{idNumber}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Drawer content will go here */}
      </div>
    </div>
  )
}

export default ApplicationDrawer 