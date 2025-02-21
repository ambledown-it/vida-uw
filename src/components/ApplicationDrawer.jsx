import { X } from 'lucide-react'
import { useApplication } from '../hooks/useApplication'
import ApplicantDetails from './ApplicantDetails'
import PolicyDetails from './PolicyDetails'
import MagnumDetails from './MagnumDetails'
import PremiumDetails from './PremiumDetails'
import DrawerButtons from './DrawerButtons'

const ApplicationDrawer = ({ isOpen, onClose, applicationId, applicantName, idNumber }) => {
  const { data: applicationDetails, isLoading, error } = useApplication(applicationId)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="drawer-backdrop"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`
        fixed inset-y-0 right-0 w-[45%] bg-gray-50 shadow-xl transform 
        transition-transform duration-300 ease-in-out z-50
        flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header - fixed at top */}
        <div className="bg-[#213547] h-24 px-6 flex items-center shrink-0" style={{ backgroundImage: 'url("/bg-header.svg")' }}>
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

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-200 pb-24">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">Loading application details...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">Failed to load application details</div>
            ) : applicationDetails && (
              <>
                <div className="px-6 py-4 bg-white">
                  <PolicyDetails policyData={applicationDetails[0]} />
                  <PremiumDetails 
                    premiumData={applicationDetails[0]} 
                    magnumDecision={applicationDetails[0].decision}
                  />
                </div>
                <div className="px-6 py-4 bg-gray-50">
                  <ApplicantDetails applicantData={applicationDetails[0]} />
                </div>
                <div className="px-6 py-4 bg-white">
                  <MagnumDetails magnumData={applicationDetails[0]} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Buttons - fixed at bottom */}
        <div className="shrink-0">
          <DrawerButtons 
            magnumDecision={applicationDetails?.[0]?.decision}
            applicationId={applicationId}
            applicationDetails={applicationDetails?.[0]}
          />
        </div>
      </div>
    </>
  )
}

export default ApplicationDrawer 