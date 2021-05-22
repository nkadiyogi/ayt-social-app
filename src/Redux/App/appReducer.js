import * as actionTypes from "./appActionTypes";
import {
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILED,
} from "../Login/actionTypes";
const initialState = {
  loading: false,
  error: "",
  countryList: [
    { id: 1, name: "India" },
    { id: 2, name: "US" },
    { id: 3, name: "Germany" },
  ],
  stateList: [
    { id: 1, name: "Rajasthan",country_id:'1' },
    { id: 2, name: "Maharatra",country_id:'1' },
    { id: 3, name: "Bihar",country_id:'1' },
	{ id: 4, name: "Sanfransisco",country_id:'2' },
	{ id: 6, name: "Light city",country_id:'3' },
	
  ],

  cityList: [
    { id: 1, name: "Jodhpur",country_id:'1',state_id:'1' },
    { id: 1, name: "Pali",country_id:'1',state_id:'1' },
    { id: 1, name: "bihar dis",country_id:'1',state_id:'3' },
    { id: 1, name: "maharas city",country_id:'1',state_id:'2' },    
	{ id: 1, name: "shdjh city",country_id:'2',state_id:'4' },     
	{ id: 1, name: "hdishi city",country_id:'3',state_id:'6' },    
  ],
};
const appReducer = (state = initialState, action) => {
  console.log("app action triggred", action);
  // let name = "",
  // 	value = "";
  // if (action.payload) {
  // 	// console.log("namemm", action.payload.name);
  // 	name = action.payload.name;
  // 	value = action.payload.value;
  // }
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
        error: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
