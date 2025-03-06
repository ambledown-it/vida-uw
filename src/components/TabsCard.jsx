const TabsCard = ({ activeTab, onTabChange, tabCounts }) => {
  const tabs = [
    { id: '5', label: 'All' },
    { id: '1', label: 'Open' },
    { id: '2', label: 'Referred' },
    { id: '3', label: 'Closed' }  // This will show statuses 4, 5, and 6
  ]

  // Calculate total count for "All" tab
  const totalCount = Object.values(tabCounts || {}).reduce((sum, count) => sum + count, 0)

  // Calculate combined counts for tabs
  const getTabCount = (tabId) => {
    if (tabId === '1') {
      // Open tab shows statuses 1, 2, and 3
      return (tabCounts?.['1'] || 0) + (tabCounts?.['2'] || 0) + (tabCounts?.['3'] || 0)
    } else if (tabId === '3') {
      // Closed tab shows statuses 4, 5, and 6
      return (tabCounts?.['4'] || 0) + (tabCounts?.['5'] || 0) + (tabCounts?.['6'] || 0)
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