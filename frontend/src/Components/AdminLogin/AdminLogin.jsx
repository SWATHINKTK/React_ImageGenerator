import React, { useState } from 'react';

import style from './admin.module.css';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    username:'',
    password:'',
}

const AdminLogin = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState(INITIAL_STATE);
    console.log()

    const handleChange = (e) => {
        const { name , value} = e.target;

        setFormData({
            ...formData,
            [name]:value
        });
        validateForm(name)
    }


    const validateForm = (name) => {
        switch(name){
            case 'username' : setErrors({
                                ...errors,
                                [name]:formData[name].length < 4 || formData[name].trim() == '' ? '* Username must be at least 4 characters long!' : ''

                            });
                            break;
            case 'password' : setErrors({
                                ...errors,
                                [name]:formData[name].length < 5 || formData[name].trim() == '' ? '* password must be at least 5 characters long!' : ''
                            })
                            break;

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = Object.entries(errors).every(error => error == '' && username && password);
        if(!isFormValid){
            toast.error('Enter All Fields!')
        }else{
            
        }
    }

    return (
        <div className={style.admin_page}>
        <div className={style.container}>
            <h1 className={style.admin_login_h1}>Admin Login</h1>

            <form className={style.admin_login_form} onSubmit={handleSubmit}>

                <label htmlFor="username">Username</label>
                <input className={errors.username == '' ? style.admin_login_input : style.input_error} type="text" placeholder='Username' value={formData.firstname} name='username' onChange={handleChange} />
                <span className={style.error_message}>{errors.username}</span>

                <label htmlFor="password">Password</label>
                <input className={errors.password == '' ? style.admin_login_input : style.input_error} type="text" placeholder='Password' value={formData.password} name='password' onChange={handleChange}  />
                <span className={style.error_message}>{errors.password}</span>


                <button className={style.admin_login_btn}>Login</button>
            </form>

        </div>
        </div>
    )
}

export default AdminLogin;
