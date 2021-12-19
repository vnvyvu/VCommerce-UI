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
                    items={[
                        {
                            key: "home",
                            icon: <i className="far fa-home"></i>,
                            text: "Home",
                            to: '/'
                        },
                        {
                            key: "store",
                            icon: <i className="far fa-store"></i>,
                            text: "Store",
                            to: '/store'
                        },
                        {
                            key: "contact",
                            icon: <i className="far fa-briefcase"></i>,
                            text: "Contact",
                            to: '/contact'
                        },
                        {
                            key: "about",
                            icon: <i className="far fa-users"></i>,
                            text: "About",
                            to: '/about'
                        },
                        {
                            key: "register",
                            icon: <i className="far fa-pen-square"></i>,
                            text: "Register",
                            sx: {
                                mt: 'auto'
                            },
                            to: '/register'
                        },
                        {
                            key: "login",
                            icon: <i className="far fa-user"></i>,
                            text: "Login",
                            to: '/login'
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
                        element={<Login drawerWidth={drawer.width} />}
                    />
                    <Route
                        path="/register"
                        element={<Register drawerWidth={drawer.width} drawerOpen={drawer.open} />}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default Router;
