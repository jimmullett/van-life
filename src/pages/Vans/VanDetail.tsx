import React, { useState, useEffect, type JSX } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getVan } from '../../api';
import type { Van, VanFromAPI } from '../../types/van';
import { assertVanType } from '../../types/van';

interface VanError {
    message: string;
}

interface LocationState {
    search?: string;
    type?: string;
}

const VanDetail: React.FC = (): JSX.Element => {
    const [van, setVan] = useState<Van | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<VanError | null>(null);
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as LocationState;

    useEffect(() => {
        async function loadVans(): Promise<void> {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getVan(id) as VanFromAPI;
                assertVanType(data.type);
                setVan(data as Van);
            } catch (err) {
                setError(err as VanError);
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

    const search = state?.search || '';
    const type = state?.type || 'all';
    
    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            
            {van && (
                <div className="van-detail">
                    <img src={van.imageUrl} alt={van.name} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            )}
        </div>
    );
};

export default VanDetail; 