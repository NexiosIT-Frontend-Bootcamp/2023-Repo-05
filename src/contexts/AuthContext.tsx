import {getUser, ILoginCredentials, ILoginResponse, IRegisterCredentials, login, register} from "../api/authentication";
import {createContext, useContext, useEffect, useState} from "react";

export interface IAuthContext {
    loading: Boolean;
    user?: Object,
    accessToken?: string
    signIn: (data : ILoginCredentials) => Promise<ILoginResponse>
    signUp: (data: IRegisterCredentials) => Promise<ILoginResponse>

    signOut: () => void
}

const AuthContext = createContext<IAuthContext | null>(null);
export const AuthContextProvider = ({children}: any) => {
    const [loading] = useState(false);
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        setAccessToken(sessionStorage.getItem('accessToken') ?? '');
        setUser(sessionStorage.getItem('user') ?? '');
    }, []);
    const signUp = async (credentials: IRegisterCredentials) => {
        return await register(credentials);
    }

    const signIn = async (credentials: ILoginCredentials) => {
        const data = await login({email: credentials.email, password: credentials.password});
        if (data.statusCode === 201) {
            setAccessToken(data.accessToken);
            sessionStorage.setItem('accessToken', data.accessToken);
            const user = await getUser(data.accessToken);
            sessionStorage.setItem('user', user.data.username)
            sessionStorage.setItem('userId', user.data._id);
            setUser(user);
        }
        return data;
    }

    const signOut = () => {
    }

    return <AuthContext.Provider
        value={{loading, user, accessToken, signUp, signIn, signOut}}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): IAuthContext => {
    const context = useContext<IAuthContext | null>(AuthContext);

    if (!context) {
        throw new Error('user context must be used with a provider')
    }
    return context;
}
