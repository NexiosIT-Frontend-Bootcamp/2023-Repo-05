import axios from "axios";

interface IGetUsersResponse {
    statusCode: number,
    users: Array<any>
}


const getUsers = async (token : string) : Promise<IGetUsersResponse>=> {
    const response = {
        statusCode: 500,
        users: []
    }
    try {
        const data = await axios.get('https://lobster-app-osqfh.ondigitalocean.app/users',{
            headers:
                {
                    Authorization: `Bearer ${token}`
                }
        });
        response.statusCode = data.status;
        response.users = data.data;
    } catch(err : any) {
        response.statusCode = err.response.statusCode;
    }
    return response;
}

const createGroup = async (body, token) => {
    const response = {
        statusCode: 500,
        group: {}
    }
    try {
        console.log(token)
        const data = await axios.post('https://lobster-app-osqfh.ondigitalocean.app/rooms', body, {
            headers:
                {
                    Authorization: `Bearer ${token}`
                }
        });
        response.statusCode = data.status;
        response.group = data.data;
    } catch(err : any) {
        console.log(err)
        response.statusCode = err.response.statusCode;
    }
    return response;
}

const getRooms = async (token) => {
    const response = {
        rooms: [],
        statusCode: 500
    }
    try {
        const data = await axios.get('https://lobster-app-osqfh.ondigitalocean.app/rooms',{
            headers:
                {
                    Authorization: `Bearer ${token}`
                }
        });
        response.rooms = data.data;
        response.statusCode = 200;
    } catch(err) {
        console.log(err)
    }
    return response;
}

export { getUsers, createGroup, getRooms }
