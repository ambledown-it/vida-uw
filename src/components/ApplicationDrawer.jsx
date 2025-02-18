import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useSingleApplication } from '../contexts/SingleApplicationContext'
import ApplicantDetails from './ApplicantDetails'
import PolicyDetails from './PolicyDetails'
import MagnumDetails from './MagnumDetails'

const ApplicationDrawer = ({ isOpen, onClose, applicationId, applicantName, idNumber }) => {
  const { applicationDetails, fetchApplicationDetails } = useSingleApplication()

  useEffect(() => {
    if (isOpen && applicationId) {
      fetchApplicationDetails(applicationId)
    }
  }, [isOpen, applicationId])

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
        {applicationDetails && (
          <>
            <PolicyDetails policyData={applicationDetails[0]} />
            <ApplicantDetails applicantData={applicationDetails[0]} />
            <MagnumDetails magnumData={applicationDetails[0]} />
          </>
        )}
      </div>
    </div>
  )
}

export default ApplicationDrawer 