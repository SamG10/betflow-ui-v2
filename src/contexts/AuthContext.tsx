import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUserInfo } from '../services/users.service';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  refreshUser: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        const userProfile = await getUserInfo();
        setUser(userProfile);
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('access_token', token);
    const userProfile = await getUserInfo();
    console.log('userProfile', userProfile);

    setUser(userProfile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = async () => {
    const userProfile = await getUserInfo();
    setUser(userProfile);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
