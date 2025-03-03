import ProvinceBarChart from './ProvinceBarChart';
import GenderPieChart from './GenderPieChart';
import AgeBinBarChart from './AgeBinBarChart';

const DemographicStatsCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4 text-[#213547]">Demographic Statistics</h2>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Province and Age Charts */}
        <div className="flex flex-col gap-6">
          {/* Province Bar Chart */}
          <div>
            <ProvinceBarChart />
          </div>
          
          {/* Age Bin Bar Chart */}
          <div>
            <AgeBinBarChart />
          </div>
        </div>
        
        {/* Right Column - Gender Chart */}
        <div>
          <GenderPieChart />
        </div>
      </div>
      
      {/* Placeholder for future charts */}
      <div className="text-gray-400 text-sm italic mt-4">
        More demographic charts coming soon...
      </div>
    </div>
  );
};

export default DemographicStatsCard; 