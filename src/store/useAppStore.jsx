import { create } from 'zustand'

const useAppStore = create((set) => ({
  // Authentication state
  user: null,
  token: null,
  role: null,
  error: null,
  
  // Application navigation state
  activeMenuItem: 'applications',
  setActiveMenuItem: (menuItem) => set({ activeMenuItem: menuItem }),
  
  // Login functionality - simplified to just set the state
  login: (data) => {
    const { token, role, ...userData } = data;
    
    set({
      user: userData,
      token: token,
      role: role,
      error: null
    });
  },
  
  // Logout functionality
  logout: () => {
    set({
      user: null,
      token: null,
      role: null,
      error: null,
      activeMenuItem: 'applications' // Reset to applications on logout
    });
  },
  
  // Set error state
  setError: (message) => set({ error: message }),
  
  // Clear error state
  clearError: () => set({ error: null }),
}));

export default useAppStore; 