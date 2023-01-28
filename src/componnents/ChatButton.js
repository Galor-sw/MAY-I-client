import {useNavigate} from "react-router-dom";

const ChatButton = ({myId, userId, socket}) => {

    const navigate = useNavigate()

    const submit = () => {

        socket.emit('ChatInvite', userId)
        socket.disconnect()

        navigate(`/Chat?myId=${myId}&roomId=${userId}`)

    }

    return (
        <button className='chat m-4 bg-contain bg-no-repeat w-10 h-10 place-self-center' onClick={submit}></button>
    )
}

export default ChatButton;

