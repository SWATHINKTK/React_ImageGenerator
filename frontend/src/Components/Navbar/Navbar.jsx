import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { deleteUserData } from '../../features/user/useSlice';
import { adminRemove } from '../../features/admin/adminSlice';
import './navbar.css';




const Navbar = () => {

    const [ profileToggle, setProfileToggle ] = useState(true);

    const { user } = useSelector( (state) => state.user);
    const { admin } = useSelector((state) => state.admin)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const handleToggler = () =>{
        setProfileToggle(!profileToggle );
    }

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


    const adminLogout = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/api/admin/logout');
            const data = response.data;
            localStorage.removeItem('adminAuth');
            dispatch(adminRemove());
            navigate('/admin/login');
        } catch (error) {
            localStorage.removeItem('adminAuth');
            dispatch(adminRemove());
            navigate('/admin/login');

        }
    }
    
    return (
        <div>
            <nav className="bg-white border-gray-200 navbar">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../../public/images/icon.png" className="h-10" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">{ admin ? 'Admin' : 'User' }</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button onClick={handleToggler} className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/public/images/profile.png" alt="user photo" />
                        </button>
                        <div style={{display:profileToggle ? 'none' : ''}} className="z-50 absolute top-10 md:right-16 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            {
                                !admin && 
                                <div className="px-4 py-3"> 
                                    <span className="block text-sm text-gray-900 dark:text-white">{user && user.firstname} { user && user.lastname}</span>
                                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{ user && user.email}</span>
                                </div>
                            }
                            
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                {
                                    !admin && 
                                    <li onClick={() => navigate('/profile')}>
                                        <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            <svg className="w-6 h-6 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                            Profile
                                        </a>
                                    </li>
                                }
                                <li onClick={admin ? adminLogout :handleLogout}>
                                    <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        <svg className="w-6 h-6 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
                                        </svg>
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
