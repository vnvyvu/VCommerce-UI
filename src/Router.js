import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SideBar } from './components/menu/SideBar.component';
import { Auth } from './components/preRoute/Auth.component';
import { Logout } from './components/preRoute/Logout.component';
import Home from './pages/home/Home.page';
import Login from './pages/login/Login.page';
import Register from './pages/register/Register.page';
import { Store } from './pages/store/Store.page';

/**
 * Tạo đối tượng theme mặc định của MUI
 */
const theme = createTheme();

function Router() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<SideBar />}>
						<Route path='home' element={<Home />} />
						<Route element={<Auth requireUnauth />}>
							<Route path='login' element={<Login />} />
							<Route path='register' element={<Register />} />
						</Route>
						<Route element={<Auth />}>
							<Route path='store' element={<Store />} />
						</Route>
						<Route path='logout' element={<Logout />} />
						<Route index element={<Navigate to='home' />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default Router;
