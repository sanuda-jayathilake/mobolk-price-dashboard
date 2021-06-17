import "../src/styles.css";
const SideNav = (props) => {
  if (sessionStorage.getItem("AUTHORIZATION") === "SUCCESS") {
    return (
      <div className="sideNavBar">
        {/* <span style={{ color: "white", fontSize: "20px" }}>Navigation Menu</span>
        <ul>
          <li>Apple</li>
          <li>Samsung</li>
          <li>Xiaomi</li>
          <li>Oppo</li>
          <li>Nokia</li>
        </ul> */}
      </div>
    );
  } else {
    return null;
  }
};
export default SideNav;
