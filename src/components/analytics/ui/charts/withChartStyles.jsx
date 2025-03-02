import React from 'react';
import { Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, Bar } from 'recharts';
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
      
      // Check if this is a LineChart and modify/add Line components
      const isLineChart = ChartComponent.displayName === 'LineChart' || 
                         ChartComponent.name === 'LineChart';
      
      // Check if this is a BarChart and add radius to Bar components
      const isBarChart = ChartComponent.displayName === 'BarChart' || 
                        ChartComponent.name === 'BarChart';
      
      // Process children to add our styling
      chartChildren = chartChildren.map(child => {
        // Apply line chart styling
        if (isLineChart && child.type === Line) {
          return React.cloneElement(child, {
            strokeWidth: chartTheme.line.strokeWidth,
            stroke: child.props.stroke || chartTheme.colors.primary,
            dot: chartTheme.line.dot,
            activeDot: chartTheme.line.activeDot,
            ...child.props
          });
        }
        
        // Apply bar chart styling with rounded corners on all sides
        if (isBarChart && child.type === Bar) {
          return React.cloneElement(child, {
            radius: chartTheme.border.radius,
            ...child.props
          });
        }
        
        return child;
      });
      
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
      
      // If this is a LineChart and no Line components are provided, add a default one
      if (isLineChart && !chartChildren.some(child => child.type === Line)) {
        chartChildren.push(
          <Line 
            key="defaultLine"
            type="monotone" 
            dataKey="value" 
            stroke={chartTheme.colors.primary}
            strokeWidth={chartTheme.line.strokeWidth}
            dot={chartTheme.line.dot}
            activeDot={chartTheme.line.activeDot}
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