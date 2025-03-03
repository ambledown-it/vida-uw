const AnalyticsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'applications', label: 'Applications' },
    { id: 'claims', label: 'Claims' },
    { id: 'underwriting', label: 'Underwriting' },
    { id: 'webapp', label: 'Web App' }
  ];

  return (
    <div className="flex mb-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            tab-button relative px-4 py-2 text-sm font-medium
            ${activeTab === tab.id ? 'active' : ''}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AnalyticsTabs; 