import React, { useEffect, useState } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { usersDataUpdate } from '../../features/admin/adminSlice';
import CustomModal from '../Modal/CustomModal';
import EditUser from '../editUser/EditUser';
import style from './userview.module.css';
import UserRegisterAdmin from '../AddUserAdmin/AddUser';


const UserView = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.admin.users);

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [ userToEdit, setUserToEdit] = useState(false);

    const [ addUserModal , setAddUserModal ] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('/api/api/admin/usersdetails');
            dispatch(usersDataUpdate(response.data.usersDetails))
        }
        fetchData();
    },[]);

    


    const deleteUser = async(userId) => {
       try {
            // const response = await axios.delete(`/api/api/admin/deleteuser?userId=${userId}`);
            // const data = response.data;
            // toast.success(response.data.message)
            // dispatch(usersDataUpdate(response.data.users))
       } catch (error) {
            toast.error(error.response.data.message);
       }

    }


    const editUser = async(user) => {
        setEditModalIsOpen(true);
        setUserToEdit(user);
    }


    return (
        
       
        <div className={style.user_page}>

            <CustomModal modalIsOpen={editModalIsOpen} setIsOpen={setEditModalIsOpen}>
                <h1 className='tracking-wider font-bold text-xl py-3'>Edit User Details</h1>
                <EditUser user={userToEdit} setIsOpen={setEditModalIsOpen} />
            </CustomModal>

            <div className='flex justify-between place-items-center'>
                <h1 className={style.heading}>Users</h1>
                <button onClick={() => setAddUserModal(true)} className='tracking-wider font-[600] py-0 bg-slate-300 hover:bg-slate-500 hover:text-white h-8 px-2 rounded'>Add User</button>
                <CustomModal modalIsOpen={addUserModal} setIsOpen={setAddUserModal}>
                    <UserRegisterAdmin setIsOpen={setAddUserModal} />
                </CustomModal>
            </div>

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
                        {
                            users.map((user, i )=> (
                                <tr className={style.table_row_data} key={i}>
                                    <td className={style.table_data}>
                                        {i + 1}
                                    </td>
                                    <th scope="row" className={style.table_data_username}>
                                        {user.firstname}
                                    </th>
                                    <th scope="row" className={style.table_data_username}>
                                        {user.lastname}
                                    </th>
                                    <td className={`${style.table_data}`}>
                                        <a href="">
                                            <div className={style.profile_img} style={{backgroundImage:`url("http://localhost:5000/images/${user.profile}")`}}>
                                            </div>
                                        </a>
                                    </td>
                                    <td className={style.table_data}>
                                        {user.email}
                                    </td>
                                    <td className={style.table_data}>
                                        {user.phoneNumber}
                                    </td>
                                    <td className={style.table_data} onClick={() => deleteUser(user._id)}>
                                        <button className={style.block_btn}>
                                            Delete
                                        </button>
                                    </td>
                                    <td className={style.table_data}>
                                        <button className={style.edit_btn} onClick={() => editUser(user)}>
                                            <FaUserEdit size={26} className='text-blue-600' />
                                        </button>
                                    </td>
                                </tr> 
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserView
