import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "./styles.css";
// import Headers from "../src/Headers";
import SideNav from "../src/SideNav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchViewContainer from "../src/pages/Search/SearchPhone.container";
import LoginViewContainer from "./pages/Login/LoginView.container";

export default function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <ReactNotification />
          <div className="mainContainer">
            <div className="mainNavigationContainer">
              {/* <SideNav /> */}
            </div>
            <div className="mainInnerContainer">
              <Route path="/" exact component={LoginViewContainer} />
              <Route path="/admin-panel" component={SearchViewContainer} />
              {/* <Route path="/apple" component={iPhones} />
                <Route path="/search" component={SearchViewContainer} /> */}
            </div>
          </div>
        </div>
      </Switch>
    </Router>
  );
}
