import React, { Component } from "react";
import LoginView from "./LoginView";

export class LoginViewContainer extends Component {
  render() {
    console.log("This is the console.log");
    return (
      <div style={{ paddingTop: "20px" }}>
        <LoginView />
      </div>
    );
  }
}

export default LoginViewContainer;
