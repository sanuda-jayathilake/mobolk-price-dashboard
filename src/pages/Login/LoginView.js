import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import { authenticateUser } from "../../Accounts";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { displayMessage } from "../../components/Notifications/Notif";

const LoginView = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setAccess] = useState(false);

  const handleSession = () => {
    if (sessionStorage.getItem("AUTHORIZATION") === "SUCCESS") {
      setAccess({ isLoggedIn: true });
    } else {
      console.log("You fucking don't have access you son of a bitch");
    }
  };
  const handleEmail = (email) => {
    setEmail({ email: email });
  };
  const handlePassword = (password) => {
    setPassword({ password: password });
  };
  const handleAccess = (email, password) => {
    if (
      authenticateUser(email, password) !== "undefined" &&
      authenticateUser(email, password).username !== "undefined"
    ) {
      sessionStorage.setItem("AUTHORIZATION", "SUCCESS");
      handleSession();
    }
    // else{
    //   displayMessage("danger", "Account Not Recognized")
    // }
  };
  if (sessionStorage.getItem("AUTHORIZATION") !== "SUCCESS") {
    return (
      <div style={{ marginTop: "130px" }}>
        <div style={{ position: "relative", right: "-38%" }}>
          <img src="https://mobo.lk/wp-content/uploads/2020/12/Mobo.lk-logo-removebg-preview.png" />
        </div>
        <div
          style={{
            position: "absolute",
            right: "43%",
            border: "solid 1px #159AB2",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", paddingBottom: "10px" }}>
            <div style={{ margin: "16px" }}>Username:</div>
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                onChange={(e) => handleEmail(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div style={{ display: "flex", paddingBottom: "10px" }}>
            <div style={{ margin: "18px" }}>Password:</div>
            <div>
              <TextField
                id="standard-adornment-password"
                variant="outlined"
                placeholder=""
                onChange={(e) => handlePassword(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <div style={{ position: "relative", left: "33%" }}>
            <Button
              size="small"
              style={{
                backgroundColor: "#21B0CA",
                color: "white",
                // position: "absolute",
                // left: "350px"
              }}
              onClick={() => handleAccess(email, password)}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/admin-panel",
          state: { userAuth: true },
        }}
      />
    );
  } else {
    return (
      <h3 style={{ position: "absolute", right: "43%" }}>
        You are already logged in. Click <Link to="/admin-panel">here</Link> to
        go to the admin panel
      </h3>
    );
  }
};

export default LoginView;
