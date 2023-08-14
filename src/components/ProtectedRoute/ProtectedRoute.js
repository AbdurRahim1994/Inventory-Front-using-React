import React from 'react';
import { GetToken } from '../../helpers/SessionHelper'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = GetToken();
    return (
        token ? <Outlet></Outlet> : <Navigate to='/'></Navigate>
    );
};

export default ProtectedRoute;