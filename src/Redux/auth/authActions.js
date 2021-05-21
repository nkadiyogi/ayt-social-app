import * as actionTypes from "./authActionTypes";
// import { setLogin } from "../app/action";
// import { notify } from "../../components/AlertNotification/util";
import config from "../../config";
import { notify } from '../../reusable/ToastNotification/Notif';
const {apiUrl,xApiKey} = config;
console.log('authAction.js config',apiUrl,xApiKey);
export const userLogout =() => {
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};
export const loginRequestSuccess = (userData) => {
  return {
    type: actionTypes.LOGIN_REQUEST_SUCCESS,
    payload: userData,
  };
};
export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_REQUEST_FAILED,
    payload: error,
  };
};

// get logged in user profile
export const userFetchRequest = () => {
  return {
    type: actionTypes.GET_USER_REQUEST,
  };
};
export const userFetchRequestFailed = (error) => {
  return {
    type: actionTypes.GET_USER_FAILED,
    payload: error,
  };
};
export const userFetchRequestSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    payload: user,
  };
};


// user forgot password actions
export const userForgotPassRequest = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_REQUEST,
  };
};
export const userForgotPassRequestFailed = (error) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_REQUEST_FAILED,
    payload: error,
  };
};
export const userForgotPassRequestSuccess = (data) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_REQUEST_SUCCESS,
    payload: data,
  };
};
// api actions
export const userLogin = (user) => {
  return (dispatch) => {
    dispatch(loginRequest());
    fetch(`${apiUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-API-KEY": xApiKey,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("login fetch result", result);
        // return;
        if (result.status == 200) {
          dispatch(loginRequestSuccess(result.data));
          notify("login success ", "success");
          dispatch(getUserProfile(result.data.user.id,result.data.token));
          // dispatch(loginRequestSuccess(result.data));
        } else {
            notify("login failed " +JSON.stringify (result.message), "error");
          return dispatch(loginFailed(JSON.stringify(result.message)));
        }
      })
      .catch((err) => {
        console.log("fetch failed error", err);
        dispatch(loginFailed(JSON.stringify(err)));
        notify("login failed " + JSON.stringify(err), "error");
      });
  };
};

export const getUserProfile = (userId, token) => {
  return (dispatch) => {
    dispatch(userFetchRequest());
    fetch(`${apiUrl}/user/profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 200) {
          dispatch(userFetchRequestSuccess(result.data));
        } else {
            notify("failed fetch user profile " +JSON.stringify(result.message), "error");
          return dispatch(userFetchRequestFailed(result.message));
        }
      })
      .catch((err) => {
        console.log("fetch failed error", err);
        dispatch(userFetchRequestFailed(JSON.stringify(err)));
        notify("failed fetch user profile " +JSON.stringify(err), "error");
      });
  };
};

// forgot password request
export const userForgotPassword = (email) => {
  return (dispatch) => {
    dispatch(userForgotPassRequest());
    fetch(`${apiUrl}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "X-API-KEY": xApiKey,
      },
      body: JSON.stringify({email:email}),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("forgotpassword fetch result", result);
        // return;
        if (result.status == 200) {
          dispatch(userForgotPassRequestSuccess(result.data));
          notify("request sended " + JSON.stringify(result.message), "success");
        } else {
            notify("login failed " + JSON.stringify(result.message), "error");
          return dispatch(userForgotPassRequestFailed(JSON.stringify(result.message)));
        }
      })
      .catch((err) => {
        console.log("fetch failed error", err);
        dispatch(userForgotPassRequestFailed(JSON.stringify(err)));
        notify("getting error" + JSON.stringify(err), "error");
      });
  };
};

// // log out request
// export const userLogout = (email) => {
//   return (dispatch) => {
//     dispatch(userForgotPassRequest());
//     fetch(`${apiUrl}/forgot-password`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//         "X-API-KEY": xApiKey,
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({email:email}),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log("forgotpassword fetch result", result);
//         // return;
//         if (result.status == 200) {
//           dispatch(userForgotPassRequestSuccess(result.data));
         
//         } else {
//           //   notify("login failed " + result.msg, "warn");
//           return dispatch(userForgotPassRequestFailed(JSON.stringify(result.message)));
//         }
//       })
//       .catch((err) => {
//         console.log("fetch failed error", err);
//         dispatch(userForgotPassRequestFailed(JSON.stringify(err)));
//         // notify("login failed" + err, "warn");
//       });
//   };
// };

