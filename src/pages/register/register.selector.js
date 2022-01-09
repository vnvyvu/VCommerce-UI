import { createSelector } from '@reduxjs/toolkit';

export const registerSelector = (state) => state.register;
export const registerNameSelector = createSelector(
	registerSelector,
	(register) => [register.gender, register.name]
);
export const registerEmailSelector = createSelector(
	registerSelector,
	(register) => register.email
);
export const registerPasswordSelector = createSelector(
	registerSelector,
	(register) => register.password
);
export const registerRepasswordSelector = createSelector(
	registerSelector,
	(register) => register.repassword
);
