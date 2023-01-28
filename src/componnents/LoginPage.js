import axios from "axios";
import cookie from "js-cookie";

const LoginPage = ({setStatus}) => {
    const changeStatus = () => {
        setStatus('signUp');
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const navigate = useNavigate();
    // const submit = (e) => {
    //     e.preventDefault();
    //     console.log('into submit');
    //     navigate("/home");
    // }


    const submit = (e) => {
        e.preventDefault();
        console.log(e.target)
        const form = e.target;
        const formData = new FormData(form);
        console.log(formData.get('email'));

        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        axiosData(data).then(r => console.log(r));
    }
    const axiosData = async (data) => {
        try {
            console.log('bring data');
            await axios.post(`http://localhost:4020/login`, {
                    email: data.email, password: data.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Cookie': `Idea-de3e26ac=${cookie.get('Idea-de3e26ac')}; session=${cookie.get('session')}; session.sig=${cookie.get('session.sig')}; sessionId=${cookie.get('sessionId')}`
                    },
                    withCredentials: true,
                    credentials: 'include',
                }
            )
                .then(response => {
                    const userId = response.data;
                    window.location.replace(`http://localhost:3000/QR/${userId}`);
                });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={`grid place-items-center h-screen`}>
            <form className={`min-w-[260px]`} onSubmit={submit}>
                <div className="form-field username">
                    <div className="icon">
                        <span className="material-symbols-outlined">account_circles</span>
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
