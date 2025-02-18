const TabsCard = ({ activeTab, onTabChange, tabCounts }) => {
  const tabs = [
    { id: '5', label: 'All' },
    { id: '1', label: 'Open' },
    { id: '2', label: 'Referred' },
    { id: '3', label: 'Closed' }
  ]

  // Calculate total count for "All" tab
  const totalCount = Object.values(tabCounts || {}).reduce((sum, count) => sum + count, 0)

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
          style={{ backgroundColor: activeTab === tab.id ? '#213547' : '#7e96ac' }}
        >
          {tab.label}
          <span className={`
            ml-2 px-2 py-0.5 text-xs rounded-full
            ${activeTab === tab.id 
              ? 'bg-white/20' 
              : 'bg-[#213547]/10'
            }
          `}>
            {tab.id === '5' ? totalCount : tabCounts?.[tab.id] || 0}
          </span>
        </button>
      ))}
    </div>
  )
}

export default TabsCard 