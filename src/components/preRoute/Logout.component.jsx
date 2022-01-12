import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { userActions } from '../../features/user/user.slice';

export function Logout() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(userActions.logout());
	}, [dispatch]);
	return <Navigate to='/home' />;
}
