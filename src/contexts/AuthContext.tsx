import {ILoginResponse} from "../api/authentication";
import {useState} from "react";
import {login, register} from "../api/authentication";


export interface IUserContext {
    loading: Boolean;
    user?: Object,
    accessToken?: string
    signIn: (email: string, password: string) => Promise<ILoginResponse>
    signOut: () => void
}

export const AuthContext = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState('');

    const registerUser = async (credentials) => {
        return await register(credentials);
    }

    const loginUser = async (credentials) => {
        const data = await login(credentials.username, credentials.password);
        if(data.statusCode === 201) {
            setAccessToken(data.accessToken);
            setUser({username: credentials.username});
        }
    }

    return 
}
