import { Box, createTheme, ScopedCssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Progress } from '../../components/progress/Progress.component';
import First from './First.page';
import Four from './Four.page';
import Second from './Second.page';
import Third from './Third.page';

const dark = createTheme({ palette: { mode: 'dark' } });
const light = createTheme({ palette: { mode: 'light' } });

function Home({ drawerWidth }) {
    return (
        <Box
            sx={{
                ml: drawerWidth + "px",
                transition: "all 0.2s",
            }}
        >
            <Progress />
            <ScopedThemeProvider theme={dark}>
                <First />
            </ScopedThemeProvider>
            <ScopedThemeProvider theme={light}>
                <Second />
            </ScopedThemeProvider>
            <ScopedThemeProvider theme={light}>
                <Third />
            </ScopedThemeProvider>
            <ScopedThemeProvider theme={dark}>
                <Four />
            </ScopedThemeProvider>
        </Box >
    );
}

function ScopedThemeProvider({ theme, children }) {
    return (
        <ThemeProvider theme={theme}>
            <ScopedCssBaseline>
                {children}
            </ScopedCssBaseline>
        </ThemeProvider>
    );
}

export default Home;