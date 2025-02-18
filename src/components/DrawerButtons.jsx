import { FileText, Phone, PenLine } from 'lucide-react'
import { useState } from 'react'
import ManualUnderwritingDrawer from './ManualUnderwritingDrawer'

const DrawerButtons = ({ magnumDecision }) => {
  const [isManualUnderwritingOpen, setIsManualUnderwritingOpen] = useState(false)
  const isManualUnderwritingEnabled = magnumDecision?.toLowerCase() === 'refer'

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="p-0 grid grid-cols-3 gap-0">
          <button className="drawer-action-button bg-gray-50 rounded-none hover:bg-[#C5D796]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-6" />
              <span className='font-bold'>View Decision Report</span>
            </div>
          </button>
          <button className="drawer-action-button bg-gray-50 rounded-none hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-6" />
              <span className='font-bold'>Contact Applicant</span>
            </div>
          </button>
          <button 
            className={`drawer-action-button bg-gray-50 rounded-none ${
              isManualUnderwritingEnabled ? 'hover:bg-[#C5D796]' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isManualUnderwritingEnabled}
            onClick={() => setIsManualUnderwritingOpen(true)}
          >
            <div className="flex items-center gap-2">
              <PenLine className="w-4 h-6" />
              <span className='font-bold'>Manual Underwriting</span>
            </div>
          </button>
        </div>
      </div>

      <ManualUnderwritingDrawer 
        isOpen={isManualUnderwritingOpen}
        onClose={() => setIsManualUnderwritingOpen(false)}
      />
    </>
  )
}

export default DrawerButtons 