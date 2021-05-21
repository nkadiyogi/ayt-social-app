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

import usersData from "./UsersData";
import { useSelector, useDispatch } from "react-redux";

import * as userActions from "../../Redux/User/actions";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const [details, setDetails] = useState([]);
  const [rowId, setRowId] = useState(0);
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const usersState = useSelector((state) => state.usersReducer);
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const {user,token} = authState.userData;
    console.log("useEffect component did mount[Users.js]",authState.userData);
    dispatch(userActions.fetchUsers({token,userId:user.id}));
  }, [usersState.triggerUpdate]);
  console.log("usersState", usersState);

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

  console.log("react env REACT_APP_API_URL ", process.env.REACT_APP_API_URL);
  //         <button className="badge badge-primary">view</button>
  //         <button
  //           className="badge badge-primary ml-2"
  //           disabled={user.role == 1}
  //           onClick={() =>
  //             dispatch(userActions.deleteUser({ userId: user._id }))
  //           }
  //         >

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersState.users}
              fields={[
                { key: "id", _classes: "font-weight-bold" },
                "username",
                "email",
                "role_id",
                "last_login",
                "status",
                "is_verify",
                "createdOn",

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
                      onClick={(item) => history.push(`/users/${user._id}`)}
                    >
                      view
                    </CButton>
                  </td>
                ),

                details: (user, index) => {
                  return (
                    <CCollapse show={details.includes(index)}>
                      <CCardBody>
                        <h4>{user.username}</h4>
                        <p className="text-muted">
                          User since: {user.registered}
                        </p>
                        <CButton size="sm" color="info">
                          User Settings
                        </CButton>
                        <CButton
                          size="sm"
                          color="danger"
                          className="ml-1"
                          disabled={user.role == 1}
                          onClick={() => {
                            setRowId(user._id);

                            dispatch(
                              userActions.deleteUser({ userId: user._id })
                            );
                          }}
                        >
                          Delete
                          {usersState.loading && user._id == rowId && (
                            <CSpinner color="success" size="sm" />
                          )}
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  );
                },
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
