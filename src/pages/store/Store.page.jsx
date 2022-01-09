import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { usersSelector } from '../../features/users/users.selector';
import { usersActions } from '../../features/users/users.slice';

export function Store() {
	const { state } = useLocation();
	const [isRedirectFromLogin, setIsRedirectFromLogin] = useState(
		state && state.from.pathname === '/login'
	);
	const { data } = useSelector(usersSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!data.length) dispatch(usersActions.get('u'));
	}, [data, dispatch]);
	useEffect(() => {
		if (isRedirectFromLogin)
			setTimeout(() => setIsRedirectFromLogin((prev) => !prev), 3000);
	}, [isRedirectFromLogin]);
	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={isRedirectFromLogin}
			>
				<Alert severity='success' sx={{ width: '100%' }}>
					Login successful
				</Alert>
			</Snackbar>
			{JSON.stringify(data)}
		</div>
	);
}
