import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CSpinner,
  CCollapse,
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";


import { useSelector, useDispatch } from "react-redux";

import * as userActions from "../../Redux/User/actions";
import { updateUserStatus, approvUser } from "../../Services/services";
import { notify } from "../../reusable/ToastNotification/Notif";

// const getBadge = (status) => {
//   switch (status) {
//     case "Active":
//       return "success";
//     case "Inactive":
//       return "secondary";
//     case "Pending":
//       return "warning";
//     case "Banned":
//       return "danger";
//     default:
//       return "primary";
//   }
// };

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const [details, setDetails] = useState([]);
  const [rowId, setRowId] = useState(0);
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`users?page=${newPage}`);
    
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const usersState = useSelector((state) => state.usersReducer);
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  // const location = useLocation();
  const { user, token } = authState.userData;
  useEffect(() => {
    const { user, token } = authState.userData;
    // console.log("useEffect component did mount[Users.js]", authState.userData);
    dispatch(userActions.fetchUsers({ token, userId: user.id }));
  }, [usersState.triggerUpdate,authState,dispatch]);
  // console.log("usersState", usersState);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const updateStatus = ({ userId, status }) => {
    updateUserStatus({ userId, token, status, adminId: user.id })
      .then((result) => {
        // console.log("result ", result);
        // setLoading(false);
        if (result.status === 200) {
          notify("Status Update Success ", "success");
          dispatch(userActions.trigerUpdate());
          return;
        }
        notify("Failed to Update Status " + result.message, "warn");
      })
      .catch((err) => {
        // setLoading(false);
        console.log("getting error ", err);
        notify("Failed to Update Status " + err.message, "warn");
      });
  };
  const approv = (userId) => {
    approvUser({ userId, token, adminId: user.id })
      .then((result) => {
        // console.log("result ", result);
        // setLoading(false);
        if (result.status === 200) {
          notify("User Approved ", "success");
          dispatch(userActions.trigerUpdate());
          return;
        }
        notify("Failed to Approv user " + result.message, "warn");
      })
      .catch((err) => {
        // setLoading(false);
        // console.log("getting error ", err);
        notify("Failed to Approv user " + err.message, "warn");
      });
  };

  // console.log("react env REACT_APP_API_URL ", process.env.REACT_APP_API_URL);
  // console.log("currentPage [Users.js]", currentPage);
  // console.log("Page  [Users.js]", page);
  
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Users
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersState.users}
              fields={[
                { key: "Id", _classes: "font-weight-bold" },
                "Username",
                "Name",
                "Email",
                "Status",
                // "IsVerifed",
                {
                  key: "IsVerifed",
                  label: "Approved",
                  _style: { width: "1%" },
                  sorter: false,
                  filter: false,
                },
                {
                  key: "show_details",
                  label: "Actions",
                  _style: { width: "1%" },
                  sorter: false,
                  filter: false,
                },
                {
                  key: "show_User",
                  label: "",
                  _style: { width: "1%" },
                  sorter: false,
                  filter: false,
                },
              ]}
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              scopedSlots={{
                show_details: (item, index) => {
                  return (
                    <>
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index) ? "Hide" : "Show"}
                        </CButton>
                      </td>
                    </>
                  );
                },
                show_User: (user, index) => (
                  <td>
                    <CButton
                      color="info"
                      variant="outline"
                      shape="square"
                      size="sm"
                      disabled={true}
                      onClick={(item) => history.push(`/users/${user.Id}`)}
                    >
                      view
                    </CButton>
                  </td>
                ),

                details: (user, index) => {
                  return (
                    <CCollapse show={details.includes(index)}>
                      <CCardBody>
                        <h4>{user.Username}</h4>
                        <p className="text-muted">
                          User since: {new Date(user.CreatedOn).toDateString()}
                        </p>
                        <CButton
                          size="sm"
                          color="info"
                          onClick={() => {
                            approv( user.Id );
                          }}
                          disabled={user.IsVerifed}
                        >
                          Approv
                        </CButton>
                        <CButton
                          size="sm"
                          color="danger"
                          className="ml-1"
                          disabled={user.role === 1}
                          onClick={() => {
                            setRowId(user.Id);
                            updateStatus({
                              status: !user.Status,
                              userId: user.Id,
                            });
                            // dispatch(
                            //   userActions.deleteUser({ userId: user._id })
                            // );
                          }}
                        >
                          {user.Status ? "Block" : "Active"}
                          {usersState.loading && user.id === rowId && (
                            <CSpinner color="success" size="sm" />
                          )}
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  );
                },
                IsVerifed: (user, index) => (
                  <td>
                    <CBadge color= {user.IsVerifed ? "success" :"warning"}> {user.IsVerifed ? "Yes" :"No"}</CBadge>
                  </td>
                ),
                Status: (user, index) => (
                  <td>
                    <CBadge color= {user.Status ? "success" :"warning"}> {user.Status ? "Active" :"Blocked"}</CBadge>
                  </td>
                ),
              }}
            />
            {/* {users} */}

            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
