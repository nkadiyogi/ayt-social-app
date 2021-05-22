import * as actionTypes from "./actionTypes";

export const signinRequest = (data) => {
	return {
		type: actionTypes.SIGNIN_REQUEST,
		payload: data,
	};
};
export const onInputChange = (event) => {
    // console.log('event ',event)
	return {
		type: actionTypes.ON_INPUT_CHANGE,
		payload: { name: event.target.name, value: event.target.value },
	};
};
