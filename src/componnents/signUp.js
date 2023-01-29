import {useState} from "react";
import axios from "axios";

const SignUp = ({setStatus}) => {
    const changeStatus = (e) => {
        setStatus('login');
    }
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
    const [imageFile, setImageFile] = useState('');

    async function loadImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        await reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImageFile(reader.result);
            console.log(imageFile);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(e.target)
        const form = e.target;
        const formData = new FormData(form);
        console.log(formData.get('email'));

        const data = {
            username: formData.get('username'),
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            age: formData.get('age'),
            gender: formData.get('gender'),
            description: formData.get('description'),
            image: `${imageFile}`,
            password: formData.get('password'),
        }
        axiosData(data).then(r => console.log(r));
    }

    const axiosData = async (data) => {
        try {
            console.log('bring data');
            await axios.post(`${serverURL}/signUp`, data).then(res => {
                if (res.status == 200) {
                    window.location.replace(`${clientURL}`);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={`min-w-[260px] grid content-center place-items-center h-screen`}>
                <img alt="My Image" className="my-image"
                     src="https://res.cloudinary.com/dm2gqkilw/image/upload/v1675013552/users_profile/may_i_3_uaxxn7.png"/>
                <form action="#" className="form" id="signup-form" onSubmit={submit} method="POST">

                    <div className="form-field r-username">
                        <div className="icon">
                            <span className="material-symbols-outlined">account_circle</span>
                        </div>
                        <label>
                            <input name="username" placeholder="Username" required type="text"/>
                        </label>
                    </div>
                    <div className="form-field r-firstname">
                        <div className="icon">
                            <span className="material-symbols-outlined">badge</span>
                        </div>
                        <label>
                            <input name="firstname" placeholder="First name" required type="text"/>
                        </label>
                    </div>
                    <div className="form-field r-lastname">
                        <div className="icon">
                            <span className="material-symbols-outlined">badge</span>
                        </div>
                        <label>
                            <input name="lastname" placeholder="Last name" required type="text"/>
                        </label>
                    </div>
                    <div className="form-field r-email">
                        <div className="icon">
                            <span className="material-symbols-outlined">mail</span>
                        </div>
                        <label>
                            <input name="email" placeholder="E-Mail" required type="email"/>
                        </label>
                    </div>
                    <div className="form-field r-address">
                        <div className="icon">
                            <span className="material-symbols-outlined">home</span>
                        </div>
                        <label>
                            <input name="age" placeholder="Age" required type="number"/>
                        </label>
                    </div>
                    <div className="form-field r-gender">
                        <div className="icon">
                            <span className="material-symbols-outlined">man_4</span>
                        </div>
                        <label htmlFor="gender"></label>
                        <select id="gender" name="gender" placeholder="Gender">
                            {/*<option value="" disabled selected>Male</option>*/}
                            <option value="male" selected>male</option>
                            <option value="female">female</option>
                        </select>
                    </div>
                    <div className="form-field r-description">
                        <div className="icon">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <label className={`grid text-justify`}>
                            <textarea className="description" name="description"
                                      placeholder="Description"></textarea>
                        </label>
                    </div>
                    <div className="form-field r-img">
                        <div className="icon">
                            <span className="material-symbols-outlined">image</span>
                        </div>
                        <label>
                            <input onChange="loadimg()" name="image" onChange={loadImage} type="file"
                                   className={`text-right`}
                                   accept="image/*"/>
                        </label>
                    </div>
                    <div className="form-field r-password">
                        <div className="icon">
                            <span className="material-symbols-outlined">password</span>
                        </div>
                        <label>
                            <input name="password" placeholder="Password" required type="password"/>
                        </label>
                    </div>
                    <button name="submit" type="submit" className={`button`}>Register</button>
                    <div className={`grid grid-rows-2 place-items-center`}>
                        <div>Have an account?
                        </div>
                        <button className="loginButton" id="loginButton" onClick={changeStatus}>Login Now</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;
