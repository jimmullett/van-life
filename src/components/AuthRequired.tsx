import React from 'react';
import type { JSX } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/firebase';

interface LocationState {
    message: string;
    from: string;
}

const AuthRequired: React.FC = (): JSX.Element => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
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