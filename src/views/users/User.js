import React, { useEffect ,useRef} from "react";
import SimpleReactValidator from 'simple-react-validator';
import {
  CInputGroupPrepend,
  CInputGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CContainer,
  CForm,
  CLabel,
  CInput,
  CFormText,
  CButton,
  CInputGroupText,
  CAlert
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import usersData from "./UsersData";
import { useSelector } from "react-redux";
import { useState } from "react";
import { classNames } from "classnames";

import Spinner from '../../reusable/Spinner/Spinner';

const User = ({ match }) => {
// form validator
  const formValidator = useRef(new SimpleReactValidator())
  const [showUpdateForm, setShowUpdateForm] = useState(0);
  const [error,setError] = useState(null);
  const [success,setSuccess] = useState(false);
  const [loading,setLoading] = useState(false);
  const usersState = useSelector((state) => state.usersReducer);
  const appState = useSelector((state) => state.appReducer);
  console.log("appstate", appState);
  // form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role:""
  });
  
  useEffect(() => {
    console.log("component did mount[User.js]", form);

  const { firstName, lastName, email, phone } = user;
  setForm({ firstName, lastName, email, phone, id: user._id });
  },[]);

  const user ={id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending'}
    // usersState &&
    // usersState.users &&
    // usersState.users.find((user) => user._id.toString() === match.params.id);

  // console.log('user ',user);
  console.log("form ", form);
  console.log("user ", user);
  const userDetails = user
    ? Object.entries(user)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];

  // update form api
  const onSubmit = () => {

    setLoading(true);
    if(formValidator.current.allValid()){
      console.log("all valid []validator ",formValidator.current.allValid());
      // let userData = null;
    // if (window) {
    //   userData = JSON.parse(localStorage.getItem("user"));
    //   console.log("userss lclStoDtaaa", userData);
    // }
    // fetch(`http://localhost:7000/api/user/${userData.user._id}`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${userData.token}`,
    //   },
    //   body: JSON.stringify(form),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("result ", result)
    //     if(result.error){
    //       console.log("getting error ", result.error)
    //       setError(JSON.stringify(result.error));
    //       setSuccess(false);
    //       setLoading(false);
    //     }else{
    //       setError(null);
    //       setSuccess(true);
    //       setLoading(false);
    //     }
    //   })
    //   .catch((err) => console.log("getting error ", err));
    }else{
      console.log('not valid form input');
    }
    
  };

  return (
    <CRow>
      {!showUpdateForm && (
        <CCol>
          <CCard>
            <CCardHeader>User id:12</CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {userDetails &&
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td>
                            <strong>{value}</strong>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <CButton
                color="primary"
                className="px-4"
                onClick={() => setShowUpdateForm(1)}
              >
                Update Details
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      )}
      {/* user update form */}
      {showUpdateForm && (
        <CContainer >
          <CRow>
            <CCol sm="12">
              <CForm>
                <h1>Update User Details</h1>

                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    placeholder="FirstName"
                    value={form.firstName}
                    name="firstName"
                    onChange={(event) =>
                      setForm({
                        ...form,
                        [event.target.name]: event.target.value,
                      })
                    }
                    onBlur={formValidator.current.showMessageFor('firstName')}
                  />
                  {formValidator.current.message('firstName', form.firstName, 'required|min:3|max:10')}
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
                    value={form.lastName}
                    name="lastName"
                    onChange={(event) =>
                      setForm({
                        ...form,
                        [event.target.name]: event.target.value,
                      })
                    }
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    value={form.email}
                    placeholder="Email"
                    name="email"
                    onChange={(event) =>
                      setForm({
                        ...form,
                        [event.target.name]: event.target.value,
                      })
                    }
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    value={form.phone}
                    placeholder="Phone number"
                    name="phone"
                    onChange={(event) =>
                      setForm({
                        ...form,
                        [event.target.name]: event.target.value,
                      })
                    }
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
                    value={form.password}
                    name="password"
                    onChange={(event) =>
                      setForm({
                        ...form,
                        [event.target.name]: event.target.value,
                      })
                    }
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
                  className="mr-3"
                  onClick={onSubmit}
                  // disabled={signUpState.loading}
                >
                  Update
                  { loading && <Spinner margin='ml-2' size='sm'/>}
                </CButton>
                <CButton
                  color="success"
                  onClick={() => setShowUpdateForm(0)}
                  // disabled={signUpState.loading}
                >
                  Back
                </CButton>
              </CForm>
              {error && (<CAlert color="danger">
                 Getting some error: {error}
              </CAlert>)}
              {success && (<CAlert color="success">
                  update success
              </CAlert>)}
            </CCol>
          </CRow>
        </CContainer>
      )}
    </CRow>
  );
};

export default User;
