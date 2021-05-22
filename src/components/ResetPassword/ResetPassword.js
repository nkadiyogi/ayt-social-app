import React, { useEffect, useState, useRef } from "react";
import {
  CCard,
  CFormText,
  CLabel,
  CFormGroup,
  CCardBody,
  CForm,
  CCardHeader,
  CButton,
  CCardFooter,
  CInput,
  CCol,
  CRow,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { resetPassword } from "../../Services/services";
import { notify } from "../../reusable/ToastNotification/Notif";
import { useHistory } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
const ResetPassword = ({ match }) => {
  const [formState, setFormState] = useState({
    newPassword: "",
    confirmPassword: "",
    resetToken: "",
    confirmPassError: "password did not match",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    console.log("resetpassword match props did mount", match);
    let resToken = match.params.token;
    if (resToken) {
      setFormState({ ...formState, resetToken: resToken });
    }
  }, []);


  const inputValidator = useRef(new SimpleReactValidator());
  const { newPassword, resetToken, confirmPassword, confirmPassError } =
    formState;
  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setFormState({ ...formState, [name]: event.target.value });
  };

  const onSubmitHandler = () => {
    console.log("onSubmit handler", formState, match);
    inputValidator.current.hideMessages();

    if (inputValidator.current.allValid()) {
      setLoading(true);
      resetPassword({ newPassword, resetToken })
        .then((result) => {
          setLoading(false);
          console.log("login fetch result", result);
          // return;
          if (result.status === 200) {
            notify("password reset success login now", "success");
            history.push("/signin");
          } else {
            notify(
              "reset request failed " + JSON.stringify(result.message),
              "error"
            );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("fetch failed error", err);
          notify("reset request failed " + JSON.stringify(err), "error");
        });
    } else {
      inputValidator.current.showMessages();
      notify("Fill required field", "error");
    }
  };
  console.log("resetpassword match props", match);
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCard>
              <CCardHeader>Reset Password</CCardHeader>
              <CCardBody>
                <CForm action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="newPassword">New Password</CLabel>
                    <CInput
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Enter new password.."
                      value={newPassword}
                      onChange={handleChange("newPassword")}
                      onFocus={() =>
                        inputValidator.current.showMessageFor("newPassword")
                      }
                    />
                    <CFormText className="help-block">
                      Please enter your new password
                    </CFormText>
                    {inputValidator.current.message(
                      "newPassword",
                      newPassword,
                      ["required", { min: 6 }],
                      { className: "text-danger" }
                    )}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="confirmPassword">Confirm password</CLabel>
                    <CInput
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm password.."
                      value={confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      onFocus={() =>
                        inputValidator.current.showMessageFor("confirmPassword")
                      }
                    />
                    <CFormText className="help-block">
                      Confirm password
                    </CFormText>
                    {newPassword !== confirmPassword ? (
                      <span className="text-danger sm">
                        {" "}
                        {confirmPassError}{" "}
                      </span>
                    ) : null}
                    {inputValidator.current.message(
                      "confirmPassword",
                      confirmPassword,
                      ["required", { min: 6 }],
                      { className: "text-danger" }
                    )}
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
               
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  disabled={loading || newPassword !== confirmPassword}
                  onClick={onSubmitHandler}
                  className="mr-2"
                >
                  <CIcon name="cil-scrubber" />{" "}
                  {loading ? (
                    <>
                     {" Wait..."}{" "}
                    </>
                  ) : (
                    "Submit"
                  )}
                </CButton>
                {loading ? <CSpinner color="info" size="sm" /> : null}
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPassword;
