import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function InputPassword({
	disableValidator = false,
	repassword = false,
	selector,
	repasswordSelector,
	actionUpdate,
	...params
}) {
	const { value, helperText } = useSelector(selector);
	const dispatch = useDispatch();
	function createPayload(value, helperText) {
		return actionUpdate({
			password: { value, helperText },
		});
	}
	const fieldRef = useRef(null);
	const handleTyping = (e) => {
		!disableValidator && e.target.value
			? e.target.value.match(
					/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g
			  )
				? dispatch(createPayload(e.target.value, ''))
				: dispatch(
						createPayload(
							e.target.value,
							'Password must be at least 8 characters, include at least 1 special, 1 lowercase, 1 uppercase'
						)
				  )
			: dispatch(createPayload(e.target.value, helperText));
	};

	return (
		<>
			<TextField
				label='Password'
				required
				helperText={helperText}
				error={Boolean(helperText)}
				inputRef={fieldRef}
				value={value}
				onChange={handleTyping}
				type='password'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							{helperText && (
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
							)}
						</InputAdornment>
					),
				}}
				{...params}
			/>
			{repassword && (
				<InputRepassword
					password={value}
					selector={repasswordSelector}
					actionUpdate={actionUpdate}
					{...params}
				/>
			)}
		</>
	);
}

function InputRepassword({ password, selector, actionUpdate, ...params }) {
	const { helperText } = useSelector(selector);
	const dispatch = useDispatch();
	function createPayload(value, helperText) {
		return actionUpdate({
			repassword: { value, helperText },
		});
	}
	const handleTyping = (e) => {
		password && e.target.value !== password
			? dispatch(createPayload(e.target.value, 'Password not match'))
			: dispatch(createPayload(e.target.value, ''));
	};
	return (
		<TextField
			label='Re-password'
			required
			helperText={helperText}
			error={Boolean(helperText)}
			onBlur={handleTyping}
			type='password'
			{...params}
		/>
	);
}
