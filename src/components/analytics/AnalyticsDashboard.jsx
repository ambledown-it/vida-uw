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
    <div className="h-full w-full flex flex-col bg-transparent rounded-lg overflow-hidden">
      {/* Fixed Header Section */}
      <div className="flex-none">
        <div className="p-4">
          <AnalyticsTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>
        <div className="px-4 pb-4">
          <AnalyticsFilters />
        </div>
      </div>
      
      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        {renderActiveBoard()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 