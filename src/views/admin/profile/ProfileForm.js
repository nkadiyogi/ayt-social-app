import React, { useEffect, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  // CInputGroupPrepend,
  // CInputGroup,
  // CInputGroupAppend,
  // CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  // CContainer,
  CForm,
  CLabel,
  CInput,
  CFormText,
  // CButton,
  // CInputGroupText,
  // CAlert,
  // CFormSelect,
  CSpinner,
  CButton,
} from "@coreui/react";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { getUserProfile } from "../../../Redux/auth/authActions";
import { notify } from "../../../reusable/ToastNotification/Notif";
import { updateUserProfile } from "../../../Services/services";
import ImageUpload from "../../../components/FileInput/ImageUpload";
const ProfileForm = (props) => {
  // form validator
  const inputValidator = useRef(new SimpleReactValidator());
  // const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const authState = useSelector((state) => state.authReducer);
  const appState = useSelector((state) => state.appReducer);

  const dispatch = useDispatch();
  const userProfile = authState.profile;

  const { countryList, stateList, cityList } = appState;
  // form state
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone_no: "",
    birth_date: "",
    image: "",
    website: "",
    address: "",
    country_id: 0,
    state_id: 0,
    city_id: 0,
    pincode: "",
  });

  const token = authState.userData.token;
  const userData = authState.userData.user;
  useEffect(() => {
    dispatch(getUserProfile(userData.id, token));
  }, [dispatch,userData,token]);

  useEffect(() => {
    // console.log("component did mount[User.js]", authState.userData);
    // const { firstName, lastName, email, phone } = userData;
    setForm({ ...userProfile });
  }, [userProfile]);
  // }, [userData,token,dispatch]);

  // console.log("component did mount[User.js]authState", authState);
  // console.log("component did mount[User.js] form", form);

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setForm({ ...form, [name]: event.target.value });
  };
  const fileInputChange = (file) => {
    console.log("file input change");
    // setForm({ ...form, [name]: event.target.value });
  };

  // update form api
  const onSubmit = () => {
    setLoading(true);
    if (inputValidator.current.allValid()) {
      console.log("all valid []validator ", inputValidator.current.allValid());

      updateUserProfile({ form, token })
        .then((result) => {
          console.log("result ", result);
          setLoading(false);
          if (result.status === 200) {
            notify("Profile Update Success ", "success");
            dispatch(getUserProfile(form.id, token));
            return;
          }
          notify("Failed to Update Profile " + result.message, "warn");
        })
        .catch((err) => {
          setLoading(false);
          console.log("getting error ", err);
          notify("Failed to Update Profile " + err.message, "warn");
        });
    } else {
      setLoading(false);
      console.log("not valid form input");
      notify("Please Fill required Fields", "warn");
    }
  };
  const {
    // id,
    name,
    username,
    email,
    phone_no,
    birth_date,
    // image,
    // website,
    address,
    country_id,
    state_id,
    city_id,
    pincode,
    // countryName,
    // stateName,
    // cityName,
  } = form;
  const countryOptions =
    countryList &&
    countryList.map((country, index) => (
      <option key={index} value={country.id}>
        {country.name}
      </option>
    ));
  const stateOptions =
    stateList &&
    stateList
      .filter((state) => state.country_id === country_id)
      .map((state, index) => (
        <option key={index} value={state.id}>
          {state.name}
        </option>
      ));
  const cityOptions =
    cityList &&
    cityList
      .filter(
        (city) => city.country_id === country_id && city.state_id === state_id
      )
      .map((city, index) => (
        <option key={index} value={city.id}>
          {city.name}
        </option>
      ));

  // console.log("coutnry list", countryList);
  // console.log("state list", stateList);
  // console.log("city list", cityList);
  // console.log("form ProfileForm", form);

  return (
    <>
      <CCardHeader>
        Update Profile
        {authState.loading ? (
          <CSpinner color="info" size="sm" className="ml-2" />
        ) : null}
      </CCardHeader>
      <CCardBody>
        <CForm action="" method="post">
          {/* row - 1 */}
          <CRow>
            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="nf-email">FUll Name</CLabel>
                <CInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter FUll Name.."
                  autoComplete="name"
                  onChange={handleChange("name")}
                  value={name}
                  onFocus={() => inputValidator.current.showMessageFor("name")}
                />
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "name",
                    name,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>
            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="nf-email">User Name</CLabel>
                <CInput
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username like: nkmalviya5, john@123.."
                  autoComplete="username"
                  onChange={handleChange("username")}
                  value={username}
                  onFocus={() =>
                    inputValidator.current.showMessageFor("username")
                  }
                />
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "username",
                    username,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>
          </CRow>
          {/* row - 2 */}
          <CRow>
            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="nf-email">Email </CLabel>
                <CInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter valid email ex: user@mail.co"
                  autoComplete="email"
                  onChange={handleChange("email")}
                  value={email}
                  onFocus={() => inputValidator.current.showMessageFor("email")}
                />
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "email",
                    email,
                    ["required", "email"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>
            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="phone_no">Phone Number</CLabel>
                <CInput
                  type="text"
                  id="phone_no"
                  name="phone_no"
                  placeholder="Enter 10 digit mobile no.: 9853674833"
                  autoComplete="phone_no"
                  onChange={handleChange("phone_no")}
                  value={phone_no}
                  onFocus={() =>
                    inputValidator.current.showMessageFor("phone_no")
                  }
                />
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "username",
                    phone_no,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>
          </CRow>
          {/* row - 3 */}
          <CRow>
            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="birth_date">Date of birth </CLabel>
                <CInput
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  onChange={handleChange("birth_date")}
                  value={birth_date}
                  onFocus={() =>
                    inputValidator.current.showMessageFor("birth_date")
                  }
                />
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "birth_date",
                    birth_date,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>
            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="pincode">Pin code</CLabel>
                <CInput
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter 10 digit mobile no.: 9853674833"
                  autoComplete="pincode"
                  onChange={handleChange("pincode")}
                  value={pincode}
                  onFocus={() =>
                    inputValidator.current.showMessageFor("pincode")
                  }
                />
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "pincode",
                    pincode,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>
          </CRow>

          {/* row - 4 */}
          <CRow>
            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="nf-email">Country </CLabel>
                <select
                  className="form-control"
                  onChange={handleChange("country_id")}
                  value={country_id}
                  onFocus={() =>
                    inputValidator.current.showMessageFor("country_id")
                  }
                >
                  <option>Select country</option>
                  {countryOptions}
                </select>
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "country_id",
                    country_id,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>

            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="state_id">State </CLabel>
                <select
                id="state_id"
                  className="form-control"
                  onChange={handleChange("state_id")}
                  value={state_id}
                  onFocus={() =>
                    inputValidator.current.showMessageFor("state_id")
                  }
                >
                  <option>Select State</option>
                  {stateOptions}
                </select>
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "state_id",
                    state_id,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>
          </CRow>
          {/*  row 5*/}
          <CRow>
            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="city_id">City </CLabel>
                <select
                id="city_id"
                  className="form-control"
                  onChange={handleChange("city_id")}
                  value={city_id}
                  onFocus={() =>
                    inputValidator.current.showMessageFor("city_id")
                  }
                >
                  <option>Select City</option>
                  {/* <option value="1">Pali</option>
                  <option value="2">jodhpur</option> */}
                  {cityOptions}
                </select>
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "city_id",
                    city_id,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>

            <CCol sm="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="address">Address </CLabel>
                <textarea
                id="address"
                  className="form-control"
                  onChange={handleChange("address")}
                  value={address}
                  onFocus={() =>
                    inputValidator.current.showMessageFor("address")
                  }
                >
                  {address}
                </textarea>
                <CFormText className="help-block">
                  {inputValidator.current.message(
                    "address",
                    address,
                    ["required"],
                    { className: "text-danger" }
                  )}
                </CFormText>
              </CFormGroup>
            </CCol>
          </CRow>
         
          <CRow>
            <CCol sm="12" lg="12">
              <CLabel htmlFor="nf-email">Profile Picture </CLabel>
              <CFormGroup>
                <ImageUpload fileInputChange={fileInputChange} />
              </CFormGroup>
            </CCol>
          </CRow>
          <CButton
            // color="primary"
            className="px-4 background-yellow mt-4"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? (
              <>
                Wait ... <CSpinner className="ml-2" color="warn" size="sm" />
              </>
            ) : (
              "Submit"
            )}
          </CButton>

          <CButton
            // color="primary"
            className="px-4 ml-2 background-yellow mt-4"
            onClick={() => props.setShowUpdateForm(0)}
          >
            Back to profile
          </CButton>
        </CForm>
      </CCardBody>
    </>
  );
};

export default ProfileForm;
