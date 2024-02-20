import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserEdit } from "react-icons/fa";

import { deleteUserData } from '../../features/user/useSlice';
import { userLogout } from '../../api/userAPI';
import style from './profile.module.css';



const UserDetails = ({user,setEditBtn}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async(e) => {
        e.preventDefault();
        try {
            const response = await userLogout();
            if(response.success){
                localStorage.clear();
                dispatch(deleteUserData());
                navigate('/login');
            }
        } catch (error) {
            localStorage.clear();
            dispatch(deleteUserData());
            navigate('/login');
        }       
    }

    
    return (
        <>
            <h1>Profile</h1>
            <div className={style.userData_main_div}>  
                <ul className='font-mono'>
                    <li><span className='w-96   pr-3 font-[500] text-sm text-gray-500'>First Name</span>:<span className='pl-3 font-[500]'>{user.firstname}</span></li>
                    <li><span className='w-96  pr-3 font-[500] text-sm text-gray-500'>Last Name </span>:<span className='pl-3 font-[500]'>{user.lastname}</span></li>
                    <li><span className='w-96  pr-7 font-[500] text-sm text-gray-500'>Phone No</span>:<span className='pl-3 font-[500]'>{user.phoneNumber} </span></li>
                    <li><span className='w-96  pr-11 font-[500] text-sm text-gray-500'>Email </span>:<span className='pl-3 font-[500]'>{user.email}</span></li>
                </ul>
            </div>
            <div className='flex justify-between mt-5 px-2'>
                <button onClick={() => setEditBtn(true)}>
                    <FaUserEdit size={27}/>
                </button>
                <button className="cursor-pointer  duration-200 hover:scale-105 hover:translate-x-3 active:scale-100 flex items-center" onClick={handleLogout} >
                    <span className='mr-1 font-[600] text-red-500'>Logout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="31px" height="31px" viewBox="0 0 24 24" className="stroke-red-500 rotate-180">
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                    </svg>
                </button>
            </div> 
        </>
    )
}

export default UserDetails
