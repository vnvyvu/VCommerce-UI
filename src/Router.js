import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SideMenu } from './components/menu/SideMenu.component';
import Home from './pages/home/Home.page';
import Login from './pages/login/Login.page';
import Register from './pages/register/Register.page';

const theme = createTheme();

function Router() {
    const [drawer, setDrawer] = useState(
        JSON.parse(localStorage.getItem("drawer")) ||
        { width: 64, open: false }
    )
    const handleControlDrawer = useCallback(
        (open) => {
            let newDrawer = open ?
                { width: 192, open: true } :
                { width: 64, open: false }
            setDrawer(newDrawer);
            localStorage.setItem("drawer", JSON.stringify(newDrawer))
        }, []
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <BrowserRouter>
                <SideMenu
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
                    open={drawer.open}
                    onControlDrawer={handleControlDrawer}
                />
                <Routes>
                    <Route
                        path="/"
                        element={<Home drawerWidth={drawer.width} />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default Router;
