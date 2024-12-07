import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    logIn:(email: string, password:string) => Promise<void>;
    logOut:() => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used with an authProvider')
    }
    return context;
}
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const checkLoggedIn = async () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
      };
  
      checkLoggedIn();
    }, []);
  
    const signUp = async (email: string, password: string) => {
      // In a real application, you would make an API call to create a new user
      // For this example, we'll simulate a successful sign-up
      const newUser = { id: Date.now().toString(), email };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    };
  
    const logIn = async (email: string, password: string) => {
      // In a real application, you would make an API call to verify credentials
      // For this example, we'll simulate a successful login
      const loggedInUser = { id: Date.now().toString(), email };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
    };
  
    return (
      <AuthContext.Provider value={{ user, signUp, logIn, logOut, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
};