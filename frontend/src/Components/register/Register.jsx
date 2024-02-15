import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import validateRegister from './validateRegister';
import style from './register.module.css';

const INTIAL_STATE = {
    firstname:'',
    lastname:'',
    email:'',
    phoneNumber:'',
    password:''
}

const Register = () => {

    const [ registerData, setRegisterData ] = useState(INTIAL_STATE);
    const [ errors, setErrors ] = useState(INTIAL_STATE);

    const { firstname, lastname, email, phoneNumber, password } = registerData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]:value
        });
        validateRegister(name, value, errors, setErrors)
    }


    const handleRegister = async(e) => {
        e.preventDefault();

        const { firstname, lastname, email, phoneNumber, password } = registerData;

        const isFormValid = Object.values(errors).every(error => error == '' && firstname && lastname && email && phoneNumber && password);
        
        if(!isFormValid){
            toast.error('Enter All Fields to Register !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
    }
    

    return (
        <div className={style.register_page}>
        <div className={style.container}>
                <div className={style.left_container}>
                <img src="../../public/Images/BG2.avif" alt="" />
                </div>
                <div className={style.right_container}>
                    <div>
                    <h2>Register</h2>
                    <p>hey enter your details to create new account ...!</p>
                    </div>
                    <form action="" className={style.register_form} onSubmit={handleRegister}>

                        <label htmlFor="username">Firstname</label>
                        <input className={errors.firstname ? style.register_error_input : style.register_input} type="text" placeholder='username' name='firstname' value={firstname} onChange={handleChange} />
                        <span className={style.error_message}>{errors.firstname}</span>

                        <label htmlFor="username">Lastname</label>
                        <input type="text"  className={errors.lastname ? style.register_error_input : style.register_input} placeholder='username' name='lastname' value={lastname} onChange={handleChange}/>
                        <span className={style.error_message}>{errors.lastname}</span>

                        <label htmlFor="phonenumber">Phone Number</label>
                        <input type="text"  className={errors.phoneNumber ? style.register_error_input : style.register_input} placeholder='phone number' name='phoneNumber' value={phoneNumber} onChange={handleChange}/>
                        <span className={style.error_message}>{errors.phoneNumber}</span>

                        <label htmlFor="email">email</label>
                        <input type="text"  className={errors.email ? style.register_error_input : style.register_input} placeholder='email' name='email' value={email} onChange={handleChange}/>
                        <span className={style.error_message}>{errors.email}</span>

                        <label htmlFor="password" >Password</label>
                        <input type="text"  className={errors.password ? style.register_error_input : style.register_input}  placeholder='password' name='password'value={password} onChange={handleChange} />
                        <span className={style.error_message}>{errors.password}</span>


                        <button className={style.register_btn}>Register</button>
                    </form>
                    
                </div>
                <ToastContainer/>
        </div>
        </div>
    )
}

export default Register;
