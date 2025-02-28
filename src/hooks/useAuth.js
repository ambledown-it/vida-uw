import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useAppStore from '../store/useAppStore';

export function useAuth() {
  const queryClient = useQueryClient();
  
  // Get store actions and state
  const user = useAppStore(state => state.user);
  const token = useAppStore(state => state.token);
  const role = useAppStore(state => state.role);
  const error = useAppStore(state => state.error);
  const setAuth = useAppStore(state => state.login);
  const clearAuth = useAppStore(state => state.logout);
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post(
        'https://vida-underwriting-backend-app-eegyc2bnbtehbddm.southafricanorth-01.azurewebsites.net/api/login',
        credentials
      );
      
      return response.data;
    },
    onSuccess: (data) => {
      const { token, role, ...userData } = data;
      
      // Update Zustand store
      setAuth(data);
      
      // Invalidate any queries that might depend on auth status
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  // Logout function
  const logout = () => {
    clearAuth();
    queryClient.clear(); // Clear all queries from cache
  };

  // Return everything needed for authentication
  return {
    user,
    token,
    role,
    isAuthenticated: !!token,
    error,
    login: (credentials) => loginMutation.mutateAsync(credentials),
    logout,
    isLoggingIn: loginMutation.isPending
  };
} 