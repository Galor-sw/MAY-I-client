import axios from "axios";
import {useState} from "react";


const LoginPage = ({setStatus}) => {
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


    const changeStatus = () => {
        setStatus('signUp');
    }

    const submit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        axiosData(data).then(r => {
        });
    }
    const axiosData = async (data) => {
        try {
            console.log('bring data');
            await axios.post(`${serverURL}/login`, {
                email: data.email, password: data.password,
            }).then(response => {
                const userId = response.data;
                window.location.replace(`${clientURL}/QR/${userId}`);
            });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={`grid content-center place-items-center h-screen`}>
            <img alt="My Image" className="my-image"
                 src="https://res.cloudinary.com/dm2gqkilw/image/upload/v1674659084/users_profile/may-i_orgnc7.png"/>
            <form className={`min-w-[260px]`} onSubmit={submit}>
                <div className="form-field username">
                    <div className="icon">
                        <span className="material-symbols-outlined">account_circle</span>
                    </div>
                    <label>
                        <input name="email" placeholder="Email" required type="text"/>
                    </label>
                </div>
                <div className="form-field password">
                    <div className="icon">
                        <span className="material-symbols-outlined">password</span>
                    </div>
                    <label>
                        <input name="password" placeholder="Password" required type="password"/>
                    </label>
                </div>
                <button name="submit" type="submit" className={`button bg-white`}>Login</button>
                <div className={`grid grid-rows-2`}>
                    <div className={`text-center`}>Don't have an account?
                    </div>
                    <button className="signUpButton" id="registerButton" type="button" onClick={changeStatus}>Sign Up
                        Now
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;
