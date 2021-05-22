import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./scss/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import AdminRoute from "./components/AdminRoute";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './components/ResetPassword/ResetPassword';
import './App.css'
import { TheFooter } from "./containers";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const AdminLayout = React.lazy(() => import("./containers/AdminLayout"));

// Pages
const Login = React.lazy(() => import("./views/Login/Login"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));


const App = () => {
  // const dispatch = useDispatch();
const authState = useSelector(state=> state.authReducer);
const {isSignedIn} = authState;
console.log('process.env.NODE_ENV ',process.env.NODE_ENV);
  return (
    <BrowserRouter >
      <React.Suspense fallback={loading}>
        
        <Switch>
          <Route
            exact
            path="/signin"
            name="Sign in Page"
            render={(props) => <Login {...props} />}
          />
          
           <Route
            exact
            path="/reset-password/:token"
            name="Reset password"
            render={(props) => <ResetPassword {...props} />}
          />
          {/* <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          /> */}
          {/* <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
          <AdminRoute path="/admin" component={AdminLayout} />
          <Route
            exact
            path="/"
            name="Sign in Page"
            render={(props) => <Login {...props} />}
          />
          {/* <Route
            path="/"
            name="Admin"
            render={(props) => (
              <>
                <h1>Public page</h1>{" "}
                {}
                <button onClick={()=> dispatch(userLogout())}>log out</button>{" "}
              </>
            )}
          /> */}
        </Switch>
        <ToastContainer />
        {isSignedIn?null: <TheFooter/>}
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
