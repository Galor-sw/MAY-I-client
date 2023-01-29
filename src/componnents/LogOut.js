import React, {useEffect, useState} from 'react';
import axios from "axios";
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = ({myId}) => {
    const [location, setLocation] = useState(window.location.origin);
    const [imageUrl, setImageUrl] = useState('');
    const [user, setUser] = useState();
    let clientURL;
    let serverURL;

    if (location == 'http://localhost:3000') {
        clientURL = 'http://localhost:3000';
        serverURL = 'http://localhost:4020';
    } else {
        clientURL = 'https://may-i-client.onrender.com';
        serverURL = 'https://may-i.onrender.com';
    }

    useEffect(() => {

    console.log(myId);
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${clientURL}`;
    axios.get(`${serverURL}/connected/user/${myId}`)
        .then(retVal => {
            setImageUrl(retVal.data.image.ImageUrl);
        })
        .catch(error => console.log(error))
        axios.get(`${serverURL}/connected/user/${myId}`)
            .then(retVal => {
                setImageUrl(retVal.data.image.ImageUrl);
                setUser(retVal.data)
            })
            .catch(error => console.log(error))

    }, []);

    const handleLogout = async () => {

        await axios.post(`${serverURL}/logOut`, {
                user_id: `${myId}`,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }).catch(error => {
            console.log("logOut failed")
            console.log(error);
        });

        window.location.href = clientURL;

    }

    return !user ? null :  (
        <div className="flex mr-10">
            <div className="mr-5 flex-col flex items-end">
                <h2>Hey {user.firstname}</h2>

                <button className="mt-3" onClick={handleLogout}><FiLogOut alt="LogOut"  size="30px" className=""/></button>
            </div>
            <img className="rounded-full shadow-sm max-w-[100px] max-h-[100px] " src={imageUrl} alt="Profile"/>
        </div>
    );
}

export default LogoutButton;
