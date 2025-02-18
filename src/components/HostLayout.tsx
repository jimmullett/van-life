import React, { CSSProperties } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const HostLayout: React.FC = (): JSX.Element => {
    const activeStyles: CSSProperties = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    };

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    to="."
                    end
                    style={({ isActive }): CSSProperties | undefined => isActive ? activeStyles : undefined}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    style={({ isActive }): CSSProperties | undefined => isActive ? activeStyles : undefined}
                >
                    Income
                </NavLink>
                
                <NavLink
                    to="vans"
                    style={({ isActive }): CSSProperties | undefined => isActive ? activeStyles : undefined}
                >
                    Vans
                </NavLink>

                <NavLink
                    to="reviews"
                    style={({ isActive }): CSSProperties | undefined => isActive ? activeStyles : undefined}
                >
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </>
    );
};

export default HostLayout; 