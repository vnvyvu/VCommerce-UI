import { Box, createTheme, ScopedCssBaseline, ThemeProvider } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { SideMenu } from '../../components/menu/SideMenu.component';
import { Progress } from '../../components/progress/Progress.component';
import First from './First.page';
import Four from './Four.page';
import Second from './Second.page';
import Third from './Third.page';

const dark = createTheme({ palette: { mode: 'dark' } });
const light = createTheme({ palette: { mode: 'light' } });

function Home() {
    const [leftSpace, setContentMargin] = useState(64);
    const handleMenuCollapsed = useCallback(
        (open) => open ? setContentMargin(192) : setContentMargin(64),
        []
    );
    return (
        <Box>
            <SideMenu
                theme="light"
                items={(navigate) => [
                    {
                        key: "home",
                        icon: <i className="far fa-home"></i>,
                        text: "Home",
                        onClick: () => navigate('/')
                    },
                    {
                        key: "store",
                        icon: <i className="far fa-store"></i>,
                        text: "Store",
                        onClick: () => navigate('/store')
                    },
                    {
                        key: "contact",
                        icon: <i className="far fa-briefcase"></i>,
                        text: "Contact",
                        onClick: () => navigate('/contact')
                    },
                    {
                        key: "about",
                        icon: <i className="far fa-users"></i>,
                        text: "About",
                        onClick: () => navigate('/about')
                    },
                    {
                        key: "register",
                        icon: <i className="far fa-sticky-note"></i>,
                        text: "Register",
                        sx: {
                            mt: 'auto'
                        },
                        onClick: () => navigate('/register')
                    },
                    {
                        key: "login",
                        icon: <i className="far fa-sign-in-alt"></i>,
                        text: "Login",
                        onClick: () => navigate('/login')
                    },
                ]}
                onControlDrawer={handleMenuCollapsed}
            />
            <Box
                sx={{
                    marginLeft: leftSpace + "px",
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
        </Box>
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