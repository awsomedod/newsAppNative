import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  sources?: Array<{
    name: string;
    url: string;
    description: string;
  }>;
  summary_runs?: Array<{
    date_and_time: string;
    summaries: Array<{
      title: string;
      summary: string;
      image: string;
    }>;
  }>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
  updateUser: (user: User) => void;
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
  const login = useCallback((userData: { user: User; token: string }) => {
    setAuthState({
      user: userData.user,
      token: userData.token,
      isAuthenticated: true,
    });
  }, []);

  /**
   * Logout user - clear session data
   */
  const logout = useCallback(() => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  }, []);

  const updateUser = useCallback((user: User) => {
    setAuthState(prev => ({ ...prev, user }));
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    updateUser,
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
