import React, {useState} from 'react';
import axios from "axios";

const LogoutButton = ({myId}) => {
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
    console.log(myId);

    axios.get(`${serverURL}/connected/user/${myId}`)
        .then(retVal => {
            setImageUrl(retVal.data.image.ImageUrl);
        })
        .catch(error => console.log(error))

    const [imageUrl, setImageUrl] = useState('');

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

    return (
        <div>
            <img className="rounded-full shadow-sm max-w-[80px]" src={imageUrl} alt="Profile"/>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default LogoutButton;
