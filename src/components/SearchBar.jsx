import AdvancedFilter from "./AdvancedFilter.jsx";


function SearchBar() {
    return (
            <form className="d-flex p-3" role="search" style={{flexGrow: 1, justifyContent: 'center'}}>
                <AdvancedFilter></AdvancedFilter>
                <input className="form-control form-control-lg me-2" type="search" placeholder="Search"
                       aria-label="Search" style={{maxWidth: '500px'}}/>
                <button className="btn btn-outline-primary" type="submit">GO</button>
            </form>
    );
}

export default SearchBar;