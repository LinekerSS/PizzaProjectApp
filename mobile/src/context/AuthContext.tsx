import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void> // TIPANDO MINHA FUNCIONALIDADE ONDE RETORNA VAZIO
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData);    

export function AuthProvider({ children } : AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''   
    })

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name // !! transformo em booleano, se tiver algo no name me returna true, caso contrário por padrão false

    useEffect(() => {
        const getUser = async() => {
            // Pegar os dados salvos do user
        const userInfo = await AsyncStorage.getItem('@sujeitoPizzaria')
        let hasUser: UserProps = JSON.parse(userInfo || '{}') 

        // Verificar se recebemos as informações dele
        if(Object.keys(hasUser).length > 0) {
            api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

            setUser({
                id: hasUser.id,
                name: hasUser.name,
                email: hasUser.email,
                token: hasUser.token
            })
        }
        setLoading(false);
        }

        getUser();

    },[]) 


    const signIn = async ({ email, password} : SignInProps) => {
        setLoadingAuth(true);

        //Aqui eu fiz o login
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            //console.log(response.data);

            const { id, name, token } = response.data;

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@sujeitoPizzaria', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                
            setUser({
                id,
                name,
                email,
                token
            })
            
            setLoadingAuth(false)

        } catch (error) {
            console.log('Erro ao acessar', error);
            setLoadingAuth(false);
            
        }        
    }


    const signOut = async () => {
        await AsyncStorage.clear()
        .then(() => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            signIn, 
            loadingAuth, 
            loading,
            signOut
            }}>
            {children}
        </AuthContext.Provider>
    )
}