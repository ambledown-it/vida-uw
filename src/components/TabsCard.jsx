const TabsCard = ({ activeTab, onTabChange, tabCounts }) => {
  const tabs = [
    { id: '5', label: 'All' },
    { id: '1', label: 'Open' },
    { id: '2', label: 'Referred' },
    { id: '3', label: 'Closed' }  // This will show both status 3 and 4
  ]

  // Calculate total count for "All" tab
  const totalCount = Object.values(tabCounts || {}).reduce((sum, count) => sum + count, 0)

  // Calculate combined count for Closed tab (status 3 and 4)
  const getTabCount = (tabId) => {
    if (tabId === '3') {
      return (tabCounts?.['3'] || 0) + (tabCounts?.['4'] || 0)
    }
    return tabCounts?.[tabId] || 0
  }

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            tab-button
            px-6 py-2 text-sm font-medium rounded-t-lg 
            border-0 outline-none focus:outline-none
            transition-colors duration-200
            ${activeTab === tab.id 
              ? 'bg-[#213547] text-white' 
              : 'bg-red text-[#213547] hover:bg-[#213547]/10'
            }
          `}
          style={{ backgroundColor: activeTab === tab.id ? '#213547' : '#52718d' }}
        >
          {tab.label}
          <span className={`
            ml-2 px-2 py-0.5 text-xs rounded-full
            ${activeTab === tab.id 
              ? 'bg-white/20' 
              : 'bg-[#213547]/10'
            }
          `}>
            {tab.id === '5' ? totalCount : getTabCount(tab.id)}
          </span>
        </button>
      ))}
    </div>
  )
}

export default TabsCard 