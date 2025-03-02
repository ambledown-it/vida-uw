import { Bar, Legend } from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { ModernBarChart } from '../ui/charts/ModernCharts';

const ApplicationStatusChart = () => {
  const { applicationStatus: { data, isLoading, error } } = useAnalytics();
  
  // Format data for Recharts (your existing function)
  const formatChartData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    // Map statuses to friendly names and colors
    const statusMap = {
      '1': { name: 'Open', color: '#9CA3AF' },
      '2': { name: 'Referred', color: '#F59E0B' },
      '3': { name: 'Accepted', color: '#93B244' },
      '4': { name: 'Rejected', color: '#EF4444' }
    };
    
    return apiData.map(item => {
      // Parse the status_count string pattern: "'statusId' : count"
      const match = item.status_count.match(/'(\d+)'\s*:\s*(\d+)/);
      if (!match) return null;
      
      const [_, statusId, count] = match;
      
      return {
        name: statusMap[statusId]?.name || `Status ${statusId}`,
        count: parseInt(count),
        color: statusMap[statusId]?.color || '#9CA3AF'
      };
    }).filter(Boolean);
  };
  
  const chartData = formatChartData(data);
  
  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-gray-500">Loading chart data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-red-500">Error loading chart data</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ModernBarChart
        data={chartData}
        title="Application Status Distribution"
        tooltipFormatter={(value) => [`${value} Applications`, 'Count']}
        height="90%"
      >
        <Bar 
          dataKey="count" 
          name="Applications" 
          fill="#93B244"
        />
      </ModernBarChart>
    </div>
  );
}

export default ApplicationStatusChart;