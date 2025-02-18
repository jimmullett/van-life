import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

interface LocationState {
    message: string;
    from: string;
}

const AuthRequired: React.FC = (): JSX.Element => {
    const isLoggedIn = localStorage.getItem("loggedin");
    const location = useLocation();
    
    if (!isLoggedIn) {
        const state: LocationState = {
            message: "You must log in first",
            from: location.pathname
        };
        
        return (
            <Navigate 
                to="/login" 
                state={state}
                replace
            />
        );
    }
    return <Outlet />;
};

export default AuthRequired; 