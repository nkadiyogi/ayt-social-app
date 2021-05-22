import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {
    const authState = useSelector((state) => state.authReducer);

    
  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    ></Route>
  );
};
export default PrivateRoute;
