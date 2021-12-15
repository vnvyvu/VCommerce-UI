import { Box, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export function Progress({ ...props }) {
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        function handleScroll() {
            setPercent(window.scrollY * 100 / (document.body.scrollHeight - window.innerHeight))
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    return (
        <Box sx={{ position: 'fixed', width: 1 }}>
            <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                    backgroundColor: 'transparent',
                    height: '3px',
                    '> :first-of-type': {
                        background: 'radial-gradient(circle, #6bd1b5, #3bcbc8, #00c2db, #00b8ea, #44aaf0, #58a8f1, #69a5f1, #78a2f0, #6eacf5, #66b5f8, #61befa, #5fc7fb)'
                    }
                }}
                {...props}
            />
        </Box>
    );
}
