import React from 'react';
import { useOutletContext } from 'react-router-dom';
import type { Van } from '../../types/van';

interface HostVanContextType {
    currentVan: Van;
}

const HostVanPhotos: React.FC = (): JSX.Element => {
    const { currentVan } = useOutletContext<HostVanContextType>();
    
    return (
        <img 
            src={currentVan.imageUrl} 
            className="host-van-detail-image" 
            alt={`Photo of ${currentVan.name}`}
        />
    );
};

export default HostVanPhotos; 