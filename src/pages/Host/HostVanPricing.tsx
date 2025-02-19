import React, { type JSX } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { Van } from '../../types/van';

interface HostVanContextType {
    currentVan: Van;
}

const HostVanPricing: React.FC = (): JSX.Element => {
    const { currentVan } = useOutletContext<HostVanContextType>();
    
    return (
        <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
    );
};

export default HostVanPricing; 