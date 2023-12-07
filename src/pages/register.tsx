import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../contexts/AuthContext";
import UnGuardedWrapper from "../wrappers/UnguardedWrapper";

interface RegisterForm {
    email: string,
    username: string,
    password: string,
    passwordConfirm: string
}
const Register = () => {
    const navigate = useNavigate()
    const {signIn, signUp} = useAuthContext();

    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: ''
    });

    const [error, setError] = useState('');
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await registerUser(credentials);
    }

    const registerUser = async (credentials : RegisterForm) => {
        console.log(credentials)
        if (credentials.password === credentials.passwordConfirm) {
            const response = await signUp({
                email: credentials.email,
                password: credentials.password,
                username: credentials.username
            });
            if (response.statusCode !== 201) setError(response.message);
            else {
                // navigate('/')
                const loginResponse = await signIn({email: credentials.email, password: credentials.password});
                if (loginResponse.statusCode === 201) navigate('/');
            }
        } else {
            setError('Passwords do not match.')
        }
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
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
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
                    <label>Password</label>
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={credentials.passwordConfirm}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-control">
                    <label></label>
                    <button type="submit">Register</button>
                </div>
                {error}

            </form>
        </UnGuardedWrapper>
    )
}

export default Register
