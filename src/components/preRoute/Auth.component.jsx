import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function Auth({ requireUnauth }) {
	const location = useLocation();
	if (requireUnauth)
		return localStorage.getItem('expiresIn') ? (
			<Navigate to='home' />
		) : (
			<Outlet />
		);
	//if expiresIn is exist then user was authenticated else navigte to login page
	return localStorage.getItem('expiresIn') ? (
		<Outlet />
	) : (
		<Navigate to='login' state={{ from: location }} />
	);
}
