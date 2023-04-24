import { createContext } from 'react';

//1. AuthContext uses the method from react create context and we export it to AuthProvider
const AuthContext = createContext(null);

export default AuthContext;
