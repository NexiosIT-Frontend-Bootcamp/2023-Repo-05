import axios from "axios";

export interface IRegisterCredentials {
    username: string,
    password: string,
    email: string
}

export interface ILoginCredentials {
    email: string,
    password: string
}

export interface IRegisterResponse {
    statusCode: number,
    message: string
}

export interface ILoginResponse {
    statusCode: number,
    message: string,
    accessToken: string
}

const register = async (user: IRegisterCredentials): Promise<IRegisterResponse> => {
    const response: IRegisterResponse = {statusCode: 500, message: 'Oops, something went wrong!'}
    try {
        const data = await axios.post('https://lobster-app-osqfh.ondigitalocean.app/users', user);
        response.statusCode = data.status;
        response.message = 'success';

    } catch (error: any) {
        if (error.response.data.statusCode !== 400) response.message = 'Oops, something went wrong!'
        else {
            response.message = error.response.data.message;
            response.statusCode = error.response.data.statusCode
        }
    }
    return response;
}

const login = async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
    const response = {
        statusCode: 500,
        accessToken: '',
        message: 'Oops something went wrong!'
    };
    try {
        const data = await axios.post('https://lobster-app-osqfh.ondigitalocean.app/auth/login', credentials);
        if (data.status === 201) {
            response.statusCode = data.status;
            response.accessToken = data.data.access_token;
            response.message = 'success';
        }
    } catch (error: any) {
        if (error.response.statusCode === 401) {
            response.statusCode = error.response.data.statusCode;
            response.message = error.response.data.message;
            response.accessToken = '';
        }
    }
    return response;
}

const getUser = async (token: string) => {
    return await axios.get('https://lobster-app-osqfh.ondigitalocean.app/users/profile', {
        headers:
            {
                Authorization: `Bearer ${token}`
            }
    });
}

export {register, login, getUser}
