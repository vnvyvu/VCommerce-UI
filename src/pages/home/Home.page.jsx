import { createTheme } from '@mui/material';
import React from 'react';
import { MotionBox } from '../../components/motion/Motion.component';
import { Progress } from '../../components/progress/Progress.component';
import { ScopedTheme } from '../../components/theme/ScopedTheme.component';
import First from './First.page';
import Four from './Four.page';
import Second from './Second.page';
import Third from './Third.page';

const dark = createTheme({ palette: { mode: 'dark' } });
const light = createTheme({ palette: { mode: 'light' } });

function Home({ drawerWidth }) {
    return (
        <MotionBox
            sx={{
                ml: drawerWidth + "px",
            }}
            layout
            transition={{
                duration: 0.2,
                type: 'tween'
            }}
        >
            <Progress />
            <ScopedTheme theme={dark}>
                <First />
            </ScopedTheme>
            <ScopedTheme theme={light}>
                <Second />
            </ScopedTheme>
            <ScopedTheme theme={light}>
                <Third />
            </ScopedTheme>
            <ScopedTheme theme={dark}>
                <Four />
            </ScopedTheme>
        </MotionBox >
    );
}

export default Home;