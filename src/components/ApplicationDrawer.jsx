import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useSingleApplication } from '../contexts/SingleApplicationContext'
import ApplicantDetails from './ApplicantDetails'
import PolicyDetails from './PolicyDetails'
import MagnumDetails from './MagnumDetails'
import PremiumDetails from './PremiumDetails'
import DrawerButtons from './DrawerButtons'

const ApplicationDrawer = ({ isOpen, onClose, applicationId, applicantName, idNumber }) => {
  const { applicationDetails, fetchApplicationDetails } = useSingleApplication()

  useEffect(() => {
    if (isOpen && applicationId) {
      fetchApplicationDetails(applicationId)
    }
  }, [isOpen, applicationId])

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
      <div 
        className={`
          fixed top-0 right-0 h-full w-[45%] bg-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          z-[60] shadow-lg
        `}
      >
        {/* Header */}
        <div className="bg-[#213547] h-24 px-6 flex items-center"       style={{ backgroundImage: 'url("/bg-header.svg")' }}>
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
        <div className="divide-y divide-gray-200 pb-24">
          {applicationDetails && (
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

        {/* Buttons */}
        <DrawerButtons 
          magnumDecision={applicationDetails?.[0]?.decision}
          applicationId={applicationId}
          applicationDetails={applicationDetails?.[0]}
        />
      </div>
    </>
  )
}

export default ApplicationDrawer 