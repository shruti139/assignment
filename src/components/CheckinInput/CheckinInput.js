import React from 'react';
import './CheckinInput.css';

export default function CheckinInput({ onCheckinClick }) {
    return (
        <div className="checkin-section">
            <div className="checkin-title-row">
                <span className="checkin-title">Today's check-in</span>
                <span className="checkin-badge">Ends in 20h 44m</span>
            </div>
            <button className="checkin-input-btn" onClick={onCheckinClick}>
                <img
                    className="checkin-avatar"
                    src="https://i.pravatar.cc/36?img=55"
                    alt="Your avatar"
                />
                <span className="checkin-placeholder">Share what you completed today?</span>
            </button>
        </div>
    );
}
