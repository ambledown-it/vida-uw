import ApplicationStatusChart from '../charts/ApplicationStatusChart';
import ApplicationTrendChart from '../charts/ApplicationTrendChart';

const ApplicationsBoard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Application Status Chart Card */}
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
        <ApplicationStatusChart />
      </div>
      
      {/* Application Trend Chart Card */}
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
        <ApplicationTrendChart />
      </div>
    </div>
  );
};

export default ApplicationsBoard; 