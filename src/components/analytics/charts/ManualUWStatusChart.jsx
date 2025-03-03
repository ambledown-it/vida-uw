import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';

const ManualUWStatusChart = () => {
  const { applicationStatus: { data, isLoading, error } } = useAnalytics();
  
  // Format data for Recharts
  const formatChartData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    // Calculate totals across all statuses
    const totals = apiData.reduce((acc, item) => {
      acc.withManualUW += parseInt(item.with_manualuwid);
      acc.withoutManualUW += parseInt(item.without_manualuwid);
      return acc;
    }, { withManualUW: 0, withoutManualUW: 0 });
    
    return [
      {
        name: 'Manually Underwritten',
        value: totals.withManualUW,
        color: '#213547'
      },
      {
        name: 'Not Manually Underwritten',
        value: totals.withoutManualUW,
        color: '#93b244'
      }
    ];
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

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-[#213547]">{data.name}</p>
          <p className="text-gray-600">{data.value} Applications</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend renderer
  const renderColorfulLegendText = (value, entry) => {
    return <span className="text-sm text-[#213547]">{value}</span>;
  };

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-2 text-[#213547] text-center">Manual Underwriting Distribution</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            formatter={renderColorfulLegendText}
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ManualUWStatusChart; 