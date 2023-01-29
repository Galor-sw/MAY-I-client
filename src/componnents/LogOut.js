import React, { useState } from 'react';
import axios from "axios";

const LogoutButton = ({myId}) => {

    console.log(myId);

    axios.get(`http://localhost:4020/connected/user/${myId}`)
        .then(retVal => {
            setImageUrl(retVal.data.image.ImageUrl);
        })
        .catch(error => console.log(error))

    const [imageUrl, setImageUrl] = useState('');

    const handleLogout = async () => {

        await axios.post(`${location}/logOut`, {
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

        window.location.href = 'http://localhost:4020';

    }

    return (
        <div>
            <img className="rounded-full shadow-sm max-w-[80px]" src={imageUrl} alt="Profile" />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default LogoutButton;
