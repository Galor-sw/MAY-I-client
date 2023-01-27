import { withSocket } from './withSocket';
import {useEffect, useRef, useState} from "react";
import Typing from "./Typing";
import ChatMessagesList from "./ChatMessagesList";

// Typing...
let timeout = undefined;

const Chat = ({socket}) => {

    // Client joined the chat
    useEffect(() => {
    socket.emit('joinChat', "TestingDorUser");
    }, []);

    // Hide 'typing..'
    const typingTimeout = (username) =>  {

        setTyping(false);
        socket.emit('typing', {user: username, typing: false});
    }

    const sendMessage = (e) => {
        e.preventDefault();

        // Get the message text.
        const msg = e.target.elements.msg.value;

        // Emit the message to the server.
        socket.emit('chatMessage', msg);

        // Clear input
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();

        clearTimeout(timeout);
        typingTimeout('userNameTest');
    }

    useEffect(() => {
        // Message from server
        socket.on('message', message => {
            outputMessage(message);

            // Scroll down
            chatMessages.scrollTop = chatMessages.scrollHeight;
        })
    }, []);

    const [chatMessages, setChatMessages] = useState([]);

    const outputMessage = (message) => {
        // update the list with a new message
        setChatMessages((prevState) => [...prevState, message]);
    }

    const [typing, setTyping] = useState(false);

    // Show 'typing..'
    const userTyping = (e) => {

        // if Not CR
            if (e.which != 13) {
                setTyping(true);
                socket.emit('typing', {user: "testYossi", typing: true});

                clearTimeout(timeout);
                timeout = setTimeout(typingTimeout, 3000);
            } else {
                clearTimeout(timeout);
                typingTimeout();
            }
    };

    socket.on('display', (data) => {
        if (data.typing == true) {
            setTyping(true);
        } else {
            setTyping(false)
        }
    })

    return (
        <>
            <div className="ChatBody">
            <div className="chat-container">
                <header className="chat-header">
                    <h1 className="ChatH1">Private Chat</h1>
                    <a className="btn noTextDeco" href="http://localhost:3000/home" id="disconnect">Leave Chat</a>
                </header>
                <main className="chat-main">
                    <ChatMessagesList messages={chatMessages}/>
                </main>
                <div className="chat-form-container">
                    {typing && <Typing name={"user.name"}/>}
                    <form id="chat-form" onSubmit={sendMessage}>
                        <input onChange={userTyping}
                            autoComplete="off"
                            id="msg"
                            placeholder="Enter Message"
                            required
                            type="text"
                        />
                        <button className="btn" ><i className="fas fa-paper-plane"></i> Send</button>
                    </form>
                </div>
            </div>
            </div>
            <script
                crossOrigin="anonymous"
                integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.11.0/qs.min.js"></script>
        </>
    )
}

export default withSocket(Chat);
