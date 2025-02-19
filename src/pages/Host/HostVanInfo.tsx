import React, { type JSX } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { Van } from '../../types/van';

interface HostVanContextType {
    currentVan: Van;
}

const HostVanInfo: React.FC = (): JSX.Element => {
    const { currentVan } = useOutletContext<HostVanContextType>();
    
    return (
        <section className="host-van-detail-info">
            <h4>Name: <span>{currentVan.name}</span></h4>
            <h4>Category: <span>{currentVan.type}</span></h4>
            <h4>Description: <span>{currentVan.description}</span></h4>
            <h4>Visibility: <span>Public</span></h4>
        </section>
    );
};

export default HostVanInfo; 