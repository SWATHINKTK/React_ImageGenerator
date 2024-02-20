import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import Navbar from '../Components/navbar/Navbar';
import UserView from '../Components/userView/UserView';

const AdminDashBoard = () => {
    const { admin } = useSelector((state) =>  state.admin);
    const navigate = useNavigate();

    useEffect(() => {
        !admin && navigate('/admin/login')
    },[]);

    return (
        <>
            <Navbar />
            <UserView />
        </>
    )
}

export default AdminDashBoard;
