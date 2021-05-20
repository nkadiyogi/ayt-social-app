import * as actionTypes from './appActionTypes';
export const signInStatus = (user)=>{
    return {
        type:actionTypes.SIGN_IN_STATUS,
        payload:user
    }
}
export const signOutStatus = ()=>{
    return {
        type:actionTypes.SIGN_OUT_STATUS,
    }
}




