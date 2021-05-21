// import { put, call, takeLatest, all } from "redux-saga/effects";
// import { signInStatus } from "../Redux/App/appActions";
// import * as loginActionTypes from "../Redux/Login/actionTypes";
// import * as signupActionTypes from "../Redux/Signup/actionTypes";
// import * as userActionTypes from "../Redux/User/actionTypes"; //done
// // import *as userActions from '../containers/Admin/Redux/userActions'
// // import { push } from 'react-router-redux';
// function* fetchNews() {
// 	console.log("fetch news called");
// 	const json = yield fetch(
// 		"https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc"
// 	)
// 		.then((response) => {
// 			console.log("reponse ", response);
// 			return response.json();
// 		})
// 		.catch((err) => console.log("gettting error from saga fetch", err));

// 	yield put({ type: "GET_NEWS_SUCCESS", payload: json.articles });
// }
// const token =
// 	"EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMwZDMwMTcwMjRmMzU2OTk1ZDNiOWMiLCJpYXQiOjE2MTM4MjA3ODN9.k6CLe2BEn0a1SFt5sdor5u7Nu5TJVPFctmcpSR2FUi0";
// // get all users 
// function* fetchUsers(action) {
// 	console.log("fetch users called", action);
// 	yield put({ type: userActionTypes.GET_USERS_REQUEST });
// 	try {
// 		let userData = null;
// 		if (window) {
// 			userData = 
// 			yield call([localStorage, localStorage.getItem], "user")
// 			userData = JSON.parse(userData);
// 			console.log("userss lclStoDtaaa", userData);
// 		}
// 		const response = yield fetch(
// 			`http://localhost:7000/api/users/${userData.user._id}`,
// 			{
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: `Bearer ${userData.token}`,
// 				},
// 			}
// 		);
// 		const data = yield response.json();
// 		console.log("users saga data", data);
// 		if(data.error){
// 			throw 'getting error:'+data.error;
// 		}
// 		yield put({ type: userActionTypes.GET_USERS_SUCCESS, payload: data.users });
// 	} catch (err) {
// 		console.log("errorr in cath", err);
// 		yield put({ type: userActionTypes.GET_USERS_FAILED, payload: err });
// 	}
// }
// // delete user  
// function* deleteUser(action) {
// 	console.log("Delete user called", action);
// 	yield put({ type: userActionTypes.DELETE_USER_REQUEST });
// 	try {
// 		let userData = null;
// 		if (window) {
// 			userData = 
// 			yield call([localStorage, localStorage.getItem], "user")
// 			userData = JSON.parse(userData);
// 			console.log("userss lclStoDtaaa", userData);
// 		}
// 		const response = yield fetch(
// 			`http://localhost:7000/api/user/${userData.user._id}`, {
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: `Bearer ${userData.token}`,
// 					"Access-Control-Allow-Origin":"*",
// 				},
// 				method:'DELETE',
// 				body:JSON.stringify(action.payload)
// 			}
// 		);
// 		const data = yield response.json();
// 		console.log("users saga data", data);
// 		if(data.error){
// 			throw 'getting error:'+data.error;
// 		}
// 		yield put({ type: userActionTypes.DELETE_USER_SUCCESS, payload: data });
// 		yield put({ type: userActionTypes.TRIGGER_USERS_UPDATE })
// 	} catch (err) {
// 		console.log("errorr in cath", err);
// 		yield put({ type: userActionTypes.DELETE_USER_FAILED, payload: err });
// 	}
// }

// // signin
// function* signIn(action) {
// 	try {
// 		yield put({
// 			type: loginActionTypes.SIGNIN_REQUEST,
// 		});
// 		let response = yield fetch("http://localhost:7000/api/signin", {
// 			method: "POST",
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 				// 'Content-Type': 'application/x-www-form-urlencoded',
// 			},
// 			body: JSON.stringify(action.payload),
// 		});
// 		let user = yield response.json();
// 		console.log("user signin called action data", response);
// 		if (user.error) {
// 			yield put({
// 				type: loginActionTypes.SIGNIN_FAILED,
// 				payload: user.error,
// 			});
// 			if (window)
// 				yield call([localStorage, localStorage.removeItem], "user");
// 			// localStorage.removeItem("user");
// 			alert("getting error");
// 		} else {
// 			console.log("reponse user[sagas.js signin] ", user);
// 			yield put({ type: loginActionTypes.SIGNIN_SUCCESS });
// 			yield put(signInStatus(user));
// 			// alert("login success");
// 			if (window)
// 				yield call(
// 					[localStorage, localStorage.setItem],
// 					"user",
// 					JSON.stringify(user)
// 				);
// 			// localStorage.setItem("user", JSON.stringify(user));
// 		}

