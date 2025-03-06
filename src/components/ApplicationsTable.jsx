import { useState, useMemo } from 'react'
import { useApplications } from '../hooks/useApplications'
import FilterCard from './FilterCard'
import TabsCard from './TabsCard'
import { 
  Loader, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  SquareArrowOutUpRight,
  PenLine
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
  const { data: applications, isLoading, error } = useApplications()
  const [searchTerm, setSearchTerm] = useState('')
  const [termFilter, setTermFilter] = useState(0)
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [activeTab, setActiveTab] = useState('5') // Default to All applications
  const [salesChannel, setSalesChannel] = useState('')
  const [sumAssuredFilter, setSumAssuredFilter] = useState(0)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [manualUwFilter, setManualUwFilter] = useState('')

  const tabCounts = useMemo(() => {
    return (applications || []).reduce((acc, app) => {
      acc[app.statusid] = (acc[app.statusid] || 0) + 1
      return acc
    }, {})
  }, [applications])

  const filteredApplications = useMemo(() => {
    return (applications || []).filter(app => {
      // Status tab filter - skip for "All" tab
      if (activeTab !== '5') {
        if (activeTab === '3') {
          // Show statuses 4, 5, and 6 in Closed tab
          if (app.statusid !== '4' && app.statusid !== '5' && app.statusid !== '6') {
            return false
          }
        } else if (activeTab === '1') {
          // Show statuses 1, 2, and 3 in Open tab
          if (app.statusid !== '1' && app.statusid !== '2' && app.statusid !== '3') {
            return false
          }
        } else if (app.statusid !== activeTab) {
          return false
        }
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

      // Manual Underwriting filter
      if (manualUwFilter) {
        const hasManualUw = app.manualuwid != null
        if (manualUwFilter === 'yes' && !hasManualUw) return false
        if (manualUwFilter === 'no' && hasManualUw) return false
      }

      return true
    })
  }, [applications, searchTerm, activeTab, salesChannel, manualUwFilter, dateRange, termFilter, sumAssuredFilter])

  console.log('Filtered Applications:', filteredApplications)

  const handleActionClick = (app) => {
    setSelectedApplication({
      id: app.appid,
      name: `${app.firstnames} ${app.surname}`,
      idNumber: app.idnumber
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading applications...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Failed to load applications</div>
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
        manualUwFilter={manualUwFilter}
        onManualUwFilterChange={setManualUwFilter}
      />

      <div className="flex-1 flex flex-col min-h-0">
        <TabsCard 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
        />
        <div className="flex-1 bg-white rounded-b-lg shadow-sm flex flex-col min-h-0">
          {/* Fixed Header */}
          <div className="bg-[#213547] rounded-lg">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[8%]" />
                <col className="w-[2%]" />
                <col className="w-[8%]" />
                <col className="w-[17%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
                <col className="w-[15%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white first:rounded-tr-lg">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white">
                    {/* Empty header for Manual UW icon */}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white">
                    ID
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white">
                    Applicant Name
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white">
                    ID Number
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white">
                    Term
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white">
                    Sum Assured
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-white last:rounded-tr-lg">
                    Sales Channel
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-auto min-h-0 rounded-b-lg py-4">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[8%]" />
                <col className="w-[2%]" />
                <col className="w-[8%]" />
                <col className="w-[17%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
                <col className="w-[15%]" />
              </colgroup>
              <tbody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app, index) => (
                    <tr 
                      key={`${app.appid}-${index}`}
                      onClick={() => handleActionClick(app)}
                      className={`
                        hover-effect
                        ${index === filteredApplications.length - 1 ? 'last:border-b-0' : ''}
                        cursor-pointer
                      `}
                    >
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <StatusBadge status={app.detailedstatus} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {app.manualuwid && (
                            <PenLine className="w-4 h-4 text-[#213547]" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className="text-sm text-gray-900">
                            {app.appid}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {`${app.firstnames} ${app.surname}`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {app.idnumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {new Date(app.datecreated).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {app.term/12} years
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          R {parseFloat(app.sumassured).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <CommissionBadge value={app.commissionstructure} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td 
                      colSpan="9" 
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-lg">No Applications Found</span>
                        <span className="text-sm">Please try adjusting your search criteria</span>
                      </div>
                    </td>
                  </tr>
                )}
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