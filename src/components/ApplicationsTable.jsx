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
      <div className="flex justify-center items-center h-full rounded-lg shadow-sm">
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
    <div className="h-full flex flex-col">
      <FilterCard 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        termFilter={termFilter}
        onTermFilterChange={setTermFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Table Card */}
      <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col min-h-0">
        {/* Fixed Header */}
        <div className="bg-[#001122] rounded-t-lg">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[15%]" />
              <col className="w-[20%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[10%]" />
              <col className="w-[15%]" />
              <col className="w-[10%]" />
            </colgroup>
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-white first:rounded-tl-lg">
                  Application ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-white">
                  Applicant Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-white">
                  ID Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-white">
                  Date Created
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-white">
                  Term
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-white">
                  Sum Assured
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-white last:rounded-tr-lg">
                  Sales Channel
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-auto min-h-0 rounded-b-lg">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[15%]" />
              <col className="w-[20%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[10%]" />
              <col className="w-[15%]" />
              <col className="w-[10%]" />
            </colgroup>
            <tbody>
              {filteredApplications.map((app, index) => (
                <tr 
                  key={`${app.appid}-${index}`}
                  className={`
                    hover-effect
                    ${index === filteredApplications.length - 1 ? 'last:border-b-0' : ''}
                  `}
                >
                  <td className="px-6 py-4">{app.appid}</td>
                  <td className="px-6 py-4">{`${app.firstnames} ${app.surname}`}</td>
                  <td className="px-6 py-4">{app.idnumber}</td>
                  <td className="px-6 py-4">{new Date(app.datecreated).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{app.term/12} years</td>
                  <td className="px-6 py-4">R {parseFloat(app.sumassured).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <CommissionBadge value={app.commissionstructure} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ApplicationsTable 