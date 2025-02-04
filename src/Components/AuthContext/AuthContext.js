// src/Components/AuthContext/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Tạo Context cho việc xác thực
const AuthContext = createContext();

// Cung cấp AuthContext cho các component con
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );

  const login = (token,username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext trong các component khác
export const useAuth = () => {
  return useContext(AuthContext);
};
