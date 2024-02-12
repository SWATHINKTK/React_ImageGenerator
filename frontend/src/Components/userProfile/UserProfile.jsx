import React from 'react';
import { FaUserEdit } from "react-icons/fa";

import style from './userProfile.module.css';

function UserProfile() {
  return (
    <div className={style.main_div}>
      <div className={style.top_part}></div>
      <div className={style.profile_main_container}>
        <div className={style.profile_container}>
            <div className={style.profile_picture}></div>
            <div className={style.profile_name}>
                <h1>Swathin K T K</h1>
                <p>created at 12/04/2003</p>
            </div>
            <div className={style.userDetails}>
                <h1>Profile</h1>
                <div className={style.userData_main_div}>  
                    <ul className='font-mono'>
                        <li><span className='w-96   pr-3 font-[500] text-sm text-gray-500'>First Name</span>:<span className='pl-3 font-[500]'>Swathin</span></li>
                        <li><span className='w-96  pr-3 font-[500] text-sm text-gray-500'>Last Name </span>:<span className='pl-3 font-[500]'>K T K </span></li>
                        <li><span className='w-96  pr-7 font-[500] text-sm text-gray-500'>Phone No</span>:<span className='pl-3 font-[500]'>13234567890 </span></li>
                        <li><span className='w-96  pr-11 font-[500] text-sm text-gray-500'>Email </span>:<span className='pl-3 font-[500]'>Swathin K T K </span></li>
                    </ul>
                </div>
                <div className='flex justify-between mt-5 px-2'>
                    <button>
                        <FaUserEdit size={27}/>
                    </button>
                    <button className="cursor-pointer  duration-200 hover:scale-105 hover:translate-x-3 active:scale-100 flex items-center" >
                        <span className='mr-1 font-[600] text-red-500'>Logout</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="31px" height="31px" viewBox="0 0 24 24" className="stroke-red-500 rotate-180">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default UserProfile
