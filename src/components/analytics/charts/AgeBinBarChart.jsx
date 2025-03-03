import { useState, useEffect } from 'react';
import { Bar, Cell } from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { ModernBarChart } from '../ui/charts/ModernCharts';
import chartTheme from '../config/chartTheme';

const AgeBinBarChart = () => {
  const { ageBinData: { data, isLoading, error } } = useAnalytics();
  
  // Format data for Recharts
  const formatChartData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    // Define the order of age bins (10-year intervals)
    const ageBinOrder = [
      'Under 20',
      '20-29',
      '30-39',
      '40-49',
      '50-59',
      '60-69',
      '70+'
    ];
    
    // Create a map to hold the data
    const dataMap = {};
    ageBinOrder.forEach(bin => {
      dataMap[bin] = { name: bin, value: 0, color: chartTheme.colors.primary };
    });
    
    // Fill in the actual data
    apiData.forEach(item => {
      if (item.age_bin && dataMap[item.age_bin]) {
        dataMap[item.age_bin].value = parseInt(item.total_count);
      }
    });
    
    // Convert back to array in the correct order
    return ageBinOrder.map(bin => dataMap[bin]);
  };
  
  const chartData = formatChartData(data);
  
  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-gray-500">Loading age distribution data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-red-500">Error loading age distribution data</p>
      </div>
    );
  }

  // Format numbers with commas
  const formatValue = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full h-80 mt-6">
        <h3 className="text-lg font-semibold mb-2 text-[#213547] text-center">Applications by Age group</h3>
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

export default AgeBinBarChart; 