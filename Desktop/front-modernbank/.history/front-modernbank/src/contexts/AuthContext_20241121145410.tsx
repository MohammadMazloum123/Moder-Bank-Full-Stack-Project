import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string,
    email: string
}

interface AuthContextType {
    user: User | null,
    signUp: (email: string, password: string)
}