import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHostVans } from "../../api";
import type { Van, VanFromAPI } from "../../types/van";
import { assertVanType } from "../../types/van";

interface HostVanError {
    message: string;
}

const HostVans: React.FC = () => {
    const [vans, setVans] = useState<Van[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<HostVanError | null>(null);

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getHostVans() as VanFromAPI[];
                const validatedVans = data.map(van => {
                    assertVanType(van.type);
                    return van as Van;
                });
                setVans(validatedVans);
            } catch (err) {
                setError(err as HostVanError);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, []);

    const hostVansEls = vans.map(van => (
        <Link
            to={van.id}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single">
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ));

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {vans.length > 0 ? (
                    <section>
                        {hostVansEls}
                    </section>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        </section>
    );
};

export default HostVans; 