import Sidebar from "./sidebar";
import {useAuthContext} from "../contexts/AuthContext";
import {useEffect, useState} from "react";
import {createGroup, getUsers} from "../api/groupCreation";
import {useNavigate} from "react-router-dom";
import ChatRoom from "./Chatroom";

const HomeComponent = () => {
    const authContext = useAuthContext()
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    console.log(authContext.user)
    useEffect(() => {
        setUser(sessionStorage.getItem('user') ?? '');
        getUsers(sessionStorage.getItem('accessToken') ?? '').then((data) => {
            if(data.statusCode !== 200) navigate('/login')
            else setUsers(data.users);
        });
    }, [])

    const createUserGroup = async (data) => {
        console.log(sessionStorage.getItem('accessToken'))
        const result = await createGroup(data, sessionStorage.getItem('accessToken') ?? '')
        console.log(result);
    }
    return (
        <>
            <Sidebar displayName={user} users={users} createGroup={createUserGroup}></Sidebar>
            <ChatRoom></ChatRoom>
        </>
    );
}
export default HomeComponent;
