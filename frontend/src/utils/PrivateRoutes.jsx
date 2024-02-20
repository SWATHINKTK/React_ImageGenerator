import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const {user} = useSelector( (state) => state.user);
    console.log(user)
  return (
    user ? <Outlet/> : <Navigate to='/login' replace/>
  )
}

export default PrivateRoutes
