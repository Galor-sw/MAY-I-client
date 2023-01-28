import {useNavigate} from "react-router-dom";

const LeaveChatButton = ({myId, socket}) => {

    const navigate = useNavigate()

    const leaveChat = (e) => {
        e.preventDefault()
        socket.disconnect()
        navigate(`/home?myId=${myId}`)

    }

    return (
        <a className="btn noTextDeco" href="http://localhost:3000/home" id="disconnect" onClick={leaveChat}>Leave Chat</a>
    )
}

export default LeaveChatButton;

