import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

const ChatPopUp = ({sender, roomId, socket, setCommunication, blur, communication}) => {
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

    const closeWindow = () => {

        axios.get(`${serverURL}/connected/user/${roomId}`)
            .then(retVal => {
                const user = retVal

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
        socket.disconnect()
        navigate(`/Chat?myId=${roomId}&roomId=${roomId}`)
    }

    return (
        <div
            className="popUp absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center backdrop-blur-lg ">
            <div
                className="popUpBox min-w-[250px] max-w-[400px] min-h-[300px] bg-red-200 drop-shadow-lg text-lg rounded-lg">
                <div className="communicationText ">{communication}</div>
                <button className='approveButton' onClick={approve}>Start Chating</button>
            </div>
            <button className='absolute top-4 right-4' onClick={closeWindow}>X</button>
        </div>
    )
}

export default ChatPopUp;
