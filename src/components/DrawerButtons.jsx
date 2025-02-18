import { FileText, Phone, PenLine } from 'lucide-react'

const DrawerButtons = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="p-6 grid grid-cols-3 gap-4">
        <button className="drawer-action-button bg-gray-50 rounded-lg hover:bg-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>View Decision Report</span>
          </div>
        </button>
        <button className="drawer-action-button bg-gray-50 rounded-lg hover:bg-gray-100">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Contact Applicant</span>
          </div>
        </button>
        <button className="drawer-action-button bg-gray-50 rounded-lg hover:bg-gray-100">
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4" />
            <span>Manual Underwrite</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default DrawerButtons 