import { BarChart, LineChart, PieChart, AreaChart } from 'recharts';
import { withChartStyles } from './withChartStyles';

export const ModernBarChart = withChartStyles(BarChart);
export const ModernLineChart = withChartStyles(LineChart);
export const ModernPieChart = withChartStyles(PieChart);
export const ModernAreaChart = withChartStyles(AreaChart);