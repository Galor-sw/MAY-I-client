const SignUp = ({setStatus}) => {
    const changeStatus = (e) => {
        setStatus('login');
    }

    return (
        <>
            <div className={`min-w-[260px] grid place-items-center h-screen`}>

                <form action="#" className="form" id="signup-form" method="POST">
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
                            <input name="number" placeholder="Age" required type="text"/>
                        </label>
                    </div>
                    <div className="form-field r-gender">
                        <div className="icon">
                            <span className="material-symbols-outlined">man_4</span>
                        </div>
                        <label htmlFor="gender"></label>
                        <select id="gender" name="gender" placeholder="Gender">
                            <option value="male">male</option>
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
                            <input onChange="loadimg()" name="image" type="file" className={`text-right`}
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
