import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isUserAuthenticated } from '../../redux/middleware/localState.middleware';

export function Auth({ requireUnauth }) {
	const { state, ...location } = useLocation();
	if (requireUnauth)
		return isUserAuthenticated() ? (
			<Navigate
				to={state ? state.from || 'home' : 'home'}
				state={{ from: location }}
			/>
		) : (
			<Outlet />
		);
	//if expiresIn is exist then user was authenticated else navigte to login page
	return isUserAuthenticated() ? (
		<Outlet />
	) : (
		<Navigate to='login' state={{ from: location }} />
	);
}
