import React from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { onInputChange, signup } from "../../Redux/Signup/actions";
// import Spinner from "../../Spinner/Spinner";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import Spinner from '../../reusable/Spinner/Spinner';
import {
  SIGNUP_STATUS_SUCCESS,
  SIGNUP_STATUS_FAILED,
  SIGNUP_CLEAR_FORM_STATE,
  SIGNUP_STATUS_PROCESSING,
} from "../../Redux/Signup/actionTypes";

const Register = () => {
  const signUpState = useSelector((state) => state.signupReducer);
  const { email, firstName, lastName, password, phone } = signUpState.form;
  const body = signUpState.form;
  const dispatch = useDispatch();
  const location = useLocation();

  const history = useHistory();
  console.log('signup state ',signUpState);
  // console.log("signup location", location);
  // after sign up success clear form state
  if (signUpState.status == SIGNUP_STATUS_SUCCESS) {
    setTimeout(() => {
      dispatch({ type: SIGNUP_CLEAR_FORM_STATE });
    }, 1000);
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="FirstName"
                      value={firstName}
                      name="firstName"
                      onChange={(event) => dispatch(onInputChange(event))}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="LastName"
                      value={lastName}
                      name="lastName"
                      onChange={(event) => dispatch(onInputChange(event))}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      value={email}
                      placeholder="Email"
                      name="email"
                      onChange={(event) => dispatch(onInputChange(event))}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      value={phone}
                      placeholder="Phone number"
                      name="phone"
                      onChange={(event) => dispatch(onInputChange(event))}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      value={password}
                      name="password"
                      onChange={(event) => dispatch(onInputChange(event))}
                    />
                  </CInputGroup>
                  {/* <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup> */}
                  <CButton
                    color="success"
                    block
                    onClick={() => dispatch(signup(body))}
                    disabled={signUpState.loading}
                  >
                    Create Account {signUpState.loading && <Spinner margin='ml-2' size='sm'/>}
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
            { signUpState.error && signUpState.status == SIGNUP_STATUS_FAILED &&( <CAlert color="danger"> 
              Registration failed {  signUpState.error}
                </CAlert>)}
                { signUpState.status==SIGNUP_STATUS_SUCCESS && ( <CAlert color="success"> 
               registration success
                </CAlert>)}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
