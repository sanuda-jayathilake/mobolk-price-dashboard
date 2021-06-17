import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
// const history = useHistory();
export class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      session: sessionStorage.getItem("AUTHORIZATION"),
      userLoggedOut: false,
    };
  }
  loadHeader = () => {};
  componentDidMount(props) {
    this.handleUserSession();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedIn !== this.state.isLoggedIn) {
    }
  }
  handleUserSession = () => {
    if (sessionStorage.getItem("AUTHORIZATION") === "SUCCESS") {
      this.setState({ isLoggedIn: true });
    }
  };
  logout = () => {
    sessionStorage.clear();
    // useHistory.push("/");
    this.setState({ isLoggedIn: false, userLoggedOut: true });
  };
  render() {
    // this.handleUserSession()
    const { isLoggedIn, session, userLoggedOut } = this.state;
    if (isLoggedIn && session === "SUCCESS") {
      return (
        <div>
          <div className="Header">
            <div className="logo" style={{ flex: 5 }}>
              <img
                src="https://mobo.lk/wp-content/uploads/2020/12/Mobo.lk-logo-removebg-preview.png"
                width="255px"
              />
            </div>
            <div style={{ flex: 1 }}>
              <Button
                size="small"
                onClick={this.logout}
                style={{
                  backgroundColor: "#21B0CA",
                  color: "white",
                  padding: "10px",
                  marginTop: "-40px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Log Out
              </Button>
            </div>
            {/* <div className="menu"></div> */}
          </div>
          <div style={{ paddingTop: "110px" }}>{this.props.children}</div>
        </div>
      );
    } else if (userLoggedOut) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    } else {
      return null;
    }
  }
}

export default Headers;
