import { useState, useEffect } from 'react';

export default function useBoundingRef(ref: React.RefObject<HTMLElement>) {
    const [boundingRect, setBoundingRect] = useState({x: 0, y: 0});

    const handleScroll = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setBoundingRect({x: rect.x, y: rect.y});
        }
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ref.current]);

    return boundingRect;
}
