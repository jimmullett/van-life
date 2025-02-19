import React, { useState, useEffect, type JSX } from 'react';
import { Link } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import { getHostVans } from '../../api';
import type { Van, VanFromAPI } from '../../types/van';
import { assertVanType } from '../../types/van';

interface DashboardError {
    message: string;
}

const Dashboard: React.FC = (): JSX.Element => {
    const [vans, setVans] = useState<Van[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<DashboardError | null>(null);

    useEffect(() => {
        setLoading(true);
        getHostVans()
            .then((data: VanFromAPI[]) => {
                const validatedVans = data.map(van => {
                    assertVanType(van.type);
                    return van as Van;
                });
                setVans(validatedVans);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    const renderVanElements = (vans: Van[]): JSX.Element => {
        const hostVansEls = vans.map((van) => (
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
                <Link to={`vans/${van.id}`}>View</Link>
            </div>
        ));

        return (
            <div className="host-vans-list">
                <section>{hostVansEls}</section>
            </div>
        );
    };

    if (error) {
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                {loading && !vans.length ? (
                    <h1>Loading...</h1>
                ) : (
                    renderVanElements(vans)
                )}
            </section>
        </>
    );
};

export default Dashboard; 