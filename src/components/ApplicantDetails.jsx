import { User, Phone, Mail, Calendar, Fingerprint, UserCircle, MapPin } from 'lucide-react'

const ApplicantDetails = ({ applicantData }) => {
  const formatAddress = () => {
    const parts = [
      applicantData.unitnumber,
      applicantData.buildingcomplex,
      applicantData.streetaddress,
      applicantData.suburb,
      applicantData.city,
      applicantData.province,
      applicantData.postalcode
    ].filter(Boolean)
    
    // Return a dash if no address components are available
    return parts.length > 0 ? parts.join(', ') : '-'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatGender = (gender) => {
    switch(gender?.toUpperCase()) {
      case 'M':
        return 'Male'
      case 'F':
        return 'Female'
      default:
        return gender
    }
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-[#213547] mb-4">Applicant Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <User className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Full Name</div>
              <div className="font-bold text-[#213547]">
                {applicantData.firstnames} {applicantData.surname}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Fingerprint className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">ID Number</div>
              <div className="font-bold text-[#213547]">{applicantData.idnumber}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Date of Birth</div>
              <div className="font-bold text-[#213547]">{formatDate(applicantData.dob)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <UserCircle className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Gender</div>
              <div className="font-bold text-[#213547]">{formatGender(applicantData.gender)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Cell Phone</div>
              <div className="font-bold text-[#213547]">{applicantData.cellphone || '-'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Email</div>
              <div className="font-bold text-[#213547]">{applicantData.email || '-'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-[#213547]" />
            </div>
            <div>
              <div className="text-sm text-[#213547]/70">Address</div>
              <div className="font-bold text-[#213547]">{formatAddress()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantDetails 