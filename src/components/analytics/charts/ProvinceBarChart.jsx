import { useState, useEffect } from 'react';
import { Bar, Cell } from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { ModernBarChart } from '../ui/charts/ModernCharts';
import chartTheme from '../config/chartTheme';

const ProvinceBarChart = () => {
  const { provinceData: { data, isLoading, error } } = useAnalytics();
  
  // Format data for Recharts
  const formatChartData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    // Sort by count descending
    return [...apiData]
      .sort((a, b) => b.total_count - a.total_count)
      .map(item => ({
        name: item.province || 'Unknown',
        value: parseInt(item.total_count),
        color: chartTheme.colors.primary
      }));
  };
  
  const chartData = formatChartData(data);
  
  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-gray-500">Loading province data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-red-500">Error loading province data</p>
      </div>
    );
  }

  // Format numbers with commas
  const formatValue = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full h-80">
            <h3 className="text-lg font-semibold mb-2 text-[#213547] text-center">Applications by Province</h3>
      <ModernBarChart 
        data={chartData}
        title=""
        height={300}
        tooltipFormatter={(value, name) => [formatValue(value), 'Applications']}
      >
        <Bar 
          dataKey="value" 
          fill={chartTheme.colors.primary}
          barSize={chartTheme.spacing.barSize}
          radius={chartTheme.border.radius}
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
            />
          ))}
        </Bar>
      </ModernBarChart>
    </div>
  );
};

export default ProvinceBarChart; 