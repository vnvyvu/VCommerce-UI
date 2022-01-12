import { Avatar } from '@mui/material';

export function items(isAuth, { _id, name, avatar }) {
	return [
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
			icon: <i className='far fa-briefcase'></i>,
			text: 'Contact',
			to: '/contact',
		},
		{
			key: 'about',
			icon: <i className='far fa-users'></i>,
			text: 'About',
			to: '/about',
		},
	].concat(
		!isAuth
			? [
					{
						key: 'register',
						icon: <i className='far fa-pen-square'></i>,
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
			  ]
			: [
					{
						key: 'user',
						icon: (
							<Avatar
								alt='avatar'
								src={avatar}
								sx={{
									width: '2rem',
									height: '2rem',
								}}
							/>
						),
						isUserItem: true,
						sx: {
							mt: 'auto',
						},
						text: name,
					},
			  ]
	);
}

export function userItems({ _id }) {
	return [
		{
			key: 'profile',
			icon: <i className='far fa-file-user'></i>,
			text: 'Profile',
			to: '/user/' + _id,
			sx: {
				fontSize: '0.9em',
			},
		},
		{
			key: 'setting',
			icon: <i className='far fa-cog'></i>,
			text: 'Setting',
			to: '/setting',
			sx: {
				fontSize: '0.9em',
			},
		},
		{
			key: 'logout',
			icon: <i className='far fa-sign-out'></i>,
			text: 'Logout',
			to: '/logout',
			sx: {
				fontSize: '0.9em',
			},
		},
	];
}
