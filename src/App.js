import './App.css';
import Map from "./componnents/Map";
import Card from "./componnents/Card";
import {useEffect, useState} from "react";
import axios from 'axios';
import DrinkMenu from "./componnents/DrinkMenu";
import {io} from 'socket.io-client';
import ChatPopUp from "./componnents/ChatPopUp";
import DrinkPopUp from "./componnents/DrinkPopUp";
import Header from "./componnents/Header";

function App() {
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState('');
    const [socket, setSocket] = useState();
    const [room, setRoom] = useState();
    const [clicker, setClicker] = useState(searchParams.get('myId'));
    const [sender, setSender] = useState();
    const [loading, setLoading] = useState(true);
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
    useEffect(() => {
        const row = searchParams.get('row');
        const col = searchParams.get('col');
        const myId = searchParams.get('myId');

        setClicker(myId)


        const newSocket = io(`${serverURL}`, {
            query: {
                userId: myId,
                roomId: ""
            }
        });

        setSocket(newSocket);

        newSocket.on('ChatInvite', msg => {
            console.log(msg)
            axios.get(`${serverURL}/connected/user/${msg.sender}`)
                .then(retVal => {
                    setCommunicationChat(`${retVal.data.firstname} ${msg.message}`)
                })
                .catch(error => console.log(error))

            setRoom(msg.receiver)
            setSender(msg.sender)
            setBlur('blur-md')
        });

        newSocket.on('drinkInvite', msg => {
            console.log(msg)
            axios.get(`${serverURL}/connected/user/${msg.sender}`)
                .then(retVal => {
                    setDrinkPopUpText(`${retVal.data.firstname} ${msg.message}`)
                })
                .catch(error => console.log(error))

            setBlur('blur-md')
        });

        // function to run only once on component load
        const bringData = async () => {
            try {
                await axios.get(`${serverURL}/connected/connectedUsers`)
                    .then(response => {
                            response.data.map((index, key) => {
                                appendUsers(index);
                            })
                            setLoading(false);
                        }
                    );
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
        bringData().then();
    }, []);

    const appendUsers = (user) => {
        const tempUsers = users;
        tempUsers.push(user);
        setUsers(tempUsers);
    }

    const changeUser = (user) => {
        setUserId(user);
        let userJson = users.find(e => e.user_id._id === user);
        setUser(userJson);
    }

    const [communicationChat, setCommunicationChat] = useState('');
    const [communicationDrink, setCommunicationDrink] = useState('');
    const [drinkPopUpText, setDrinkPopUpText] = useState('');

    const [blur, setBlur] = useState('');
    return (
        <>
            <Header myId={clicker}/>
            <div
                className={'grid place-content-center mainLinear bg-cover h-full mt-8 md:mt-15 relative w-full bg-cover bg-center ' + blur}>
                {!loading ? <Map changeUser={changeUser} users={users}/> : <div>loading...</div>}
                {userId !== '' ? <Card myId={clicker} user={user} communicationDrink={setCommunicationDrink}
                                       communicationChat={setCommunicationChat} closeCard={setUserId} blur={setBlur}
                                       socket={socket}/> :
                    <div className={`place-self-center text-xl md:text-3xl`}>Click on a person to see his
                        details</div>}
            </div>
            {communicationDrink != '' &&
                <DrinkMenu sender={clicker} popUpDrink={setDrinkPopUpText} communication={communicationDrink} setCommunication={setCommunicationDrink}
                           blur={setBlur} socket={socket}/>}
            {communicationChat != '' &&
                <ChatPopUp sender={sender} roomId={room} communication={communicationChat}
                           setCommunication={setCommunicationChat} blur={setBlur} socket={socket}/>}
            {drinkPopUpText != '' &&
                <DrinkPopUp communication={drinkPopUpText} setCommunication={setDrinkPopUpText} blur={setBlur}/>}
        </>
    );
}

export default App;
