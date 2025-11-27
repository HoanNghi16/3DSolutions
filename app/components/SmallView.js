import React, {useState, useEffect} from 'react'
export default function SmallView() {
    const breakpoint = 1000;
    const [isSmall, setIsSmall] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsSmall(window.innerWidth <= breakpoint);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);
    return isSmall;
}