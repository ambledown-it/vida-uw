import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        'https://vida-underwriting-backend-app-eegyc2bnbtehbddm.southafricanorth-01.azurewebsites.net/api/login',
        credentials
      );

      const { token, role, ...userData } = response.data;
      
      // Store data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('username', userData.username);
      localStorage.setItem('firstname', userData.firstname);

      setUser({ role, ...userData });
      setError(null);
      return { success: true };
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      return { success: false, error: 'Login failed. Please check your credentials.' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);