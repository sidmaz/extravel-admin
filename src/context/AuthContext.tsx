import { createContext, useContext, useState, type ReactNode } from 'react';

type UserRole = 'ADMIN' | 'USER' | null;

interface AuthContextType {
  user: { email: string; role: UserRole } | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage so state isn't lost on refresh
  // Initialize state from localStorage to prevent loss on navigation/refresh
  const [user, setUser] = useState<{ email: string; role: UserRole } | null>(() => {
    const saved = localStorage.getItem('extraveluser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, role: string) => {
    const userData = { email, role };
    setUser(userData);
    localStorage.setItem('extraveluser', JSON.stringify(userData)); // Save it!
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('extraveluser'); // Clear it!
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
