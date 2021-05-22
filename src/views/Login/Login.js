import React, { useEffect, useState, useRef } from "react";
import {  useHistory } from "react-router-dom";
import {
  // CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../Redux/auth/authActions";
import SimpleReactValidator from "simple-react-validator";
import { userForgotPassword } from "../../Redux/auth/authActions";
// import { notify } from '../../reusable/ToastNotification/Notif';
const Login = () => {
  // browser history object
  const history = useHistory();
  // console.log("config ", config);
  const inputValidator = useRef(new SimpleReactValidator());
  useEffect(() => {
    // console.log("useEffect");
  });

  
  const authState = useSelector((state) => state.authReducer);
  const [values, setValues] = useState({
    email: "narendramalviya5@gmail.com",
    password: "123456",
  });
  const [forgotPassordState, setForgotPassordState] = useState({
    show: false,
    heading: "Forgot Password",
    subHeading: "Enter your register email id and click submit to get instruction on email ",
    backButton: "Back to Login",
  });

  const { email, password } = values;
  const {loading} =authState;
  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const dispatch = useDispatch();

  if (authState.isSignedIn && authState.userData.user.role_id === 1) {
    history.push("/admin/dashboard");
  } else if (authState.isSignedIn) {
    history.push("/");
  }
const forgotPasswordSubmitHandler = ()=>{
  inputValidator.current.hideMessages()
  if(inputValidator.current.fieldValid('email')){
    dispatch(userForgotPassword(email))
    return;
  }
  inputValidator.current.showMessageFor('email');
}
const loginSubmitHandler = ()=>{
  inputValidator.current.hideMessages()
  if(inputValidator.current.allValid()){
    dispatch(userLogin({ email, password }));
    return;
  }
  inputValidator.current.showMessages();
}
  // console.log("login.js forgotPassordState ", forgotPassordState);
  // console.log("login.js authState ", authState);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>
                      {forgotPassordState.show
                        ? forgotPassordState.heading
                        : 'Login'}
                    </h1>
                    <p className="text-muted">
                      {forgotPassordState.show
                        ? forgotPassordState.subHeading
                        : "Sign In to your account"}
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="email"
                        autoComplete="email"
                        name="email"
                        onChange={handleChange("email")}
                        value={email}
                        onFocus={() =>
                          inputValidator.current.showMessageFor("email")
                        }
                      />
                    </CInputGroup>
                    {inputValidator.current.message("email", email, [
                      "required",
                      "email",
                    ],{className:'text-danger'})
                    
                    }
                    {forgotPassordState.show ? null : (
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={handleChange("password")}
                          value={password}
                          onFocus={() =>
                            inputValidator.current.showMessageFor("password")
                          }
                        />
                      </CInputGroup>
                    )}
                 {inputValidator.current.message("password", password, [
                      "required",
                      { min: 5 },
                    ],{className:'text-danger'})}
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4 mr-2"
                          onClick={() => {
                            forgotPassordState.show
                              ?  forgotPasswordSubmitHandler()
                              : loginSubmitHandler()
                          }}
                          disabled={loading}
                        >
                          {loading ?' Wait...' : 'Submit'}
                        </CButton>
                        {loading ?<CSpinner color="info" size="sm"/>  :null}
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton
                          color="link"
                          className="px-0"
                          onClick={() =>
                            forgotPassordState.show
                              ? setForgotPassordState({
                                ...forgotPassordState,
                                  show: false,
                                })
                              : setForgotPassordState({
                                ...forgotPassordState,
                                  show: true,
                                })
                          }
                        >
                          {forgotPassordState.show ? (
                            forgotPassordState.backButton
                          ) : (
                            'Forgot password?'
                          )}
                        </CButton>
                    
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>          
          </CCol>
        </CRow>
      </CContainer>
    
    </div>
  );
};

export default Login;
