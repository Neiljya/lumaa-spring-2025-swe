import { useEffect, useRef } from 'react';
import { Authorization } from './Authorization';

const AuthorizationComponent: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            new Authorization(containerRef.current);
        }
    }, []);

    return <div ref={containerRef}></div>;
};

export default AuthorizationComponent;
