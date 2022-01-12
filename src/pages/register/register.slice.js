import { createSlice } from '@reduxjs/toolkit';
import { defaultReducers } from '../../redux/defaultReducers';

const initialState = {
	gender: 'Mr',
	name: {
		value: '',
		helperText: '',
	},
	email: {
		value: '',
		helperText: '',
	},
	password: {
		value: '',
		helperText: '',
	},
	repassword: {
		value: '',
		helperText: '',
	},
};

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		...defaultReducers(initialState),
	},
});

export const registerActions = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
