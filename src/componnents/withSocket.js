import React, { useEffect } from 'react';
import socket  from './socket';

export const withSocket = (WrappedComponent) => (props) => {
    useEffect(() => {
        socket.on('test', async (data) => {
            console.log(data);
            console.log("!!!!!!!!!!!!!!!@!@!@!!!!!!!!!!!!!!!!");
        });

    }, []);

    return <WrappedComponent {...props} socket={socket} />;
};
