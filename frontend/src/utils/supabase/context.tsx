import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User object ka structure kaisa hoga
interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Page load hone par check karein ki kya user pehle se logged in hai
    try {
      const storedUser = localStorage.getItem('agri-wealth-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('agri-wealth-user');
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    setUser: (user: User | null) => {
      setUser(user);
      if (user) {
        localStorage.setItem('agri-wealth-user', JSON.stringify(user));
      } else {
        localStorage.removeItem('agri-wealth-user');
      }
    },
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}