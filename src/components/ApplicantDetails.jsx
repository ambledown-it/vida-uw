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
    
    return parts.join(', ')
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
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold text-[#213547] mb-4">Applicant Details</h3>
      <table className="drawer-table">
        <tbody>
          <tr>
            <td>ID Number</td>
            <td>{applicantData.idnumber}</td>
          </tr>
          <tr>
            <td>First Names</td>
            <td>{applicantData.firstnames}</td>
          </tr>
          <tr>
            <td>Surname</td>
            <td>{applicantData.surname}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{formatDate(applicantData.dob)}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{formatGender(applicantData.gender)}</td>
          </tr>
          <tr>
            <td>Cell Phone</td>
            <td>{applicantData.cellphone}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{applicantData.email}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{formatAddress()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ApplicantDetails 