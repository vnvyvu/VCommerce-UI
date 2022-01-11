import LoadingButton from '@mui/lab/LoadingButton';
import {
	Alert,
	Checkbox,
	FormControlLabel,
	Link,
	Stack,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputEmail } from '../../components/input/InputEmail.component';
import { InputPassword } from '../../components/input/InputPassword.component';
import { FrameMotionBox } from '../../components/motion/Motion.component';
import {
	expiresInSelector,
	loginStatusSelector,
} from '../../features/user/user.selector';
import { userActions } from '../../features/user/user.slice';
import {
	loginEmailSelector,
	loginPasswordSelector,
	loginRememberSelector,
	loginSelector,
} from './login.selector';
import { loginActions } from './login.slice';

function Login() {
	/**
	 * Xóa bỏ state cũ (có thể chứa thông tin đăng nhập trước đó)
	 * khi người dùng truy cập lại trang Login
	 */
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loginActions.reset());
	}, [dispatch]);
	return (
		<FrameMotionBox
			sx={{
				display: 'flex',
				flexFlow: 'row wrap',
				justifyContent: 'center',
				alignContent: 'center',

				height: '100vh',
				p: 5,
				backgroundImage:
					'url(http://localhost:3000/img/register-bg1.jpg)',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				mixBlendMode: 'darken',
				overflowY: 'scroll',
				overflowX: 'hidden',
			}}
		>
			<FrameMotionBox
				sx={{
					display: 'flex',
					flexFlow: 'row wrap',
					justifyContent: 'center',
					alignItems: 'center',
					minWidth: 400,
					backgroundColor: 'background.paper',
					borderRadius: 2,
					boxShadow: 3,
					maxWidth: '40vw',
					height: '75vh',
					p: 6,
				}}
				from={{
					opacity: 0,
				}}
				to={{
					opacity: 1,
				}}
				withoutMotionInView
				component='form'
			>
				<Typography
					variant='h4'
					sx={{
						width: 1,
						fontWeight: 'bold',
					}}
				>
					Login
				</Typography>
				<InputEmail
					fullWidth
					selector={loginEmailSelector}
					actionUpdate={loginActions.update}
				/>
				<InputPassword
					fullWidth
					disableValidator
					selector={loginPasswordSelector}
					actionUpdate={loginActions.update}
				/>
				<Stack
					direction='row'
					justifyContent='space-between'
					sx={{
						flexBasis: '100%',
						margin: 'auto 0',
					}}
				>
					<InputRemember />
					<Link
						href='#'
						sx={{
							fontSize: '0.9rem',
							display: 'inline-flex',
							alignItems: 'center',
							lineHeight: 'normal',
							textAlign: 'center',
						}}
					>
						I forgot my password
					</Link>
				</Stack>
				<ButtonLogin />
			</FrameMotionBox>
		</FrameMotionBox>
	);
}

function ButtonLogin() {
	const expiresIn = useSelector(expiresInSelector);
	const { loginStatus, errorMsg } = useSelector(loginStatusSelector);
	const { email, password } = useSelector(loginSelector);
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email.value && password.value)
			dispatch(
				userActions.login({
					email: email.value,
					password: password.value,
				})
			);
		else
			dispatch(
				loginActions.update({
					email: {
						helperText: email.value ? '' : 'This field is required',
					},
					password: {
						helperText: password.value
							? ''
							: 'This field is required',
					},
				})
			);
	};
	const { state, ...location } = useLocation();
	const navigate = useNavigate();
	/**
	 * Sau khi login thì người dùng sẽ được chuyển hướng về trang trước đó
	 * mà họ truy cập (bằng cách truyền state từ trang trước đó về trang này).
	 * Nếu không tồn tại trang trước đó thì chuyển hướng về trang chủ
	 */
	useEffect(() => {
		if (expiresIn > Date.now()) {
			state && state.from
				? navigate(state.from, { state: { from: location } })
				: navigate('../home');
		}
	}, [navigate, state, location, expiresIn, dispatch]);
	return (
		<>
			<LoadingButton
				type='button'
				variant='contained'
				loading={loginStatus === 'pending'}
				loadingPosition='start'
				startIcon={<i className='far fa-rocket-launch'></i>}
				sx={{
					height: '2rem',
					px: 10,
					py: 2.5,
					lineHeight: 'normal',
				}}
				onClick={handleSubmit}
			>
				{loginStatus === 'pending' ? 'Authenticating...' : 'Submit'}
			</LoadingButton>
			{loginStatus === 'failed' && (
				<Alert severity='error'>{errorMsg}</Alert>
			)}
		</>
	);
}

function InputRemember() {
	const { value } = useSelector(loginRememberSelector);
	const dispatch = useDispatch();
	const handleCheckRemember = (e) => {
		dispatch(
			loginActions.update({ remember: { value: e.target.checked } })
		);
	};
	return (
		<FormControlLabel
			control={<Checkbox onChange={handleCheckRemember} value={value} />}
			label={
				<Typography
					component='span'
					variant='body2'
					sx={{ lineHeight: 'normal' }}
				>
					Remember
				</Typography>
			}
		/>
	);
}

export default Login;
