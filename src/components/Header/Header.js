import React from 'react';
import './Header.css';

const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
);

const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
);

const SunIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
);

const MoonIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
);

export default function Header({ theme, onThemeToggle, selectedDay, totalDays, onInfoClick }) {
    return (
        <header className="header">
            {/* Logo */}
            <div className="header-logo">
                <span className="logo-icon-wrap">
                    <span className="logo-ring"><span className="logo-dot" /></span>
                </span>
                <span className="logo-text">
                    <span className="logo-backstage">Backstage</span>
                    <span className="logo-pass">Pass</span>
                </span>
            </div>

            {/* Back + Day breadcrumb */}
            <div className="header-nav">
                <button className="nav-back-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <span className="nav-sep" />
                <span className="nav-day-label">Day {selectedDay} of {totalDays}</span>
            </div>

            {/* Right side */}
            <div className="header-right">
                <div className="challenge-meta">
                    <span className="challenge-title">9-Day Fitness Challenge</span>
                    <button className="icon-btn" onClick={onInfoClick} title="Challenge info"><InfoIcon /></button>
                </div>
                <div className="header-actions">
                    <div className="streak-badge">
                        <span>🔥</span><span className="streak-num">30</span>
                    </div>
                    <button className="icon-btn" title="Notifications"><BellIcon /></button>
                    <button className="icon-btn theme-btn" onClick={onThemeToggle} title="Toggle theme">
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <div className="user-avatar">
                        <img src="https://i.pravatar.cc/36?img=55" alt="User avatar" />
                    </div>
                </div>
            </div>
        </header>
    );
}
