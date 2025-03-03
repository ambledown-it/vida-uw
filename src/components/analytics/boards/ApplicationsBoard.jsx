import ApplicationStatusChart from '../charts/ApplicationStatusChart';
import ApplicationTrendChart from '../charts/ApplicationTrendChart';
import ApplicationSummaryCards from '../charts/ApplicationSummaryCards';
import ManualUWStatusChart from '../charts/ManualUWStatusChart';
import MagnumDecisionChart from '../charts/MagnumDecisionChart';

const ApplicationsBoard = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Application Summary Cards */}
      <div className="bg-transparent p-0">
        <ApplicationSummaryCards />
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Status and Manual UW Charts Card */}
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ApplicationStatusChart />
            <ManualUWStatusChart />
            <MagnumDecisionChart />
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
          <ApplicationTrendChart />
        </div>
      </div>
    </div>
  );
};

export default ApplicationsBoard; 