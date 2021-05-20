import * as actionTypes from "./actionTypes";
const initialState = {
	loading: false,
	status: null,
	form: {
		firstName: "shiv",
		lastName: "MAlviya",
		email: "test123@mail.com",
		password: "12345",
		phone: "9928695184",
	},
	error: null,
};
const signupReducer = (state = initialState, action) => {
	console.log("action triggred[signup reducer]", action);
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
		case actionTypes.SIGNUP_REQUEST:
			return {
				...state,
				status: actionTypes.SIGNUP_STATUS_PROCESSING,
				loading: true,
				error:null
			};
		case actionTypes.SIGNUP_SUCCESS:
			return {
				...state,
				status: actionTypes.SIGNUP_STATUS_SUCCESS,
				loading: false,
				error:null
			};
		case actionTypes.SIGNUP_FAILED:
			return {
				...state,
				status: actionTypes.SIGNUP_STATUS_FAILED,
				loading: false,
				error:action.payload
			};
		case actionTypes.SIGNUP_CLEAR_FORM_STATE:
			return {
				loading: false,
				status: null,
				form: {
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					phone: "",
				},
				error: null,
			};

		default:
			return state;
	}
};

export default signupReducer;
