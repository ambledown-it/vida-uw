import { useApplications } from '../contexts/ApplicationsContext'
import { useState, useMemo } from 'react'
import FilterCard from './FilterCard'
import TabsCard from './TabsCard'
import { 
  Loader, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  SquareArrowOutUpRight
} from 'lucide-react'
import ApplicationDrawer from './ApplicationDrawer'
import StatusBadge from './StatusBadge'

const StatusIcon = ({ status }) => {
  const iconClass = "w-5 h-5"
  
  switch (status?.toLowerCase()) {
    case 'active':
      return <Loader className={`${iconClass} text-[#213547]`} title="Active" />
    case 'referred':
      return <AlertCircle className={`${iconClass} text-amber-500`} title="Referred" />
    case 'accepted':
      return <CheckCircle2 className={`${iconClass} text-[#93b244]`} title="Accepted" />
    case 'rejected':
      return <XCircle className={`${iconClass} text-red-500`} title="Rejected" />
    default:
      return null
  }
}

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
    <div className="flex justify-center">
      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${badgeColor}`}>
        {badgeContent}
      </span>
    </div>
  )
}

const ApplicationsTable = () => {
  const { applications, loading, error } = useApplications()
  const [searchTerm, setSearchTerm] = useState('')
  const [termFilter, setTermFilter] = useState(0)
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [activeTab, setActiveTab] = useState('5') // Default to All applications
  const [salesChannel, setSalesChannel] = useState('')
  const [sumAssuredFilter, setSumAssuredFilter] = useState(0)
  const [selectedApplication, setSelectedApplication] = useState(null)

  const tabCounts = useMemo(() => {
    return applications.reduce((acc, app) => {
      acc[app.statusid] = (acc[app.statusid] || 0) + 1
      return acc
    }, {})
  }, [applications])

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      // Status tab filter - skip for "All" tab
      if (activeTab !== '5' && app.statusid !== activeTab) {
        return false
      }

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

      // Sales channel filter
      if (salesChannel && app.commissionstructure !== salesChannel) {
        return false
      }

      // Sum assured filter
      if (sumAssuredFilter > 0) {
        const sumAssured = parseFloat(app.sumassured)
        if (sumAssured < sumAssuredFilter) {
          return false
        }
      }

      return true
    })
  }, [applications, activeTab, searchTerm, termFilter, dateRange, salesChannel, sumAssuredFilter])

  console.log('Filtered Applications:', filteredApplications)

  const handleActionClick = (app) => {
    setSelectedApplication({
      id: app.appid,
      name: `${app.firstnames} ${app.surname}`,
      idNumber: app.idnumber
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full rounded-r-lg shadow-sm">
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
    <div className="h-full flex gap-4">
      <FilterCard 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        termFilter={termFilter}
        onTermFilterChange={setTermFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        salesChannel={salesChannel}
        onSalesChannelChange={setSalesChannel}
        sumAssuredFilter={sumAssuredFilter}
        onSumAssuredChange={setSumAssuredFilter}
      />

      <div className="flex-1 flex flex-col min-h-0">
        <TabsCard 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
        />
        <div className="flex-1 bg-white rounded-b-lg shadow-sm flex flex-col min-h-0">
          {/* Fixed Header */}
          <div className="bg-[#213547] rounded-tr-lg">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[8%]" />
                <col className="w-[17%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[10%]" />
                <col className="w-[15%]" />
                <col className="w-[10%]" />
                <col className="w-[5%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white first:rounded-tl-lg">
                    {/* Empty header for status icons */}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white">
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
                  <th className="px-6 py-3 text-left text-sm font-bold text-white last:rounded-tr-lg">
                    {/* Empty header for action buttons */}
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-auto min-h-0 rounded-b-lg">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[8%]" />
                <col className="w-[17%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
                <col className="w-[15%]" />
                <col className="w-[5%]" />
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
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <StatusBadge status={app.detailedstatus} />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-center w-[80px]">{app.appid}</td>
                    <td className="px-6 py-4">{`${app.firstnames} ${app.surname}`}</td>
                    <td className="px-6 py-4">{app.idnumber}</td>
                    <td className="px-6 py-4">{new Date(app.datecreated).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{app.term/12} years</td>
                    <td className="px-6 py-4">R {parseFloat(app.sumassured).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <CommissionBadge value={app.commissionstructure} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button 
                          className="table-action-button"
                          onClick={() => handleActionClick(app)}
                        >
                          <SquareArrowOutUpRight className="w-5 h-5 text-[#213547]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ApplicationDrawer 
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
        applicationId={selectedApplication?.id}
        applicantName={selectedApplication?.name}
        idNumber={selectedApplication?.idNumber}
      />
    </div>
  )
}

export default ApplicationsTable 