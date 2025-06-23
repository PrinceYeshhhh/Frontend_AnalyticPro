import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    name: string;
    username: string;
    email: string;
    password: string;
    businessType: string;
    customBusinessType?: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUserPlan: (plan: 'solo' | 'pro' | 'elite') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        username: email.split('@')[0],
        businessType: 'startup',
        plan: 'solo',
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: {
    name: string;
    username: string;
    email: string;
    password: string;
    businessType: string;
    customBusinessType?: string;
  }) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual registration
      const mockUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        username: userData.username,
        businessType: userData.businessType,
        customBusinessType: userData.customBusinessType,
        plan: 'solo',
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const updateUserPlan = (plan: 'solo' | 'pro' | 'elite') => {
    if (user) {
      const updatedUser = { ...user, plan };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, updateUserPlan }}>
      {children}
    </AuthContext.Provider>
  );
};