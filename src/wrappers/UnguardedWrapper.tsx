import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const UnGuardedWrapper = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token ?? '');
                if ((decodedToken.exp ?? 0) * 1000 > new Date().getTime()) {
                    console.log('navigating to home because token is not expired')
                    navigate('/');
                }
            } catch (err) {
                console.log('error')
                console.log(err);
            }
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default UnGuardedWrapper;
