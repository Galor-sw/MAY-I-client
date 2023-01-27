import ChatMessage from "./ChatMessage";
import {useEffect, useRef, useState} from 'react';


const ChatMessagesList = (props) => {

    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    return (
            <div  className="chat-messages">
                {props.messages.map(message => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
            </div>
    )
}

export default  ChatMessagesList;
