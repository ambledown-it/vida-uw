import ProvinceBarChart from './ProvinceBarChart';
import GenderPieChart from './GenderPieChart';
import AgeBinBarChart from './AgeBinBarChart';
import IncomeBarChart from './IncomeBarChart';

const DemographicStatsCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
      
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
        
        {/* Right Column - Gender and Income Charts */}
        <div className="flex flex-col gap-6">
          {/* Gender Pie Chart */}
          <div>
            <GenderPieChart />
          </div>
          
          {/* Income Bar Chart */}
          <div>
            <IncomeBarChart />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DemographicStatsCard; 