import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';

const ProtectedAdminRoute = ({ children }) => {

    let { user } = useUserAuth();
    const users = useSelector((state) => state.users.users);

    if (user && users.length > 0) {
        var result = users.find(({ id }) => id === user.uid);
    }

    if (result && result.role !== "admin" || !user) {
        return <Navigate to="/products" />
    }
    return children
};

export default ProtectedAdminRoute;