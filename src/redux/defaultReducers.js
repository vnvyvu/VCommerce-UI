import { merge } from 'lodash';

/**
 * Trả về các reducer được xây dựng chung cho slice
 * @param {*} initialState
 * @returns
 */
export function defaultReducers(initialState) {
	return {
		update(state, action) {
			state = merge(state, action.payload);
		},
		reset() {
			return initialState;
		},
		clean(state) {
			const newState = {};
			Object.keys(initialState).forEach((key) => {
				newState[key] = state[key];
			});
			state = newState;
		},
	};
}
