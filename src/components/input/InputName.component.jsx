import {
	IconButton,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function InputName({ selector, actionUpdate, ...params }) {
	const [gender, { helperText }] = useSelector(selector);
	const dispatch = useDispatch();
	const fieldRef = useRef(null);
	function createPayload(value, helperText) {
		return actionUpdate({
			name: { value, helperText },
		});
	}
	const handleTyping = (e) => {
		e.target.value
			? e.target.value.match(/\w+( \w+)+$/)
				? dispatch(createPayload(e.target.value, ''))
				: dispatch(
						createPayload(
							e.target.value,
							'Please enter your full name'
						)
				  )
			: dispatch(createPayload(e.target.value, helperText));
	};
	return (
		<TextField
			label='Full name'
			required
			helperText={helperText}
			error={Boolean(helperText)}
			inputRef={fieldRef}
			onBlur={handleTyping}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<Select
							value={gender}
							onChange={(e) => {
								dispatch(
									actionUpdate({ gender: e.target.value })
								);
							}}
							variant='standard'
							disableUnderline
						>
							<MenuItem value='Mr'>Mr.</MenuItem>
							<MenuItem value='Ms'>Ms.</MenuItem>
						</Select>
					</InputAdornment>
				),
				endAdornment: helperText && (
					<InputAdornment position='end'>
						<IconButton
							size='small'
							sx={{
								color: 'error.light',
							}}
							onClick={() => {
								fieldRef.current.value = '';
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
