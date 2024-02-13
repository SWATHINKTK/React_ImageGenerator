import React from 'react';

import style from './login.module.css';

const Login = () => {

    return (
        <div className={style.login_page}>
            <div className={style.container}>
                    <div className={style.left_container}>
                    <img src="../../public/Images/BG2.avif" alt="" />
                    </div>
                    <div className={style.right_container}>
                        <div>
                        <h2>Login Page</h2>
                        <p>hey enter your details to sign in your account ...!</p>
                        </div>
                        <form action="" className={style.login_form}>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='username'/>
                        <label htmlFor="password" >Password</label>
                        <input type="text"  placeholder='password' />
                        <button className={style.login_btn}>Login</button>
                        </form>
                        <button className={style.signup_btn}>Create New Account</button>
                    </div>
            </div>
        </div>
    )
}

export default Login;
