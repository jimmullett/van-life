import React, { useState, useEffect, CSSProperties } from 'react';
import { useParams, Link, NavLink, Outlet } from 'react-router-dom';
import { getVan } from '../../api';
import type { Van, VanFromAPI } from '../../types/van';
import { assertVanType } from '../../types/van';

interface HostVanError {
    message: string;
}

const HostVanDetail: React.FC = (): JSX.Element => {
    const [currentVan, setCurrentVan] = useState<Van | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<HostVanError | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function loadVans(): Promise<void> {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getVan(id) as VanFromAPI;
                assertVanType(data.type);
                setCurrentVan(data as Van);
            } catch (err) {
                setError(err as HostVanError);
            } finally {
                setLoading(false);
            }
        }

        loadVans();
    }, [id]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    const activeStyles: CSSProperties = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    };

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            {currentVan && (
                <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                        <img src={currentVan.imageUrl} alt={currentVan.name} />
                        <div className="host-van-detail-info-text">
                            <i
                                className={`van-type van-type-${currentVan.type}`}
                            >
                                {currentVan.type}
                            </i>
                            <h3>{currentVan.name}</h3>
                            <h4>${currentVan.price}/day</h4>
                        </div>
                    </div>

                    <nav className="host-van-detail-nav">
                        <NavLink
                            to="."
                            end
                            style={({ isActive }): CSSProperties | undefined => 
                                isActive ? activeStyles : undefined}
                        >
                            Details
                        </NavLink>
                        <NavLink
                            to="pricing"
                            style={({ isActive }): CSSProperties | undefined => 
                                isActive ? activeStyles : undefined}
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="photos"
                            style={({ isActive }): CSSProperties | undefined => 
                                isActive ? activeStyles : undefined}
                        >
                            Photos
                        </NavLink>
                    </nav>
                    <Outlet context={{ currentVan }} />
                </div>
            )}
        </section>
    );
};

export default HostVanDetail; 