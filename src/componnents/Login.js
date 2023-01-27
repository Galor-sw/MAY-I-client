import '../login.css'

import {useState} from "react";
import LoginPage from "./LoginPage";
import SignUp from "./signUp";

const Login = () => {
    const [status, setStatus] = useState('login');


    return (
        <>
            {status === 'login' && <LoginPage setStatus={setStatus}/>}
            {status === 'signUp' && <SignUp setStatus={setStatus}/>}
        </>
    )
}

export default Login;
