import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that manages authentication state
 * Session-only authentication - no persistence between app sessions
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  /**
   * Login user - session only
   */
  const login = (userData: { user: User; token: string }) => {
    setAuthState({
      user: userData.user,
      token: userData.token,
      isAuthenticated: true,
    });
  };

  /**
   * Logout user - clear session data
   */
  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use authentication context
 * Must be used within AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
