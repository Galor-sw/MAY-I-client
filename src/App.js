import './App.css';
import Map from "./componnents/Map";
import Card from "./componnents/Card";
import {useEffect, useState} from "react";
import DrinkInvite from "./componnents/DrinkInvite";
import axios from 'axios';
import cookie from 'js-cookie';
import { withSocket } from './componnents/withSocket';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}


function App() {
    const [location, setLocation] = useState(window.location.origin);
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState('');

    const server = async (e) => {
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

    useEffect(() => {
        // function to run only once on component load

        const bringData = async () => {
            try {
                console.log('mapping');
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
    }, []);


    const changeUser = (user) => {
        setUserId(user);
        let userJson = users.find(e => e.user_id._id === user);
        setUser(userJson);
    }

    const [communicationCard, setCommunication] = useState();
    const [blur, setBlur] = useState('');
    return (
        <>
            <div
                className={'grid place-content-center gap-4 mainLinear bg-cover h-screen relative w-full bg-cover bg-center ' + blur}>
                {/*<button onClick={server}>login</button>*/}
                {/*<button onClick={userInfo}>afterLogin</button>*/}
                <Map changeUser={changeUser} users={users}/>
                {userId !== '' && <Card user={user} func={setCommunication} blur={setBlur}/>}
            </div>
            {communicationCard === 'drink' && <DrinkInvite func={setCommunication} blur={setBlur}/>}
        </>
    );
}

export default withSocket(App);
