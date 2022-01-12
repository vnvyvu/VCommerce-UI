import {
	Collapse,
	Drawer as MuiDrawer,
	drawerClasses,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip as MuiTooltip,
	tooltipClasses,
} from '@mui/material';
import { styled } from '@mui/system';
import {
	AnimatePresence,
	AnimateSharedLayout,
	motion,
	useAnimation,
} from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { idSelector, userSelector } from '../../features/user/user.selector';
import { MotionBox, MotionList } from '../motion/Motion.component';
import { items, userItems } from './menuItems';

const Tooltip = styled(
	({ className, ...props }) => (
		<MuiTooltip {...props} classes={{ popper: className }} />
	),
	{ shouldForwardProp: () => true }
)(() => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: 'rgba(0, 0, 0, 0.5)',
	},
}));

function SideBarTop({ src, open, ...params }) {
	return (
		<AnimatePresence
			style={{
				width: '100%',
			}}
			{...params}
		>
			<MotionBox
				key={open}
				transition={{ duration: 0 }}
				initial={{ display: 'none', opacity: 0 }}
				animate={{
					display: 'block',
					opacity: 1,
					transition: { duration: 1 },
				}}
				exit={{ display: 'none' }}
				component='img'
				src={src}
				alt='logo'
			/>
		</AnimatePresence>
	);
}

function SideBarItems({ open }) {
	const data = useSelector(userSelector);
	/*const user = JSON.parse(localStorage.getItem('user'));
	const data = {
		_id: localStorage.getItem('_id'),
		name: user?.name,
		avatar: user?.avatar,
	};*/
	return (
		<MotionList
			layout
			sx={{
				height: 1,
				overflowY: 'scroll',
				display: 'flex',
				flexFlow: 'column',
			}}
		>
			{items(data._id, data).map(({ key, isUserItem, ...props }) =>
				isUserItem ? (
					<SideBarUserItem key={key} {...props} open={open} />
				) : (
					<SideBarItem key={key} {...props} open={open} />
				)
			)}
		</MotionList>
	);
}

function SideBarItem({ icon, text, sx, to, open }) {
	return (
		<>
			<Tooltip title={text} placement='right' arrow>
				<ListItem
					disablePadding
					sx={{ width: 1, height: '3rem', ...sx }}
				>
					<ListItemButton
						disableGutters
						component={to ? Link : 'div'}
						sx={open ? {} : { justifyContent: 'center' }}
						to={to}
					>
						<ListItemIcon
							sx={{
								justifyContent: 'center',
								fontSize: '1.1em',
							}}
						>
							{icon}
						</ListItemIcon>
						{open && (
							<ListItemText
								disableTypography
								sx={{ lineHeight: 'normal' }}
							>
								{text}
							</ListItemText>
						)}
					</ListItemButton>
				</ListItem>
			</Tooltip>
		</>
	);
}

function SideBarUserItem({ icon, text, sx, to, open }) {
	const [expand, setExpand] = useState(false);
	const _id = useSelector(idSelector);
	function handleClick(e) {
		setExpand((prev) => !prev);
	}
	return (
		<>
			<Tooltip title={text} placement='right' arrow>
				<ListItem
					disablePadding
					sx={{ width: 1, height: '3rem', ...sx }}
				>
					<ListItemButton
						disableGutters
						component='div'
						onClick={handleClick}
						sx={open ? {} : { justifyContent: 'center' }}
					>
						<ListItemIcon
							sx={{
								justifyContent: 'center',
								fontSize: '1.1rem',
							}}
						>
							{icon}
						</ListItemIcon>
						{open && (
							<ListItemText
								disableTypography
								sx={{ lineHeight: 'normal' }}
							>
								{text}
							</ListItemText>
						)}
						{open && (
							<i
								className={
									'fal fa-angle-' + (expand ? 'down' : 'up')
								}
								style={{
									marginRight: '0.75rem',
								}}
							></i>
						)}
					</ListItemButton>
				</ListItem>
			</Tooltip>
			<Collapse in={expand} timeout='auto' unmountOnExit>
				{userItems(_id).map(({ key, ...props }) => (
					<SideBarItem key={key} {...props} open={open} />
				))}
			</Collapse>
		</>
	);
}

function SideBarController({ open, onClick, ...params }) {
	return (
		<IconButton
			onClick={onClick}
			sx={{ mt: 'auto', borderRadius: 0, fontSize: '1rem' }}
			arial-label='control button'
			{...params}
		>
			<i
				className={
					'fad fa-angle-double-right' + (open ? ' fa-rotate-180' : '')
				}
			></i>
		</IconButton>
	);
}

const openState = (theme) => ({
	width: theme.spacing(24),
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});
const closeState = (theme) => ({
	width: theme.spacing(8),
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) =>
	open
		? {
				...openState(theme),
				'& .MuiDrawer-paper': openState(theme),
		  }
		: {
				...closeState(theme),
				'& .MuiDrawer-paper': closeState(theme),
		  }
);

export const SideBar = () => {
	const [open, setOpen] = useState(
		JSON.parse(localStorage.getItem('drawer')) || false
	);
	const controls = useAnimation();
	const marginLeft = useRef(open ? 192 : 64);
	const handleControlDrawer = useCallback(() => {
		setOpen((state) => {
			controls.start({
				marginLeft: (state ? 64 : 192) + 'px',
			});
			localStorage.setItem('drawer', !state);
			return !state;
		});
	}, [controls]);
	return (
		<AnimateSharedLayout>
			<MotionBox layout>
				<Drawer
					open={open}
					variant='permanent'
					sx={{
						['& .' + drawerClasses.paper]: {
							borderRight: 'none',
						},
					}}
				>
					<SideBarTop
						src={
							process.env.PUBLIC_URL +
							(open ? '/logo.png' : '/favicon.png')
						}
						open={open}
					/>
					<SideBarItems open={open} />

					<SideBarController
						onClick={handleControlDrawer}
						open={open}
					/>
				</Drawer>
			</MotionBox>
			<motion.div
				initial={{ marginLeft: marginLeft.current + 'px' }}
				animate={controls}
				layout
			>
				<Outlet />
			</motion.div>
		</AnimateSharedLayout>
	);
};
