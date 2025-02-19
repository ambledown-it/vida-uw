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
            ${activeTab === tab.id ? 'active' : ''}
          `}
        >
          {tab.label}
          <span className="badge">
            {tab.id === '5' ? totalCount : getTabCount(tab.id)}
          </span>
        </button>
      ))}
    </div>
  )
}

export default TabsCard 