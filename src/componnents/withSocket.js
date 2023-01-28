// import React, { useEffect } from 'react';
// import {io} from 'socket.io-client';
//
// export const withSocket = (WrappedComponent) => (props) => {
//     const { id, roomId } = props;
//     console.log(id)
//     const socket = io('http://localhost:4020', {
//         query: {
//             id,
//             roomId
//         }
//     });
//
//     useEffect(() => {
//         socket.on('test', async (data) => {
//             console.log(data);
//             console.log("!!!!!!!!!!!!!!!@!@!@!!!!!!!!!!!!!!!!");
//         });
//
//     }, []);
//
//     return <WrappedComponent {...props} socket={socket} />;
// };
