import {useEffect, useState} from "react";
import Typing from "./Typing";
import ChatMessagesList from "./ChatMessagesList";
import {io} from 'socket.io-client';
import axios from "axios";
import LeaveChatButton from "./LeaveChatButton";
import Header from "./Header";


const Chat = () => {

    const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
    const [socket, setSocket] = useState();
    const [myId, setMyId] = useState();
    const [typing, setTyping] = useState(false);
    const [typerName, setTyperName] = useState("")
    const [userName, setUserName] = useState("")
    let user;
    const [location, setLocation] = useState(window.location.origin);
    let clientURL;
    let serverURL
    if (location == 'http://localhost:3000') {
        clientURL = 'http://localhost:3000';
        serverURL = 'http://localhost:4020';
    } else {
        clientURL = 'https://may-i-client.onrender.com';
        serverURL = 'https://may-i.onrender.com';
    }
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${clientURL}`;
    // Typing...
    let timeout = undefined;

    // Client joined the chat
    useEffect(() => {

        const roomId = searchParams.get('roomId');
        const myId = searchParams.get('myId');

        const newSocket = io(`${serverURL}`, {
            query: {
                userId: myId,
                roomId: roomId
            }
        });

        setSocket(newSocket);
        setMyId(myId);

        axios.get(`${serverURL}/connected/user/${myId}`)
            .then(retVal => {
                user = retVal
                setTyperName(retVal.data.firstname)
                setUserName(retVal.data.firstname)

                newSocket.emit('joinChat', retVal.data.firstname);

                newSocket.on('message', message => {
                    outputMessage(message);

                    // Scroll down
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                })

                newSocket.on('display', (data) => {
                    if (data.typing == true) {
                        setTyperName(data.user)
                        setTyping(true);
                    } else {
                        setTyperName(data.user)
                        setTyping(false)
                    }
                })
            })
            .catch(error => console.log(error))

    }, []);

    // Hide 'typing..'
    const typingTimeout = () => {
        setTyping(false);
        socket.emit('typing', {user: typerName, typing: false});
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
        typingTimeout();
    }

    useEffect(() => {
        // Message from server

    }, []);

    const [chatMessages, setChatMessages] = useState([]);

    const outputMessage = (message) => {
        // update the list with a new message
        setChatMessages((prevState) => [...prevState, message]);
    }


    // Show 'typing..'
    const userTyping = (e) => {

        // if Not CR
        if (e.which != 13) {

            //setTyping(true);
            setTyperName(userName);
            socket.emit('typing', {user: userName, typing: true});

            clearTimeout(timeout);
            timeout = setTimeout(typingTimeout, 3000);
        } else {
            clearTimeout(timeout);
            typingTimeout();
        }
    };

    return !myId ? null : (
        <>
            <Header myId={myId}/>
            <div className={`grid`}>
                <div className="ChatBody m-2 md:m-10 grid md:place-items-center">
                    <div className="chat-container max-w-[1100px] border-2 border-black ">
                        <header className="chat-header text-black border-b-2 border-black">
                            <h1 className="ChatH1">Private Chat</h1>
                            <LeaveChatButton myId={myId} socket={socket}/>
                        </header>
                        <main className="chat-main">
                            <ChatMessagesList messages={chatMessages}/>
                        </main>
                        <div className="chat-form-container border-t-2 border-black">
                            {typing && <Typing name={typerName}/>}
                            <form id="chat-form" onSubmit={sendMessage}>
                                <div
                                    className={`grid grid-flow-row md:grid-flow-col gap-2 min-w-full`}>
                                    <input onChange={userTyping} className={`min-w-fit md:min-w-[800px]`}
                                           autoComplete="off"
                                           id="msg"
                                           placeholder="Enter Message"
                                           required
                                           type="text"
                                    />
                                    <button className="btn min-w-[160px] place-self-center rounded-md"><i
                                        className="fas fa-paper-plane"></i> Send
                                    </button>

                                </div>
                            </form>
                        </div>
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

export default Chat;
