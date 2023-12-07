import {useEffect, useState} from "react";

const Rooms = ({rooms}) => {
    const [roomCount, setRoomCount] = useState(0);

    useEffect(() => {
        console.log('rooms changed')
        console.log(rooms)
        console.log(rooms.length)
        setRoomCount(rooms.length)
    }, [rooms])

    return (
        <>
            Total: {roomCount}
            {rooms.map((room : any) => {

                return <p>{room.name}</p>
            })}
        </>
    )
}

export default Rooms;
