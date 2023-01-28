import './App.css';
import Map from "./componnents/Map";
import Card from "./componnents/Card";
import {useEffect, useState} from "react";
import axios from 'axios';
import cookie from 'js-cookie';
import DrinkMenu from "./componnents/DrinkMenu";
import {io} from 'socket.io-client';
import ChatPopUp from "./componnents/ChatPopUp";
import DrinkPopUp from "./componnents/DrinkPopUp";


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}


function App() {
    const [location, setLocation] = useState(window.location.origin);
    const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState('');
    const [socket, setSocket] = useState();
    const [room, setRoom] = useState();
    const [clicker, setClicker] = useState(searchParams.get('myId'));
    const [sender, setSender]= useState();

    useEffect(() => {

        const row = searchParams.get('row');
        const col = searchParams.get('col');
        const myId = searchParams.get('myId');

        setClicker(myId)

        console.log("myId:" + myId);

        const newSocket = io('http://localhost:4020', {
            query: {
                userId: myId,
                roomId: ""
            }
        });

        setSocket(newSocket)

        newSocket.on('ChatInvite', msg => {
            console.log(msg)
            axios.get(`http://localhost:4020/connected/user/${msg.sender}`)
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
            axios.get(`http://localhost:4020/connected/user/${msg.sender}`)
                .then(retVal => {
                    setDrinkPopUpText(`${retVal.data.firstname} ${msg.message}`)
                })
                .catch(error => console.log(error))

            setBlur('blur-md')
        });

        // function to run only once on component load
        const bringData = async () => {
            try {
                await axios.get(`http://localhost:4020/connected/connectedUsers`)
                    .then(response => {
                            response.data.map((index, key) => {
                                appendUsers(index);
                            })
                        }
                    );
            } catch (error) {
                console.log(error)
            }
        }
        bringData().then();
    },[]);



    const server = async (e) => {
        console.log("111111111111111111111")
        e.preventDefault();
        // JSON.stringify({email: "kobi.ronen@gmail.com", password: "123"});
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        try {
            console.log('login');
            await axios.post(`${location}/login`, {
                    email: "kobi.ronen@gmail.com", password: "123",
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }).then(response => response.json())
                .then(sessionID => {
                    // do something with the data

                    console.log(sessionID);
                    // setSessionId(sessionID);
                });

        } catch (error) {
        }
    }

    const userInfo = async (e) => {
        e.preventDefault();
        try {
            console.log('after login');
            console.log({toto: document.cookie});
            await axios.get(`${location}/userInfo`, {
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `Idea-de3e26ac=${cookie.get('Idea-de3e26ac')}; session=${cookie.get('session')}; session.sig=${cookie.get('session.sig')}; sessionId=${cookie.get('sessionId')}`
                }
            }).then(response => {
                // const data = response
                console.log({cookies: getCookie()})
                console.log({...response})
                const data = response.data;
                console.log(JSON.stringify(data))
            });

        } catch (error) {
            console.error(error);
        }
    }
    const [users, setUsers] = useState([]);

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
            <div
                className={'grid place-content-center gap-4 mainLinear bg-cover h-screen relative w-full bg-cover bg-center ' + blur}>
                {/*<button onClick={server}>login</button>*/}
                {/*<button onClick={userInfo}>afterLogin</button>*/}
                <Map changeUser={changeUser} users={users}/>
                {userId !== '' && <Card myId={clicker} user={user} communicationDrink={setCommunicationDrink} communicationChat={setCommunicationChat} blur={setBlur} socket={socket}/>}
            </div>
            {communicationDrink != '' &&
                <DrinkMenu sender={clicker} communication={communicationDrink} setCommunication={setCommunicationDrink} blur={setBlur} socket={socket}/>}
            {communicationChat != '' &&
                <ChatPopUp sender={sender} roomId={room} communication={communicationChat} setCommunication={setCommunicationChat} blur={setBlur} socket={socket}/>}
            {drinkPopUpText != '' &&
                <DrinkPopUp communication={drinkPopUpText} setCommunication={setDrinkPopUpText} blur={setBlur}/>}
        </>
    );
}

export default App;
