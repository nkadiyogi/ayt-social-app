import * as actionTypes from './actionTypes';
const initialState = {
  sidebarShow: "responsive",
};

const sidebarReducer = (state = initialState, { type, ...rest }) => {
    // console.log('action',type,rest);
  switch (type) {
    case actionTypes.SET:{
        console.log('case Set');
      return { ...state, ...rest };}
    default:
      return state;
  }
};

export default sidebarReducer;
