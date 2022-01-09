import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SideMenu } from './components/menu/SideMenu.component';
import { Auth } from './components/preRoute/Auth.component';
import Home from './pages/home/Home.page';
import Login from './pages/login/Login.page';
import Register from './pages/register/Register.page';
import { Store } from './pages/store/Store.page';

const theme = createTheme();

function Router() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<SideMenu
								items={[
									{
										key: 'home',
										icon: <i className='far fa-home'></i>,
										text: 'Home',
										to: '/',
									},
									{
										key: 'store',
										icon: <i className='far fa-store'></i>,
										text: 'Store',
										to: '/store',
									},
									{
										key: 'contact',
										icon: (
											<i className='far fa-briefcase'></i>
										),
										text: 'Contact',
										to: '/contact',
									},
									{
										key: 'about',
										icon: <i className='far fa-users'></i>,
										text: 'About',
										to: '/about',
									},
									{
										key: 'register',
										icon: (
											<i className='far fa-pen-square'></i>
										),
										text: 'Register',
										sx: {
											mt: 'auto',
										},
										to: '/register',
									},
									{
										key: 'login',
										icon: <i className='far fa-user'></i>,
										text: 'Login',
										to: '/login',
									},
								]}
							/>
						}
					>
						<Route path='home' element={<Home />} />
						<Route element={<Auth requireUnauth />}>
							<Route path='login' element={<Login />} />
						</Route>
						<Route path='register' element={<Register />} />
						<Route element={<Auth />}>
							<Route path='store' element={<Store />} />
						</Route>
						<Route index element={<Navigate to='home' />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default Router;
