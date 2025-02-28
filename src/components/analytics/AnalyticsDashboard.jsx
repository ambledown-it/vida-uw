import { useState } from 'react';
import AnalyticsTabs from './AnalyticsTabs';
import AnalyticsFilters from './AnalyticsFilters';
import ApplicationsBoard from './boards/ApplicationsBoard';
import ClaimsBoard from './boards/ClaimsBoard';
import UnderwritingBoard from './boards/UnderwritingBoard';
import WebAppBoard from './boards/WebAppBoard';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');

  // Render the active board based on selected tab
  const renderActiveBoard = () => {
    switch (activeTab) {
      case 'applications':
        return <ApplicationsBoard />;
      case 'claims':
        return <ClaimsBoard />;
      case 'underwriting':
        return <UnderwritingBoard />;
      case 'webapp':
        return <WebAppBoard />;
      default:
        return <ApplicationsBoard />;
    }
  };

  return (
    <div className="h-full w-full bg-transparent rounded-lg shadow-sm overflow-auto">
      <div className="p-4">
        
        {/* Analytics Tabs */}
        <AnalyticsTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        {/* Analytics Filters */}
        <AnalyticsFilters />
        
        {/* Render the active board */}
        {renderActiveBoard()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 