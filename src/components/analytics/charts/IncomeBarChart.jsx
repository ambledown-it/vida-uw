import { useState, useEffect } from 'react';
import { Bar, Cell } from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { ModernBarChart } from '../ui/charts/ModernCharts';
import chartTheme from '../config/chartTheme';

const IncomeBarChart = () => {
  const { incomeData: { data, isLoading, error } } = useAnalytics();
  
  // Format data for Recharts
  const formatChartData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    // Define the order of income bins
    const incomeBinOrder = [
      'Under R10,000',
      'R10,000-R20,000',
      'R20,001-R30,000',
      'R30,001-R50,000',
      'R50,001-R100,000',
      'Over R100,000'
    ];
    
    // Create a map to hold the data
    const dataMap = {};
    incomeBinOrder.forEach((bin) => {
      dataMap[bin] = { 
        name: bin, 
        value: 0, 
        color: chartTheme.colors.primary // Use the same primary color for all bars
      };
    });
    
    // Fill in the actual data
    apiData.forEach(item => {
      if (item.income_bin && dataMap[item.income_bin]) {
        dataMap[item.income_bin].value = parseInt(item.total_count);
      }
    });
    
    // Convert back to array in the correct order
    return incomeBinOrder.map(bin => dataMap[bin]);
  };
  
  const chartData = formatChartData(data);
  
  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-gray-500">Loading income distribution data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-red-500">Error loading income distribution data</p>
        {error.message && <p className="text-sm text-red-400 mt-2">{error.message}</p>}
      </div>
    );
  }
  
  // Check if we have any data to display
  if (!chartData || chartData.length === 0 || chartData.every(item => item.value === 0)) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-gray-500">No income data available for the selected filters</p>
      </div>
    );
  }

  // Format numbers with commas
  const formatValue = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full h-80 mt-6">
      <h3 className="text-lg font-semibold mb-2 text-[#213547] text-center">Applications by Income Level</h3>
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
              fill={chartTheme.colors.primary}
            />
          ))}
        </Bar>
      </ModernBarChart>
    </div>
  );
};

export default IncomeBarChart; 