import React, {useEffect, useState} from 'react';
import axios from "axios";

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
        ).catch(error => {
            console.log("logOut failed")
            console.log(error);
        });

        window.location.href = clientURL;

    }

    return !user ? null : (
        <div className="flex mr-5 md:mr-10 m-3">
            <div className="mr-2 md:mr-5 grid place-items-center gap-1 md:gap-2 ">
                <p className={`text-md md:text-2xl `}>Hey, {user.firstname}</p>
                <img className="rounded-full shadow-sm max-w-[80px] md:max-w-[100px] max-h-[80px] md:max-h-[100px]"
                     src={imageUrl}
                     alt="Profile"/>
                <button className="mt-3" className={`text-rose-500 font-medium`}
                        onClick={handleLogout}>log out
                </button>
            </div>
        </div>
    );
}

export default LogoutButton;
