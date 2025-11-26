import React, {useState, useEffect} from 'react'
export default function Mobile() {
    const breakpoint = 1000;
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);
    return isMobile;
}