import React from 'react';
import style from './userview.module.css';

function UserView() {
  return (
    <div>
      <table className={style.user_table}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Profile</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Status</th>
                    <th>Block / Unblock</th>
                </tr>
            </thead>

      </table>
    </div>
  )
}

export default UserView
