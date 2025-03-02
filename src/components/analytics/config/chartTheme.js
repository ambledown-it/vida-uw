const chartTheme = {
    colors: {
      primary: '#93B244', // Using your green color as primary
      secondary: '#213547',
      tertiary: '#213547',
      negative: '#EF4444',
      background: '#FFFFFF',
      grid: 'transparent',
      text: '#213547' // Using your text color
    },
    spacing: {
      margin: { top: 5, right: 30, left: 20, bottom: 5 }, // Using your existing margins
      barSize: 40,
      barGap: 4
    },
    border: {
      radius: [8, 8, 8, 8] // Increased and applied to all corners
    },
    animation: {
      duration: 1000
    },
    grid: {
      stroke: 'transparent',
      strokeDasharray: '3 3',
      vertical: true
    },
    axis: {
      axisLine: false,
      tickLine: false,
      fontSize: 12
    },
    // Add specific line chart settings
    line: {
      strokeWidth: 3,
      activeDot: false,
      dot: false
    }
  };
  
  export default chartTheme;