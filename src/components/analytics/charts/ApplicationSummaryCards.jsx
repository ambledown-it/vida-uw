import { useAnalytics } from '../../../hooks/useAnalytics';
import { ClipboardList, CalendarDays, BarChart2, Database, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import chartTheme from '../config/chartTheme';

const ApplicationSummaryCards = () => {
  const { applicationSummary: { data, isLoading, error } } = useAnalytics();
  
  // Calculate percentage change
  const calculateChange = (current, previous) => {
    // Ensure values are numbers and not null/undefined
    const currentValue = Number(current) || 0;
    const previousValue = Number(previous) || 0;
    
    // Special case when previous is 0 but current is not
    if (previousValue === 0 && currentValue > 0) {
      return {
        value: 100, // 100% increase (new value from nothing)
        isIncrease: true,
        isNoChange: false
      };
    }
    
    // Handle edge cases that could result in NaN
    if (previousValue === 0) {
      return { value: 0, isIncrease: false, isNoChange: true };
    }
    
    const change = ((currentValue - previousValue) / previousValue) * 100;
    
    // Check if the result is NaN or infinite
    if (isNaN(change) || !isFinite(change)) {
      return { value: 0, isIncrease: false, isNoChange: true };
    }
    
    return {
      value: Math.abs(Math.round(change)),
      isIncrease: change > 0,
      isNoChange: change === 0
    };
  };
  
  // Format the cards with trend data
  const getCardsWithTrends = () => {
    if (!data) return [];
    
    // Ensure all values are defined, defaulting to 0 if not
    const safeData = {
      today_count: data.today_count || 0,
      yesterday_count: data.yesterday_count || 0,
      week_count: data.week_count || 0,
      previous_week_count: data.previous_week_count || 0,
      last_30_days_count: data.last_30_days_count || 0,
      previous_30_days_count: data.previous_30_days_count || 0,
      total_count: data.total_count || 0
    };
    
    const todayChange = calculateChange(safeData.today_count, safeData.yesterday_count);
    const weekChange = calculateChange(safeData.week_count, safeData.previous_week_count);
    const monthChange = calculateChange(safeData.last_30_days_count, safeData.previous_30_days_count);
    
    // Get colors from the chart theme
    const primaryColor = chartTheme.colors.primary; // Green
    const secondaryColor = chartTheme.colors.secondary; // Dark blue/gray
    
    return [
      {
        title: 'Today',
        value: safeData.today_count,
        change: todayChange,
        previousLabel: 'vs yesterday',
        icon: <ClipboardList className="w-5 h-5 text-white" />,
        bgColor: primaryColor
      },
      {
        title: 'Last 7 Days',
        value: safeData.week_count,
        change: weekChange,
        previousLabel: 'vs previous 7 days',
        icon: <CalendarDays className="w-5 h-5 text-white" />,
        bgColor: secondaryColor
      },
      {
        title: 'Last 30 Days',
        value: safeData.last_30_days_count,
        change: monthChange,
        previousLabel: 'vs previous 30 days',
        icon: <BarChart2 className="w-5 h-5 text-white" />,
        bgColor: primaryColor
      },
      {
        title: 'Lifetime Applications',
        value: safeData.total_count,
        icon: <Database className="w-5 h-5 text-white" />,
        bgColor: secondaryColor
      }
    ];
  };

  const renderTrendIcon = (change) => {
    if (!change) return null;
    if (change.isNoChange) return <Minus className="w-4 h-4" />;
    return change.isIncrease 
      ? <TrendingUp className="w-4 h-4 text-[#93B244]" /> 
      : <TrendingDown className="w-4 h-4 text-[#EF4444]" />;
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <p className="text-gray-500">Loading summary data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <p className="text-red-500">Error loading summary data</p>
      </div>
    );
  }

  const cards = getCardsWithTrends();

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-700">{card.title}</h4>
              <p className="text-2xl font-bold mt-1 text-gray-900">
                {card.value.toLocaleString()}
              </p>
              
              {card.change && (
                <div className="flex items-center mt-1">
                  {renderTrendIcon(card.change)}
                  <span className={`text-xs ml-1 ${
                    card.change.isNoChange 
                      ? 'text-gray-500' 
                      : (card.change.isIncrease ? 'font-bold text-[#93B244]' : 'font-bold text-red-500')
                  }`}>
                    {card.change.isNoChange ? 'No change' : `${card.change.value}%`}
                    {' '}
                    <span className="text-gray-500">{card.previousLabel}</span>
                  </span>
                </div>
              )}
            </div>
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-full" 
              style={{ backgroundColor: card.bgColor }}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationSummaryCards; 