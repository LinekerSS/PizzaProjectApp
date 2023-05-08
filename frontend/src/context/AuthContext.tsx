import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

type AuthContenxtData = {
    user?: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;    
}

export const AuthContext = createContext({} as AuthContenxtData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch (error) {
        console.log('Erro ao deslogar');        
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({ email, password } : SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            const { id, name, token } = response.data
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // expirar em 1 mes
                path: '/'
            })
            //console.log(response.data);

            setUser({
                id,
                name,
                email
            })

            // Passar para proximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            // Redirecionar o user pra barra dashboard
            Router.push('/dashboard');
            
        } catch(err) {
            console.log("Erro ao acessar ", err);
            
        }
        
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    ) 
}