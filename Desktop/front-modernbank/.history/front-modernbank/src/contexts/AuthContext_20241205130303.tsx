import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';
import { Email } from '@mui/icons-material';

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
            }catch(error){
                console.error('Error verifying token:', error);
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false);
    };
        checkLoggedIn();
    }, []);

    const signUp = async (email: string,FirstName: string,LastName: string, password: string) => {
        try{
            const response = await axiosInstance.post('/auth/signup', {
                email,
                password,
                FirstName,
                LastName
            });
            const {user, token} = response.data;
            setUser(user);
            localStorage.setItem('token', token);
            navigate('/');
        }catch(error){
            console.error('Signup error:', error);
            throw error;
        }
    };
    const logOut = async () => {
        try{
            await axiosInstance.post('/auth/logout');
        }catch(error){
            console.error('Logout error:', error);
        }finally{
            setUser(null);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };
    const logIn = async (email: string, password: string) => {
        try{
            const response = await axiosInstance.post('/auth/login', {
                email,
                password
            });
            const {user, token} = response.data;
            setUser(user);
            localStorage.setItem('token', token);
            navigate('/');
        }catch(error){
            console.error('Login error')
        }
    }

    return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, isLoading }}>
        {children}
    </AuthContext.Provider>
    );
};