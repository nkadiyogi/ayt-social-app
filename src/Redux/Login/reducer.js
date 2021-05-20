import * as actionTypes from "./actionTypes";
const initialState = {
	loading: false,
	status: null,
	form: {
		email: "nk@mail.com",
		password: "12345",
	},
	error: null,
};
const loginReducer = (state = initialState, action) => {
	console.log("action triggred", action);
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
		case actionTypes.ON_INPUT_CHANGE:
			return {
				...state,
				form: { ...state.form, [name]: value },
			};
		case actionTypes.SIGNIN_REQUEST:
			return {
				...state,
				status: "PROCESSING",
				loading: true,
				error: null,
			};
		case actionTypes.SIGNIN_FAILED:
				return {
					...state,
					status: "FAILED",
					loading: false,
					error: action.payload,
				};
		case actionTypes.SIGNIN_SUCCESS:
			return {
				...state,
				status: "SUCCESS",
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};

export default loginReducer;
