import {useNavigate} from "react-router-dom";

const LoginPage = ({setStatus}) => {
    const changeStatus = () => {
        setStatus('signUp');
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        console.log('into submit');
        navigate("/home");

    }
    return (
        <div className={`grid place-items-center h-screen`}>
            <form className={`min-w-[260px]`}>
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
                <button name="submit" type="submit" className={`button bg-white`} onSubmit={submit}>Login</button>
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
