import { Line, Legend } from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { ModernLineChart } from '../ui/charts/ModernCharts';

const ApplicationTrendChart = () => {
  const { applicationTrend: { data, isLoading, error } } = useAnalytics();
  
  // Format data for Recharts
  const formatTrendData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    // Parse the date_count string pattern: "'yyyy-mm-dd' : count"
    const formattedData = apiData.map(item => {
      const match = item.date_count.match(/'(\d{4}-\d{2}-\d{2})'\s*:\s*(\d+)/);
      if (!match) return null;
      
      const [_, dateStr, count] = match;
      
      return {
        date: dateStr,
        count: parseInt(count)
      };
    }).filter(Boolean);
    
    // Sort by date
    return formattedData
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: item.count
      }));
  };
  
  const chartData = formatTrendData(data);
  
  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-gray-500">Loading trend data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-red-500">Error loading trend data</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ModernLineChart
        data={chartData}
        title="Application Trend Over Time"
        tooltipFormatter={(value) => [`${value} Applications`, 'Count']}
        height="90%"
      >
        <Line 
          type="monotone" 
          dataKey="count" 
          name="Applications" 
          stroke="#213547" 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </ModernLineChart>
    </div>
  );
}

export default ApplicationTrendChart; 