import React from 'react';
import logo from './logo.svg';
import './App.css';
import MySignIn from './SignIn'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import bgImage from './signin_bg.jpg';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact, withAuthenticator, SignOut } from 'aws-amplify-react';
import { Button } from '@material-ui/core';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import AWS from "aws-sdk";
import APIConfig from "aws-api-config";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "assets/css/progress-button.css";
import "assets/css/mapmyfarm-admin.css";

Amplify.configure(awsconfig);
Amplify.configure(APIConfig);

// let myCredentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: awsconfig["aws_cognito_identity_pool_id"] });
// AWS.config.region = awsconfig["aws_cognito_region"];
// AWS.config.credentials = myCredentials;
// Auth.signOut();

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
    // <ThemeProvider theme={theme}>
    //   <div className='App'>
    //     <div className='App-window'>
    //       <SignIn/>
    //     </div>
    //   </div>
    // </ThemeProvider>
    // <ThemeProvider theme={theme}>

    // <Button onClick={signOut} /* style={buttonStyle} */ >
    //   SignOut
    // </Button>

    // </ThemeProvider> 

    <BrowserRouter history={hist}>
      <Switch>
        <Route path="/" render={props => <AdminLayout {...props} handleLogoutClick={signOut} />} />
        {/* <Route path="/rtl" render={props => <RTLLayout {...props} />} /> */}
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

// async function signOut(event) {
//   try {
//     await Auth.signOut();
//     this.changeState('signedOut');
//   } catch (err) {
//     console.log(err);
//   }
// }

export default withAuthenticator(App, false, [
  <MySignIn />,
  // <ConfirmSignIn/>,
  // <VerifyContact/>,
  // <SignUp/>,
  // <ConfirmSignUp/>,
  // <ForgotPassword/>,
  // <RequireNewPassword />
], null, theme);

// export default withAuthenticator(App);