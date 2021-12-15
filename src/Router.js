import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.page';
import Login from './pages/login/Login.page';
import Register from './pages/register/Register.page';

const theme=createTheme({
    
});

function Router() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home/>}
                        />
                        <Route
                            path="/login"
                            element={<Login/>}
                        />
                        <Route
                            path="/register"
                            element={<Register/>}
                        />
                    </Routes>
                </BrowserRouter>
        </ThemeProvider>
    );
}

export default Router;
