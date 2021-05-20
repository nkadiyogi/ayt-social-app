import * as actionTypes from "./appActionTypes";
import {
	SIGNOUT_REQUEST,
	SIGNOUT_SUCCESS,
	SIGNOUT_FAILED,
} from "../Login/actionTypes";
const initialState = {
	loading: false,
	isSignedIn: false,
	error: "",
	userData: null,
};
const appReducer = (state = initialState, action) => {
	console.log("app action triggred", action);
	let name = "",
		value = "";
	if (action.payload) {
		// console.log("namemm", action.payload.name);
		name = action.payload.name;
		value = action.payload.value;
	}
	// const payload = {type:'test type',payload:{name:'email',value:'testemail'}}
	// const { name, value } = action.payload;
	switch (action.type) {
		case actionTypes.SIGN_IN_STATUS:
			return {
				...state,
				userData: action.payload,
				isSignedIn: true,
			};
		case actionTypes.SIGN_OUT_STATUS:
			return {
				...state,
				userData: null,
				isSignedIn: false,
			};
		case SIGNOUT_REQUEST:
			return {
				...state,
				userData: null,
				isSignedIn: false,
				loading: true,
			};
		case SIGNOUT_SUCCESS:
			return {
				...state,
				userData: null,
				isSignedIn: false,
				loading: false,
			};
			case SIGNOUT_FAILED:
			return {
				...state,
				userData: null,
				isSignedIn: false,
				loading: false,
				error:action.payload
			};
		default:
			return state;
	}
};

export default appReducer;
