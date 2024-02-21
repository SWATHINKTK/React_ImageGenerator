import React, { useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { userAuth } from '../../features/user/useSlice';
import validateData from './validate';
import style from './login.module.css';
import { useNavigate } from 'react-router-dom';

const INTIAL_STATE = {
    username:'',
    password:''
}

const Login = () => {

    const [loginData, setLoginData] = useState(INTIAL_STATE);
    const [errors, setErrors] = useState(INTIAL_STATE);
    const { success, error, user, message } = useSelector((state) =>  state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    useEffect(() => {
        if(error){
            toast.error(message);
            setErrors({
                ...error,
                password:'password does not match!'
            })
        }else if(success || user){
            navigate('/',{replace:true})
        }
    },[error, success, user])

    const handleChange = (e) =>{
        const { name , value} = e.target;
        setLoginData({...loginData,[name]:value});
        validateData(name, value, errors, setErrors)
    }
    


    const handleLogin = (e) =>{
        e.preventDefault();
        const { username, password } = loginData;
        const isFormValid = Object.values(errors).every(error => error === '' && username && password);
        
        if(!isFormValid){
            toast.error('Enter Valid Data to Login !');
        }else{
            dispatch(userAuth(loginData));

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
                        <button className={style.signup_btn} onClick={() => navigate('/register')}>Create New Account</button>
                    </div>
            </div>
        </div>
    )
}

export default Login;
