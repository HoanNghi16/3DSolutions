import React, {useState, useEffect} from 'react'
export default function SmallView(breakpoint) {
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