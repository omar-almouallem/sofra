import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { decodeToken } from '../utils/auth-utils';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  role: string;
  setRole: any;
  setIsAuthenticated:any,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  });
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const role = decodeToken(token).role;
        {
          role === 'superAdmin'
            ? setRole('superAdmin')
            : role === 'admin'
            ? setRole('admin')
            : setRole('user');
        }
      }
      if (!token) {
        setIsAuthenticated(false);
      }
    } else {
      localStorage.removeItem('accessToken');
      setRole("")
    }
  }, [isAuthenticated,role]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
      localStorage.removeItem('accessToken');
    setIsAuthenticated(false);

  };
  
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, role, setRole,setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
