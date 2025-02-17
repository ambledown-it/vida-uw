import { useApplications } from '../contexts/ApplicationsContext'
import { useState, useMemo } from 'react'
import FilterCard from './FilterCard'

const CommissionBadge = ({ value }) => {
  let badgeContent = ''
  let badgeColor = ''

  switch (value) {
    case '2':
      badgeContent = 'Call Center'
      badgeColor = 'bg-blue-100 text-blue-800'
      break
    default:
      badgeContent = 'Brokerage'
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
  const [searchTerm, setSearchTerm] = useState('')
  const [termFilter, setTermFilter] = useState(0) // 0 means no filter
  const [dateRange, setDateRange] = useState({ from: '', to: '' })

  console.log('Search Term:', searchTerm)
  console.log('All Applications:', applications)

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      // Search term filter
      if (searchTerm) {
        const searchValue = searchTerm.toLowerCase().trim()
        const fullName = `${app.firstnames} ${app.surname}`.toLowerCase()
        const idNumber = app.idnumber.toLowerCase()
        
        if (!fullName.includes(searchValue) && !idNumber.includes(searchValue)) {
          return false
        }
      }

      // Term filter
      if (termFilter > 0) {
        const appTermYears = app.term / 12
        if (appTermYears !== termFilter) {
          return false
        }
      }

      // Date range filter
      if (dateRange.from || dateRange.to) {
        const appDate = new Date(app.datecreated)
        if (dateRange.from && appDate < new Date(dateRange.from)) {
          return false
        }
        if (dateRange.to && appDate > new Date(dateRange.to)) {
          return false
        }
      }

      return true
    })
  }, [applications, searchTerm, termFilter, dateRange])

  console.log('Filtered Applications:', filteredApplications)

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
      <FilterCard 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        termFilter={termFilter}
        onTermFilterChange={setTermFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#213547]">
            <tr>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white first:rounded-tl-lg w-[15%] bg-[#001122]">
                Application ID
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[20%] bg-[#001122]">
                Applicant Name
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[15%] bg-[#001122]">
                ID Number
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[15%] bg-[#001122]">
                Date Created
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[10%] bg-[#001122]">
                Term
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white w-[15%] bg-[#001122]">
                Sum Assured
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-sm font-bold text-white last:rounded-tr-lg w-[10%] bg-[#001122]">
                Sales Channel
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app, index) => (
              <tr 
                key={`${app.appid}-${index}`}
                className={`
                  hover-effect
                  ${index === filteredApplications.length - 1 ? 'last:border-b-0 last:rounded-b-lg' : ''}
                `}
              >
                <td className="w-[15%]">{app.appid}</td>
                <td className="w-[20%]">{`${app.firstnames} ${app.surname}`}</td>
                <td className="w-[15%]">{app.idnumber}</td>
                <td className="w-[15%]">{new Date(app.datecreated).toLocaleDateString()}</td>
                <td className="w-[10%]">{app.term/12} years</td>
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