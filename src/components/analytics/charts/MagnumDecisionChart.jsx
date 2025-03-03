import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';

const MagnumDecisionChart = () => {
  const { magnumDecision: { data, isLoading, error } } = useAnalytics();
  
  // Format data for Recharts
  const formatChartData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    // Map decisions to friendly names and colors
    const decisionMap = {
      'ACCEPT': { name: 'Accept', color: '#93b244' },
      'REFER': { name: 'Refer', color: '#213547' },
      'REJECT': { name: 'Reject', color: '#B2445C' },
      'Pending': { name: 'Pending', color: '#9CA3AF' }
    };
    
    return apiData.map(item => {
      return {
        name: decisionMap[item.decision]?.name || item.decision.toUpperCase(),
        value: parseInt(item.total_count),
        color: decisionMap[item.decision]?.color || '#213547'
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
    return <span className="text-sm text-[#213547]" style={{ wordBreak: 'break-word', width: '100px' }}>{value}</span>;
  };

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-2 text-[#213547] text-center">Magnum Decision Distribution</h3>
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
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ right: 10, top: '50%', transform: 'translateY(-50%)', maxWidth: '120px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MagnumDecisionChart; 