
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteWrapper = ({ element, isPrivate, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isPrivate && !isAuthenticated) {
        return <Navigate to="/student" />;
    }


    return React.cloneElement(element, { ...rest });
};

export default RouteWrapper;
