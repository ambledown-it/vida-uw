const chartTheme = {
    colors: {
      primary: '#93B244', // Using your green color as primary
      secondary: '#F59E0B',
      tertiary: '#9CA3AF',
      negative: '#EF4444',
      background: '#FFFFFF',
      grid: '#f0f0f0',
      text: '#213547' // Using your text color
    },
    spacing: {
      margin: { top: 5, right: 30, left: 20, bottom: 5 }, // Using your existing margins
      barSize: 40,
      barGap: 4
    },
    border: {
      radius: [4, 4, 0, 0] // Using your existing radius
    },
    animation: {
      duration: 1000
    },
    grid: {
      stroke: '#f0f0f0',
      strokeDasharray: '3 3',
      vertical: true
    },
    axis: {
      axisLine: false,
      tickLine: false,
      fontSize: 12
    }
  };
  
  export default chartTheme;