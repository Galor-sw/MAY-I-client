import {io} from 'socket.io-client';

const socket = io('http://localhost:4020',
    {
        query:
            {
                id: "userNameTest",
                roomId: "roomIdTest"
            }
    });

export default socket
