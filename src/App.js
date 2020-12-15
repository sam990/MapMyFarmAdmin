import React from 'react';
import './App.css';
import MySignIn from 'views/SignIn';
import { createMuiTheme } from '@material-ui/core'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';

import { createBrowserHistory } from "history";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import APIConfig from "aws-api-config";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "assets/css/progress-button.css";
import "assets/css/mapmyfarm-admin.css";

Amplify.configure(awsconfig);
Amplify.configure(APIConfig);


const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const buttonStyle = {
  backgroundColor: 'black',
};

function App(props) {

  const hist = createBrowserHistory();

  const signOut = async event => {
    try {
      await Auth.signOut();
      console.log(props.onStateChange);
      hist.push('/');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  return (

    <BrowserRouter history={hist}>
      <Switch>
        <Route path="/" render={props => <AdminLayout {...props} handleLogoutClick={signOut} />} />
        {/* <Route path="/rtl" render={props => <RTLLayout {...props} />} /> */}
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}


export default withAuthenticator(App, false, [
  <MySignIn />,
  // <ConfirmSignIn/>,
  // <VerifyContact/>,
  // <SignUp/>,
  // <ConfirmSignUp/>,
  // <ForgotPassword/>,
  // <RequireNewPassword />
], null, theme);