// 		// yield put({ type: "SIGNIN_SUCCESS" });
// 		// yield put(signInStatus(user));
// 	} catch (err) {
// 		yield put({ type: loginActionTypes.SIGNIN_FAILED, payload: err });
// 		// console.log('cath error',err);
// 	}
// }
// // signout
// function* signout(action) {
// 	try {
// 		yield put({
// 			type: loginActionTypes.SIGNOUT_REQUEST,
// 		});
// 		let response = yield fetch("http://localhost:7000/api/signout", {
// 			method: "POST",
// 		});
// 		let user = yield response.json();
// 		console.log("user signout called ,action data", response);
// 		if (user.error) {
// 			yield put({
// 				type: loginActionTypes.SIGNOUT_FAILED,
// 				payload: user.error,
// 			});
// 			if (window)
// 				yield call([localStorage, localStorage.removeItem], "user");
// 			// localStorage.removeItem("user");
// 			alert("getting error");
// 		} else {
// 			console.log("reponse user[sagas.js signin] ", user);
// 			if (window)
// 				yield call([localStorage, localStorage.removeItem], "user");
// 			yield put({ type: loginActionTypes.SIGNOUT_SUCCESS });
// 			alert("logout success");
// 		}

// 		// yield put({ type: "SIGNIN_SUCCESS" });
// 		// yield put(signInStatus(user));
// 	} catch (err) {
// 		yield put({
// 			type: loginActionTypes.SIGNOUT_FAILED,
// 			payload: err,
// 		});
// 		// console.log('cath error',err);
// 	}
// }

// // signup
// function* signUp(action) {
// 	try {
// 		yield put({ type: "SIGNUP_REQUEST" });
// 		console.log("user signup called ,action data", action);

// 		let response = yield fetch("http://localhost:7000/api/signup", {
// 			method: "POST",
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 				// 'Content-Type': 'application/x-www-form-urlencoded',
// 			},
// 			body: JSON.stringify(action.payload),
// 		});

// 		let user = yield response.json();
// 		console.log("user signup called ,action data", user);
// 		if (user.error) {
// 			yield put({
// 				type: signupActionTypes.SIGNUP_FAILED,
// 				payload: JSON.stringify(user.error),
// 			});
// 			// alert("getting error");
// 		} else {
// 			yield put({ type: signupActionTypes.SIGNUP_SUCCESS });
// 			// yield put(push('/login'))

// 			// alert("signup success");
// 		}
// 	} catch (error) {
// 		yield put({ type: signupActionTypes.SIGNUP_FAILED, payload: JSON.stringify(error )});
// 		// alert("signup");
// 	}
// }
// // update user
// // function* updateUser(action) {
// // 	try {
// // 		yield put({ type: "SIGNUP_REQUEST" });
// // 		console.log("user signup called ,action data", action);

// // 		let response = yield fetch("http://localhost:7000/api/signup", {
// // 			method: "POST",
// // 			headers: {
// // 				Accept: "application/json",
// // 				"Content-Type": "application/json",
// // 				// 'Content-Type': 'application/x-www-form-urlencoded',
// // 			},
// // 			body: JSON.stringify(action.payload),
// // 		});

// // 		let user = yield response.json();
// // 		console.log("user signup called ,action data", user);
// // 		if (user.error) {
// // 			yield put({
// // 				type: signupActionTypes.SIGNUP_FAILED,
// // 				payload: JSON.stringify(user.error),
// // 			});
// // 			// alert("getting error");
// // 		} else {
// // 			yield put({ type: signupActionTypes.SIGNUP_SUCCESS });
// // 			// yield put(push('/login'))

// // 			// alert("signup success");
// // 		}
// // 	} catch (error) {
// // 		yield put({ type: signupActionTypes.SIGNUP_FAILED, payload: JSON.stringify(error )});
// // 		// alert("signup");
// // 	}
// // }

// // action watchers
// function* actionWatcherNews() {
// 	yield takeLatest("GET_NEWS", fetchNews);
// }
// // -----------------------users
// // get all users
// function* actionWatcherUsers() {
// 	yield takeLatest(userActionTypes.GET_ALL_USERS, fetchUsers);
// }
// // update user
// // function* actionWatcherUpdateUser() {
// // 	yield takeLatest(userActionTypes.GET_ALL_USERS, updateUser);
// // }

// // delete user
// function* actionWatcherDeleteUser() {
// 	yield takeLatest(userActionTypes.DELETE_USER,deleteUser );
// }
// // -----------------------

// // user singn in
// function* actionWatcherSignin() {
// 	yield takeLatest(loginActionTypes.SIGNIN, signIn);
// }
// // sign out
// function* actionWatcherSignout() {
// 	yield takeLatest(loginActionTypes.SIGNOUT, signout);
// }
// // sign up
// function* actionWatcherSignup() {
// 	yield takeLatest(signupActionTypes.SIGNUP, signUp);
// }

// // watching all saga calls
// export default function* rootSaga() {
// 	yield all([
// 		actionWatcherNews(),
// 		actionWatcherUsers(),
// 		actionWatcherSignin(),
// 		actionWatcherSignup(),
// 		actionWatcherSignout(),
// 		actionWatcherDeleteUser()
// 	]);
// }
