import { createSlice } from '@reduxjs/toolkit';
import { merge } from 'lodash';

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
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
    },
    reducers: {
        update: (state, action) => {
            state = merge(state, action.payload);
        },
    },
});

export const registerActions = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
