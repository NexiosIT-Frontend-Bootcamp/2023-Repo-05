import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../contexts/AuthContext";
import UnGuardedWrapper from "../wrappers/UnguardedWrapper";

interface ILoginForm {
    email: string,
    password: string
}

const Login = () => {
    const navigate = useNavigate()
    const {signIn} = useAuthContext();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [error] = useState('');
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await registerUser(credentials);
    }



    const registerUser = async (credentials : ILoginForm) => {
        console.log(credentials)

        const loginResponse = await signIn({email: credentials.email, password: credentials.password});
        if (loginResponse.statusCode === 201) navigate('/');


    }

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setCredentials((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    }
    return (
        <UnGuardedWrapper>
            <form method="post" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={credentials.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-control">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-control">
                    <label></label>
                    <button type="submit">Login</button>
                </div>
                {error}

            </form>
        </UnGuardedWrapper>
    )
}

export default Login
