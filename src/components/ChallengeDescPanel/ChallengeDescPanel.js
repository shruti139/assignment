import React from 'react';
import './ChallengeDescPanel.css';

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export default function ChallengeDescPanel({ onClose }) {
    return (
        <>
            <div className="panel-backdrop" onClick={onClose} />
            <aside className="desc-panel">
                <div className="desc-panel-header">
                    <button className="panel-close-btn" onClick={onClose}><CloseIcon /></button>
                    <h2 className="desc-panel-title">Challenge Description</h2>
                </div>

                {/* Cover with rings */}
                <div className="desc-panel-cover">
                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=80" alt="Challenge cover" />
                    <div className="desc-rings">
                        {[25, 50, 75].map(pct => (
                            <div key={pct} className="desc-ring-wrap">
                                <svg width="44" height="44" viewBox="0 0 44 44">
                                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3.5" />
                                    <circle cx="22" cy="22" r="18" fill="none"
                                        stroke={pct === 75 ? '#F87171' : pct === 50 ? '#60A5FA' : '#FFFFFF'}
                                        strokeWidth="3.5"
                                        strokeDasharray={`${2 * Math.PI * 18 * pct / 100} ${2 * Math.PI * 18}`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 22 22)"
                                    />
                                </svg>
                                <span className="desc-ring-label">{pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="desc-panel-body">
                    <h3 className="desc-panel-challenge-title">9-Day Fitness Challenge</h3>

                    <div className="desc-stat-row">
                        <div className="desc-stat-box">
                            <span className="stat-label">Total Checkins</span>
                            <span className="stat-value">9</span>
                        </div>
                        <div className="desc-stat-box">
                            <span className="stat-label">Participants Joined</span>
                            <span className="stat-value">75</span>
                        </div>
                    </div>

                    <div className="desc-text-section">
                        <p className="desc-label">Description</p>
                        <p className="desc-content">
                            This 9-day fitness challenge is designed to help you build the habit of showing up every day.
                            You'll complete one small, focused action daily—without overwhelm—to build clarity and confidence,
                            and to prove that consistency, not motivation, is what drives real and lasting progress.
                        </p>
                    </div>
                </div>

                <div className="desc-panel-footer">
                    <button className="got-it-btn" onClick={onClose}>Got it</button>
                </div>
            </aside>
        </>
    );
}
