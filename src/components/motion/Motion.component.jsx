import { Box, Grid, List, ListItem, Stack } from '@mui/material';
import { isValidMotionProp, motion, useAnimation } from 'framer-motion';
import { forwardRef, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export function MotionInView(params) {
	const viewControls = useAnimation();
	const [ref, isInView] = useInView({
		threshold: 0.3,
		initialInView: true,
	});
	const isRunning = useRef(null);
	useEffect(() => {
		if (isRunning.current) clearTimeout(viewControls);
		if (isInView)
			isRunning.current = setTimeout(() => {
				viewControls.start('to').then(() => (isRunning.current = null));
			});
		else
			isRunning.current = setTimeout(() => {
				viewControls
					.start('from')
					.then(() => (isRunning.current = null));
			});
		return () => {
			clearTimeout(isRunning.current);
		};
	}, [viewControls, isInView]);
	return (
		<motion.div
			ref={ref}
			initial='from'
			animate={viewControls}
			{...params}
		/>
	);
}

export function FrameMotionBox({
	from = {},
	to = {},
	transitions = [],
	withoutMotionInView = false,
	...params
}) {
	from = Object.assign(from, { transition: transitions[0] || {} });
	to = Object.assign(to, {
		transition: transitions[1] || transitions[0] || {},
	});
	return (
		<MotionBox
			{...(withoutMotionInView && { initial: 'from', animate: 'to' })}
			variants={{ from, to }}
			{...params}
		/>
	);
}

export const MotionBox = motion(
	forwardRef((props, ref) => <Box ref={ref} {...props} />),
	{ forwardMotionProps: (prop) => isValidMotionProp(prop) }
);

export function FrameMotionStack({
	from = {},
	to = {},
	transitions = [],
	...params
}) {
	from = Object.assign(from, { transition: transitions[0] || {} });
	to = Object.assign(to, {
		transition: transitions[1] || transitions[0] || {},
	});
	return <MotionStack variants={{ from, to }} {...params} />;
}
export const MotionStack = motion(
	forwardRef((props, ref) => <Stack ref={ref} {...props} />),
	{ forwardMotionProps: (prop) => isValidMotionProp(prop) }
);

export function FrameMotionGrid({
	from = {},
	to = {},
	transitions = [],
	...params
}) {
	from = Object.assign(from, { transition: transitions[0] || {} });
	to = Object.assign(to, {
		transition: transitions[1] || transitions[0] || {},
	});
	return <MotionGrid variants={{ from, to }} {...params} />;
}
export const MotionGrid = motion(
	forwardRef((props, ref) => <Grid ref={ref} {...props} />),
	{ forwardMotionProps: (prop) => isValidMotionProp(prop) }
);

export const MotionList = motion(
	forwardRef((props, ref) => <List ref={ref} {...props} />),
	{ forwardMotionProps: (prop) => isValidMotionProp(prop) }
);
export const MotionListItem = motion(
	forwardRef((props, ref) => <ListItem ref={ref} {...props} />),
	{ forwardMotionProps: (prop) => isValidMotionProp(prop) }
);
