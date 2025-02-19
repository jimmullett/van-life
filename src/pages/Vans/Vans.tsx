import React, { useState, useEffect, type JSX } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVans } from '../../api';
import type { Van, VanFromAPI, VanType } from '../../types/van';
import { assertVanType } from '../../types/van';

interface VanError {
    message: string;
}

const Vans: React.FC = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [vans, setVans] = useState<Van[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<VanError | null>(null);

    const typeFilter = searchParams.get('type') as VanType | null;

    useEffect(() => {
        async function loadVans(): Promise<void> {
            setLoading(true);
            try {
                const data = await getVans() as VanFromAPI[];
                const validatedVans = data.map(van => {
                    assertVanType(van.type);
                    return van as Van;
                });
                setVans(validatedVans);
            } catch (err) {
                setError(err as VanError);
            } finally {
                setLoading(false);
            }
        }

        loadVans();
    }, []);

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans;

    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link
                to={van.id}
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter
                }}
            >
                <img src={van.imageUrl} alt={van.name} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));

    const handleFilterChange = (key: string, value: VanType | null): void => {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        });
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange('type', 'simple')}
                    className={
                        `van-type simple 
                        ${typeFilter === 'simple' ? 'selected' : ''}`
                    }
                >Simple</button>
                <button
                    onClick={() => handleFilterChange('type', 'luxury')}
                    className={
                        `van-type luxury 
                        ${typeFilter === 'luxury' ? 'selected' : ''}`
                    }
                >Luxury</button>
                <button
                    onClick={() => handleFilterChange('type', 'rugged')}
                    className={
                        `van-type rugged 
                        ${typeFilter === 'rugged' ? 'selected' : ''}`
                    }
                >Rugged</button>

                {typeFilter && (
                    <button
                        onClick={() => handleFilterChange('type', null)}
                        className="van-type clear-filters"
                    >Clear filter</button>
                )}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    );
};

export default Vans; 