import React, { useState, useEffect } from "react";
import "../src/styles.css";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const Header = (props) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [loadHeader, setHeader] = useState(false);
  const handleUserSession = () => {
    if (sessionStorage.getItem("AUTHORIZATION") === "SUCCESS") {
      setLogin({ isLoggedIn: true });
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("AUTHORIZATION") === "SUCCESS") {
      setHeader({ loadHeader: true });
    }
    // handleUserSession();
  });
  // useEffect(() => {
  //   handleUserSession();
  // });
  console.log("State of the login view mate: ", isLoggedIn);
  console.log("Session Storage: ", sessionStorage.getItem("AUTHORIZATION"));
  const history = useHistory();
  const logout = () => {
    sessionStorage.clear();
    history.push("/");
    setLogin({ isLoggedIn: false });
  };
  if (loadHeader) {
    console.log("This is the Header");
    return (
      <div>
        <div className="Header">
          <div className="logo">
            <img
              src="https://mobo.lk/wp-content/uploads/2020/11/cropped-logo2_blue-1.png"
              width="55px"
            />
          </div>
          <div className="menu"></div>
        </div>
        {/* <div style={{ paddingTop: "110px" }}>{props.children}</div> */}
      </div>
    );
  } else {
    console.log("THis is not the header");
    return null;
  }
};
export default Header;
