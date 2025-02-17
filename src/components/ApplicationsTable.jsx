import { useApplications } from '../contexts/ApplicationsContext'

const CommissionBadge = ({ value }) => {
  let badgeContent = ''
  let badgeColor = ''

  switch (value) {
    case '2':
      badgeContent = 'Call Center'
      badgeColor = 'bg-blue-100 text-blue-800'
      break
    default:
      badgeContent = 'Broker'
      badgeColor = 'bg-[#edf2e6] text-[#93b244]'
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeColor}`}>
      {badgeContent}
    </span>
  )
}

const ApplicationsTable = () => {
  const { applications, loading, error } = useApplications()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-gray-500">Loading applications...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#213547]">
            <tr>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white first:rounded-tl-lg w-[15%] bg-[#213547]">
                Application ID
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[20%] bg-[#213547]">
                Applicant Name
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[15%] bg-[#213547]">
                ID Number
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[15%] bg-[#213547]">
                Date Created
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[10%] bg-[#213547]">
                Term
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[15%] bg-[#213547]">
                Sum Assured
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white last:rounded-tr-lg w-[10%] bg-[#213547]">
                Sales Channel
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr 
                key={app.appid} 
                className={`
                  hover-effect
                  ${index === applications.length - 1 ? 'last:border-b-0 last:rounded-b-lg' : ''}
                `}
              >
                <td className="w-[15%]">{app.appid}</td>
                <td className="w-[20%]">{`${app.firstnames} ${app.surname}`}</td>
                <td className="w-[15%]">{app.idnumber}</td>
                <td className="w-[15%]">{new Date(app.datecreated).toLocaleDateString()}</td>
                <td className="w-[10%]">{app.term} years</td>
                <td className="w-[15%]">R {parseFloat(app.sumassured).toLocaleString()}</td>
                <td className="w-[10%]">
                  <CommissionBadge value={app.commissionstructure} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApplicationsTable 