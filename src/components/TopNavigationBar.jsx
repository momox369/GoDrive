import ProfileIcon from './ProfileIcon';
import Settings from './Settings';
import AdvancedFilter from "./AdvancedFilter.jsx";
import SearchBar from "./SearchBar.jsx";

function TopNavigationBar() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <a className="navbar-brand">
                        <img src="src/assets/godrive-logo.svg" alt="Logo" width="70" height="70" className="d-inline-block align-text-top" />
                    </a>
                    <a className="navbar-brand mb-0 h1" href="#">
                        <h2 className="text-primary-emphasis">GoDrive</h2>
                    </a>
                </div>


                <SearchBar></SearchBar>


                <div className="d-flex align-items-center">
                    <Settings></Settings>
                    <ProfileIcon> </ProfileIcon>
                </div>
            </div>
        </nav>
    );
}

export default TopNavigationBar;
