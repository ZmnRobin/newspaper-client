// userContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/types/types';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  createdArticle: boolean;
  setCreatedArticle: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [createdArticle, setCreatedArticle] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      setUser(JSON.parse(userFromCookie));
    }
  }, []);

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    Cookies.remove('token');
    router.push('/');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, createdArticle, setCreatedArticle }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
