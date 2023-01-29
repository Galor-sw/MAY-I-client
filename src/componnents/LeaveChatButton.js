import {useNavigate} from "react-router-dom";
import {useState} from "react";

const LeaveChatButton = ({myId, socket}) => {
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
    const navigate = useNavigate()

    const leaveChat = (e) => {
        e.preventDefault()
        socket.disconnect()
        navigate(`/home?myId=${myId}`)

    }
    const href = `${clientURL}/home`
    return (
        <a className="btn noTextDeco" href={href} id="disconnect" onClick={leaveChat}>Leave Chat</a>
    )
}

export default LeaveChatButton;

