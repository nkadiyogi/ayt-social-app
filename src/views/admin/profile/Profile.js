import React, { useEffect } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getUserProfile } from "../../../Redux/auth/authActions";
import ProfileForm from "./ProfileForm";

const Profile = ({ match }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(0);
  const appState = useSelector((state) => state.appReducer);
  const authState = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const userProfile = authState.profile;
  console.log("appstate", appState);
  // form state

  const token = authState.userData.token;
  const userData = authState.userData.user;
  useEffect(() => {
    dispatch(getUserProfile(userData.id, token));
  }, [userData, token]);

  // }, [userData,token,dispatch]);

  console.log("component did mount[User.js]authState", authState);
  const notFound = Object.entries(userProfile)
    ? null
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];

  const {
    // id,
    email,
    name,
    username,
    // status,
    birth_date,
    // website,
    phone_no,
    // image,
    address,
    pincode,
    countryName,
    stateName,
    cityName,
  } = userProfile;
  return (
    <CRow>
      <CCol>
        <CCard>
          {!showUpdateForm && (
            <>
              <CCardHeader>
                Admin Profile
                {authState.loading ? (
                  <span className="text-center ml-2">
                    <CSpinner color="info" size="sm" />
                  </span>
                ) : null}
              </CCardHeader>
              <CCardBody>
                {authState.loading ? null : (
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr key={0}>
                        <td>Name :</td>
                        <td>
                          <strong>{name}</strong>
                        </td>
                        <td>User Name :</td>
                        <td>
                          <strong>{username}</strong>
                        </td>
                      </tr>

                      <tr key={1}>
                        <td>Email :</td>
                        <td>
                          <strong>{email}</strong>
                        </td>
                        <td>Phone No :</td>
                        <td>
                          <strong>{phone_no}</strong>
                        </td>
                      </tr>
                      <tr key={2}>
                        <td>Birth Date :</td>
                        <td>
                          <strong>{new Date(birth_date).toDateString()}</strong>
                        </td>
                        <td>Country :</td>
                        <td>
                          <strong>{countryName}</strong>
                        </td>
                      </tr>
                      <tr key={3}>
                        <td>Pincode :</td>
                        <td>
                          <strong>{pincode}</strong>
                        </td>
                        <td>State :</td>
                        <td>
                          <strong>{stateName}</strong>
                        </td>
                      </tr>
                      <tr key={4}>
                        <td>Address :</td>
                        <td>
                          <strong>{address}</strong>
                        </td>

                        <td>City :</td>
                        <td>
                          <strong>{cityName}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {notFound}
                {authState.loading || notFound ? null : (
                  <CButton
                    color="primary"
                    className="px-4"
                    onClick={() => setShowUpdateForm(1)}
                  >
                    Update Profile
                  </CButton>
                )}
              </CCardBody>
            </>
          )}
          {/* user update form */}
          {showUpdateForm ? (
            <ProfileForm setShowUpdateForm={setShowUpdateForm} />
          ) : null}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Profile;
