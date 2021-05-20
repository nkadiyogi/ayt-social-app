import * as actionTypes from "./actionTypes";
import obj from "../../config";
console.log('nkobj',obj)
const apiUrl = 'http://localhost:3001/v1/';
const xApiKey = 'c0fa1bc00534b69726b6d616e20000000722227335444556666c657321a516ea6ea959d6658e'
export const deleteUser = (data) => {
  return {
    type: actionTypes.DELETE_USER,
    payload: data,
  };
};
export const usersFetchRequest = () => {
  return {
    type: actionTypes.GET_USERS_REQUEST,
  };
};
export const usersFetchRequestFailed = (error) => {
  return {
    type: actionTypes.GET_USERS_FAILED,
    payload:error
  };
};
export const usersFetchRequestSuccess = (users) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    payload:users
  };
};

// // get all users
export const fetchUsers = (token, userId) => {
  return (dispatch) => {
    console.log("apiUrl ", apiUrl);
    dispatch(usersFetchRequest());
    fetch(`${apiUrl}/Users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "x-api-key": xApiKey,
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("login fetch result", result);
        if (result.status == 200) {
          // notify('login failed '+result.msg,'warn')
          console.log(result);
          return dispatch(usersFetchRequestSuccess(result.data));
        } else {
          // notify('login success '+result.data.otp,'warn')
          dispatch(usersFetchRequestFailed(result.message));
        }
      })
      .catch((err) => {
        console.log("fetch failed error", err);
        dispatch(usersFetchRequestFailed(JSON.stringify(err)));
        // notify("login failed" + err, "warn");
      });
  };
};
// // // get all users
// export const fetchUser = (token, userId) => {
//   return (dispatch) => {
//     console.log("apiUrl ", apiUrl);
//     dispatch(usersFetchRequest());
//     fetch(`${apiUrl}/User/${userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//         Authorization: `Bearer ${token}`,
//         "Access-Control-Allow-Origin": "*",
//       },
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log("fetch user result", result);
//         if (result.status == 200) {
//           // notify('login failed '+result.msg,'warn')
//           console.log(result);
//           return dispatch(userFetchRequestSuccess(result.data));
//         } else {
//           // notify('login success '+result.data.otp,'warn')
//           dispatch(userFetchRequestFailed(result.message));
//         }
//       })
//       .catch((err) => {
//         console.log("fetch failed error", err);
//         dispatch(userFetchRequestFailed(JSON.stringify(err)));
//         // notify("login failed" + err, "warn");
//       });
//   };
// };

