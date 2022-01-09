import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function InputEmail({ selector, actionUpdate, ...params }) {
	const { value, helperText } = useSelector(selector);
	const dispatch = useDispatch();
	const fieldRef = useRef(null);
	function createPayload(value, helperText) {
		return actionUpdate({
			email: { value, helperText },
		});
	}
	const handleTyped = (e) => {
		e.target.value
			? e.target.value.match(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi)
				? dispatch(createPayload(e.target.value, ''))
				: dispatch(createPayload(e.target.value, 'Wrong format'))
			: dispatch(createPayload(e.target.value, helperText));
	};
	return (
		<TextField
			label='Email'
			required
			helperText={helperText}
			error={Boolean(helperText)}
			inputRef={fieldRef}
			value={value}
			onChange={handleTyped}
			InputProps={{
				endAdornment: helperText && (
					<InputAdornment position='end'>
						<IconButton
							size='small'
							sx={{
								color: 'error.light',
							}}
							onClick={() => {
								fieldRef.current.focus();
								dispatch(createPayload('', ''));
							}}
							edge='end'
						>
							<i className='far fa-times-circle'></i>
						</IconButton>
					</InputAdornment>
				),
			}}
			{...params}
		/>
	);
}
