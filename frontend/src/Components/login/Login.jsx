import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import validateData from './validate';
import style from './login.module.css';

const INTIAL_STATE = {
    username:'',
    password:''
}

const Login = () => {

    const [loginData, setLoginData] = useState(INTIAL_STATE);
    const [errors, setErrors] = useState(INTIAL_STATE);

    const handleChange = (e) =>{
        const { name , value} = e.target;
        setLoginData({...loginData,[name]:value});
        validateData(name, value, errors, setErrors)
    }
    

    const handleLogin = (e) =>{
        e.preventDefault();
        const { username, password } = loginData;
        const isFormValid = Object.values(errors).every(error => error === '' && username && password)
        
        if(!isFormValid){
            toast.error('Enter Valid Data to Login !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
        }
    }


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
                        <form  className={style.login_form} onSubmit={handleLogin}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className={errors.username ? style.error_input : style.login_input}  placeholder='username' name='username' value={loginData.username} onChange={handleChange} />
                            {errors.username && <span className={style.error}>{errors.username}</span>  }

                            <label htmlFor="password" >Password</label>
                            <input type="text"  className={errors.password ? style.error_input : style.login_input} placeholder='password' name='password' value={loginData.password} onChange={handleChange}/>
                            {errors.password && <span className={style.error}>{errors.password}</span>  }

                            <button className={style.login_btn}>Login</button>
                        </form>
                        <button className={style.signup_btn}>Create New Account</button>
                    </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;
