import { useState } from "react";

function Settings() {
    const [showSettings, setShowSettings] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const settingsOptions = ["Edit Profile", "Contact Us"];

    const togglePopup = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div>
            <button className="btn" type="button" onClick={togglePopup}>
                <img className="me-4" src="src/assets/settings.png" alt="settings" width="35" height="35" />
            </button>
            {showSettings && (
                <div style={{ position: 'absolute', top: '70px', right: '100px', padding: '10px', width: '20%' }}>
                    <ul className="list-group">
                        {settingsOptions.map((option, index) => (
                            <li key={option} className= {selectedIdx === index ? "list-group-item active" : "list-group-item"}
                            onClick={() => setSelectedIdx(index)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Settings;
