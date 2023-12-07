import {useEffect, useRef, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {getRooms} from "../api/groupCreation";
import Rooms from "./Rooms";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const webSocket = useRef<WebSocket>();
    const [rooms, setRooms] = useState([])


    useEffect(() => {
        const retrieveRooms = async () => {
            const data = await getRooms(sessionStorage.getItem('accessToken'));
            setRooms(data.rooms);
        }
        retrieveRooms();
        console.log('')
        webSocket.current = new WebSocket("wss://lobster-app-osqfh.ondigitalocean.app");
        webSocket.current.onmessage = (message) => {
            filterEvents(message)
        };
        return () => webSocket.current?.close();
    }, []);

    const addGroup = () => {
        console.log('group added')
    }

    const addMessage = () => {

    }

    const isInChatRoom = (chatroom): Boolean => {
        console.log('checking if in chat room');
        const x = rooms.find((r) => {
            return r._id === chatroom
        });
        return !!x;
    }
    const filterEvents = (event) => {
        const parsedEvent = JSON.parse(event.data);
        if (isInChatRoom(parsedEvent.data.chatroom)) {
            console.log('is in chat room')
            if (parsedEvent.event === 'new_chatroom') {
                console.log('new group created')
                addGroup();
                console.log('')
            }
            if (parsedEvent.event === 'new_message') {
                console.log('new message?')
                setMessages(prev => [...prev, 'Received message in:' + parsedEvent.data.chatroom]);
                addMessage();
            }
        }

    }
    return <>
        <p>{messages.join(" ")}</p>
        <Rooms rooms={rooms}></Rooms>
    </>;

}


export default ChatRoom
