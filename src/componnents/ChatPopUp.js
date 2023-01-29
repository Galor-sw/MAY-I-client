import {useNavigate} from "react-router-dom";
import axios from "axios";

const ChatPopUp = ({sender, roomId, socket, setCommunication, blur, communication}) => {

    const navigate = useNavigate()

    const closeWindow = () => {
        console.log(sender)
        console.log(roomId)
        axios.get(`http://localhost:4020/connected/user/${roomId}`)
            .then(retVal => {
                const user = retVal
                console.log(user)

                socket.emit("refuseChat", {
                    name: user.data.firstname,
                    senderId: sender
                })
            })
            .catch(err => console.log(err));

        setCommunication('');
        blur('');
    }

    const approve = () => {
        //move to chat (with roomId)
        console.log(roomId)
        socket.disconnect()
        navigate(`/Chat?myId=${roomId}&roomId=${roomId}`)
    }

    return (
        <div className="popUp absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center backdrop-blur-lg ">
            <div className="popUpBox min-w-[250px] max-w-[400px] min-h-[300px] bg-red-200 drop-shadow-lg text-lg rounded-lg">
                <div className="communicationText ">{communication}</div>
                <button className='approveButton' onClick={approve}>Start Chating</button>
            </div>
            <button className='absolute top-4 right-4' onClick={closeWindow}>X</button>
        </div>
    )
}

export default ChatPopUp;
