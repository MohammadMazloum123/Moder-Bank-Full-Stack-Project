import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string, FirstName: string, LastName: string) => Promise<void>;
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
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if(token){
            try{
                const response = await axiosInstance.get('/auth/me');
                setUser(response.data);
            }cat
        }
        setIsLoading(false);
    };

        checkLoggedIn();
    }, []);

    const signUp = async (email: string,FirstName: string,LastName: string, password: string) => {
      // In a real application, you would make an API call to create a new user
      // For this example, we'll simulate a successful sign-up
        const newUser = { id: Date.now().toString(), email, FirstName, LastName };
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
    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, isLoading }}>
        {children}
    </AuthContext.Provider>
    );
};