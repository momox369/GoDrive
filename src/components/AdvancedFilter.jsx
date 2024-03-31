import { useState } from 'react';

function AdvancedFilter() {
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

    const togglePopup = () => {
        setShowPopup(!showPopup); // Toggle the visibility state
    };

    return (
        <div>
            <button className="btn btn-outline-body" type="button" onClick={togglePopup}>
                <img src="src/assets/advanced-filter-icon.svg" alt="adv" width="40" height="40" />
            </button>
            {showPopup && ( // Conditionally render the popup div
                <div style={{ position: 'absolute', top: '100px', left: '200px', border: '1px solid black', padding: '10px', width: '50%' }}>

                </div>
            )}
        </div>
    );
}

export default AdvancedFilter;
