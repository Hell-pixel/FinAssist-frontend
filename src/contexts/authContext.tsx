import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { accountService } from '@/services/accountService';
import { CurrentUser } from '@/types/account';

interface AuthContextProps {
  user: CurrentUser | null;
  userDataIsLoading: boolean;
  requiredAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [userDataIsLoading, setUserDataIsLoading] = useState<boolean>(false);
  const [requiredAuth, setRequiredAuth] = useState<boolean>(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await accountService.getCurrentUser();
        setUser(userData);
      } catch {
        setUser(null);
        setRequiredAuth(true);
      } finally {
        setUserDataIsLoading(false);
      }
    };
    setUserDataIsLoading(true);
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    const userData = await accountService.login(email, password);
    setUser(userData);
  };

  const logout = async () => {
    await accountService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userDataIsLoading, requiredAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
