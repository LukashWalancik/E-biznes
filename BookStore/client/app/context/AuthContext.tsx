// client/app/context/AuthContext.js
"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (token && name && email) {
      setIsAuthenticated(true);
      setUserName(name);
      setUserEmail(email);
    } else {
      setIsAuthenticated(false);
      setUserName(null);
      setUserEmail(null);
    }
  }, []);

  const login = (token: string, name: string, email: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
    setUserName(name);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserName(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}