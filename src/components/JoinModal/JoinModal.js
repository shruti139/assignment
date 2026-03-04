import React from 'react';
import './JoinModal.css';

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const PlayButtonIcon = () => (
    <div className="play-circle">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
        </svg>
    </div>
);

export default function JoinModal({ onClose, onJoin }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="join-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}><CloseIcon /></button>

                {/* Cover image with progress rings */}
                <div className="join-cover">
                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=80" alt="Challenge cover" />
                    <div className="progress-rings">
                        {[25, 50, 75].map(pct => (
                            <div key={pct} className="progress-ring-wrap">
                                <svg width="44" height="44" viewBox="0 0 44 44">
                                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3.5" />
                                    <circle
                                        cx="22" cy="22" r="18" fill="none"
                                        stroke={pct === 75 ? '#F87171' : pct === 50 ? '#60A5FA' : '#FFFFFF'}
                                        strokeWidth="3.5"
                                        strokeDasharray={`${2 * Math.PI * 18 * pct / 100} ${2 * Math.PI * 18}`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 22 22)"
                                    />
                                </svg>
                                <span className="ring-label">{pct}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="heartbeat-line">
                        <svg viewBox="0 0 160 30" preserveAspectRatio="none">
                            <polyline points="0,15 20,15 30,5 38,25 46,15 60,15 68,8 74,22 80,15 160,15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
                        </svg>
                    </div>
                </div>

                <div className="join-body">
                    <h2 className="join-title">9-Day Fitness Challenge</h2>

                    <div className="join-meta">
                        <div className="join-checkins">
                            <PlayButtonIcon />
                            <span>9 checkins</span>
                        </div>
                        <div className="join-participants">
                            <div className="participant-avatars">
                                <img src="https://i.pravatar.cc/24?img=10" alt="" />
                                <img src="https://i.pravatar.cc/24?img=20" alt="" />
                                <img src="https://i.pravatar.cc/24?img=30" alt="" />
                            </div>
                            <span>+75 participants joined</span>
                        </div>
                    </div>

                    <div className="join-description">
                        <h3 className="desc-heading">Description</h3>
                        <p className="desc-text">
                            This 9-day fitness challenge is designed to help you build consistency, boost energy,
                            and feel stronger—one day at a time. Each day comes with a simple, achievable fitness
                            task that fits easily into your routine, no matter your current fitness level.
                        </p>
                    </div>

                    <div className="join-cta">
                        <p className="cta-sub">Join the challenge and start your journey</p>
                        <button className="join-btn" onClick={onJoin}>Join Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
