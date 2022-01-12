import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { usersSelector } from '../../features/users/users.selector';
import { usersActions } from '../../features/users/users.slice';

export function Store() {
	/**
	 * Nếu người dùng đã được chuyển hướng từ trang Login
	 * sẽ hiển thị thông báo Login thành công
	 */
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
		let worker;
		if (isRedirectFromLogin)
			worker = setTimeout(
				() => setIsRedirectFromLogin((prev) => !prev),
				3000
			);
		return () => {
			clearTimeout(worker);
		};
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
