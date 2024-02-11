import React from 'react';
import style from './admin.module.css';

function AdminLogin() {
  return (
    <div className={style.admin_page}>
      <div className={style.container}>
        <h1 className={style.admin_login_h1}>Admin Login</h1>

        <form className={style.admin_login_form}>

            <label htmlFor="username">Username</label>
            <input className={style.admin_login_input} type="text" placeholder='Username' />
            <span className={style.error_message}>error</span>

            <label htmlFor="password">Password</label>
            <input className={style.admin_login_input} type="text" placeholder='Password' />
            <span className={style.error_message}>error</span>


            <button className={style.admin_login_btn}>Login</button>
        </form>

      </div>
    </div>
  )
}

export default AdminLogin
