import React, { CSSProperties, type JSX } from 'react';
import { Link, NavLink } from 'react-router-dom';
import imageUrl from '/src/assets/images/avatar-icon.png';

const Header: React.FC = (): JSX.Element => {
    const activeStyles: CSSProperties = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    };

    const fakeLogOut = (): void => {
        localStorage.removeItem('loggedin');
    };

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink
                    to="/host"
                    style={({ isActive }): CSSProperties | undefined => isActive ? activeStyles : undefined}
                >
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }): CSSProperties | undefined => isActive ? activeStyles : undefined}
                >
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    style={({ isActive }): CSSProperties | undefined => isActive ? activeStyles : undefined}
                >
                    Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img
                        src={imageUrl}
                        className="login-icon"
                        alt="Login"
                    />
                </Link>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    );
};

export default Header; 