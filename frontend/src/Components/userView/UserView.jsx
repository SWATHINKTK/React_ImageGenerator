import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaUserEdit } from "react-icons/fa";

import style from './userview.module.css';

const UserView = () => {

    // const [modalIsOpen, setIsOpen] = useState(false);

    // const closeModal = () => {
    //     setIsOpen(false);
    // }
    
    // const openModal = () => {
    //     setIsOpen(true);
    // }

    return (
       
        <div className={style.user_page}>
             {/* <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            />     */}
            <h1 className={style.heading}>Users</h1>
            <div class={style.user_table}>
                <table className={style.table}>
                    <thead className={style.table_row_heading}>
                        <tr>
                            <th scope="col" className={style.table_heading}>
                                #
                            </th>
                            <th scope="col" className={style.table_heading}>
                                Firstname
                            </th>
                            <th scope="col" className={style.table_heading}>
                                Lastname
                            </th>
                            <th scope="col" className={style.table_heading}>
                                Profile
                            </th>
                            <th scope="col" className={style.table_heading}>
                                Email
                            </th>
                            <th scope="col" className={style.table_heading}>
                                Phone Number
                            </th>
                            <th scope="col" className={style.table_heading}>
                                Delete
                            </th>
                            <th scope="col" className={style.table_heading}>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody className={style.table_body}>
                        <tr className={style.table_row_data}>
                            <td className={style.table_data}>
                                1
                            </td>
                            <th scope="row" className={style.table_data_username}>
                                Swathin
                            </th>
                            <th scope="row" className={style.table_data_username}>
                                K T K
                            </th>
                            <td className={`${style.table_data}`}>
                                <a href="">
                                    <div className={style.profile_img}>
                                    </div>
                                </a>
                            </td>
                            <td className={style.table_data}>
                                swathinktk@gmail.com
                            </td>
                            <td className={style.table_data}>
                                7994546435
                            </td>
                            <td className={style.table_data}>
                                <div className="group relative">
                                    <button>
                                        Delete 
                                    </button>
                                    <span className={`absolute -top-10 left-[50%] -translate-x-[50%] 
                                    z-20 origin-left scale-0 px-3 rounded-lg border 
                                    border-gray-300 bg-white py-2 text-sm font-bold
                                    shadow-md transition-all duration-300 ease-in-out 
                                    group-hover:scale-100 cursor-pointer`}>Delete<span>
                                    </span></span>
                                </div>
                            </td>
                            <td className={style.table_data}>
                                <button className={style.edit_btn}>
                                    <FaUserEdit size={26} className='text-blue-600' />
                                </button>
                            </td>
                        </tr>   
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserView
