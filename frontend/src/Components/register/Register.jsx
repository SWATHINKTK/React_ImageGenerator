import React from 'react';
import style from './register.module.css';

const Register = () => {
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
                <form action="" className={style.register_form}>
                  <label htmlFor="username">Username</label>
                  <input type="text" placeholder='username'/>
                  <span className={style.error_message}></span>

                  <label htmlFor="phonenumber">Phone Number</label>
                  <input type="text" placeholder='phone number'/>
                  <span className={style.error_message}></span>

                  <label htmlFor="email">email</label>
                  <input type="text" placeholder='email'/>
                  <span className={style.error_message}></span>

                  <label htmlFor="password" >Password</label>
                  <input type="text"  placeholder='password' />
                  <span className={style.error_message}></span>

                  <label htmlFor="confirm-password" >Confirm Password</label>
                  <input type="text"  placeholder='confirm password' />
                  <span className={style.error_message}></span>

                  <button className={style.register_btn}>Register</button>
                </form>
                
            </div>
      </div>
    </div>
  )
}

export default Register;
