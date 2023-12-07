import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const GuardWrapper = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        console.log(token)
        if (token) {
            try {
                const decodedToken = jwtDecode(token ?? '');
                if (decodedToken.exp) {
                    if (decodedToken.exp * 1000 < new Date().getTime()) {
                        console.log('decoded token exp')
                        navigate('/login');
                    }
                } else navigate('/login');
            } catch {
                console.log('in catch')

                navigate('/login');
            }
        } else {
            console.log('last else')
            navigate('/login');
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default GuardWrapper;
