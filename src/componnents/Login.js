import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        console.log('into submit');
        navigate("/home");

    }
// if(looged in){
// }
    return (
        <>
            <form>
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
                <button name="submit" type="submit" className={`bg-white`} onSubmit={submit}>Login</button>
                <div className={`text-center`}>Don't have an account?
                    <button className="signUpButton" id="registerButton" type="button">Sign Up Now</button>
                </div>
            </form>
        </>
    )
}

export default Login;
