import { Line, XAxis } from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { ModernLineChart } from '../ui/charts/ModernCharts';
import { ResponsiveContainer } from 'recharts';

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
        name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
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
      <h3 className="text-lg font-semibold mb-2 text-[#213547] text-center">Application Trend Over Time</h3>
      <ResponsiveContainer width="100%" height="90%">
        <ModernLineChart
          data={chartData}
          title=""
          tooltipFormatter={(value) => [`${value} Applications`, 'Count']}
        >
          <XAxis 
            dataKey="name" 
            axisLine={true} 
            tickLine={false} 
            tick={{ fill: '#213547', fontSize: 12 }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            name="Applications" 
            stroke="#93B244"
          />
        </ModernLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ApplicationTrendChart; 