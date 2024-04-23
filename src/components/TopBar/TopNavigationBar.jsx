import "./topnav.scss";
import logo from "../../assets/logo.png";
import ProfileIcon from "./ProfileIcon";
import Settings from "./Settings";
import SearchBar from "./SearchBar.jsx";

function TopNavigationBar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-start align-items-center">
        
        <SearchBar />
        <div className="d-flex align-items-center ms-auto">
          <Settings />
          <ProfileIcon />
        </div>
      </div>
    </nav>
  );
}

export default TopNavigationBar;
