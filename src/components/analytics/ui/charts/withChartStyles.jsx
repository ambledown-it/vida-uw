import React from 'react';
import { Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import chartTheme from '../../config/chartTheme';

// Custom tooltip with the modern design
const ModernTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    // Use custom formatter if provided or default
    const formatValue = formatter || ((val, name) => [val, name]);
    const [formattedValue, formattedName] = formatValue(payload[0].value, payload[0].name);
    
    return (
      <div className="bg-white p-3 shadow-sm rounded-md border border-gray-100">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm font-bold" style={{ color: payload[0].color || chartTheme.colors.primary }}>
          {formattedName || 'Value'}: {formattedValue}
        </p>
      </div>
    );
  }
  return null;
};



export const withChartStyles = (ChartComponent) => {
    return ({ 
      data, 
      children,
      height = '100%',
      width = '100%',
      tooltipFormatter,
      showTitle = true,
      title = 'Chart',
      showTooltip = true,
      showGrid = true,
      showXAxis = true, 
      showYAxis = true,
      margin = chartTheme.spacing.margin,
      ...restProps 
    }) => {
      // Filter out our custom props
      const chartProps = {
        ...restProps,
        data,
        margin: margin || chartTheme.spacing.margin,
      };
      
      // Create default elements with our styling if not provided
      let chartChildren = React.Children.toArray(children);
      
      // Add grid with our styling if not explicitly provided
      if (showGrid && !chartChildren.some(child => child.type === CartesianGrid)) {
        chartChildren.push(
          <CartesianGrid 
            key="grid"
            strokeDasharray={chartTheme.grid.strokeDasharray} 
            vertical={chartTheme.grid.vertical} 
            stroke={chartTheme.grid.stroke} 
          />
        );
      }
      
      // Add X axis with our styling if not explicitly provided
      if (showXAxis && !chartChildren.some(child => child.type === XAxis)) {
        chartChildren.push(
          <XAxis 
            key="xAxis"
            dataKey="name" 
            axisLine={chartTheme.axis.axisLine} 
            tickLine={chartTheme.axis.tickLine} 
            tick={{ fill: chartTheme.colors.text, fontSize: chartTheme.axis.fontSize }}
          />
        );
      }
      
      // Add Y axis with our styling if not explicitly provided
      if (showYAxis && !chartChildren.some(child => child.type === YAxis)) {
        chartChildren.push(
          <YAxis 
            key="yAxis"
            axisLine={chartTheme.axis.axisLine} 
            tickLine={chartTheme.axis.tickLine} 
            tick={{ fill: chartTheme.colors.text, fontSize: chartTheme.axis.fontSize }}
          />
        );
      }
      
      // Add tooltip with our styling if not explicitly provided
      if (showTooltip && !chartChildren.some(child => child.type === Tooltip)) {
        chartChildren.push(
          <Tooltip 
            key="tooltip"
            content={<ModernTooltip formatter={tooltipFormatter} />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
          />
        );
      }
      
      return (
        <div className="w-full h-full">
          {showTitle && <h3 className="text-lg font-semibold mb-2 text-[#213547]">{title}</h3>}
          <ResponsiveContainer width={width} height={height}>
            <ChartComponent {...chartProps}>
              {chartChildren}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      );
    };
  };