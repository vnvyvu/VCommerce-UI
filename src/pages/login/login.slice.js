import { createSlice } from '@reduxjs/toolkit';
import { merge } from 'lodash';

export const loginSlice = createSlice({
	name: 'login',
	initialState: {
		email: {
			value: '',
			helperText: '',
		},
		password: {
			value: '',
			helperText: '',
		},
		remember: {
			value: false,
		},
	},
	reducers: {
		update: (state, action) => {
			state = merge(state, action.payload);
		},
	},
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
