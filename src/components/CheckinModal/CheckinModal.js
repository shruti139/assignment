import React, { useState } from 'react';
import './CheckinModal.css';

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const UploadIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

export default function CheckinModal({ onClose, onSubmit }) {
    const [text, setText] = useState('');
    const [mediaPreview, setMediaPreview] = useState(null);
    const canSubmit = text.trim().length > 0 || mediaPreview;

    const handleFileChange = e => {
        const file = e.target.files?.[0];
        if (file) setMediaPreview(URL.createObjectURL(file));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="checkin-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}><CloseIcon /></button>

                {/* User info */}
                <div className="checkin-modal-header">
                    <img className="checkin-modal-avatar" src="https://i.pravatar.cc/80?img=55" alt="Ashraf Idrishi" />
                    <h3 className="checkin-modal-name">Ashraf Idrishi</h3>
                </div>

                {/* Text area */}
                <textarea
                    className="checkin-textarea"
                    placeholder="What did you complete today?"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rows={3}
                />

                {/* Media upload area */}
                {!mediaPreview ? (
                    <label className="upload-zone">
                        <input type="file" accept="image/*,video/*" onChange={handleFileChange} hidden />
                        <div className="upload-icon-wrap"><UploadIcon /></div>
                        <span className="upload-label">Upload</span>
                        <span className="upload-hint">Images/Videos should be horizontal, at least 1280×720px.<br />The maximum image size should be 2MB.</span>
                    </label>
                ) : (
                    <div className="media-preview-wrap">
                        <img src={mediaPreview} alt="preview" className="media-preview" />
                        <button className="remove-media" onClick={() => setMediaPreview(null)}>✕</button>
                        <div className="play-badge">▶</div>
                    </div>
                )}

                {/* Footer actions */}
                <div className="checkin-modal-footer">
                    <div className="media-action-btns">
                        <label className="media-icon-btn photo-btn" title="Add image">
                            <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                        </label>
                        <label className="media-icon-btn video-btn" title="Add video">
                            <input type="file" accept="video/*" onChange={handleFileChange} hidden />
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                        </label>
                        <button className="media-icon-btn emoji-btn" title="Add emoji">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><path d="M8 13s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                            </svg>
                        </button>
                    </div>
                    <button
                        className={`submit-checkin-btn ${canSubmit ? 'active' : ''}`}
                        onClick={canSubmit ? () => onSubmit({ text, mediaPreview }) : undefined}
                        disabled={!canSubmit}
                    >
                        Submit Checkin
                    </button>
                </div>
            </div>
        </div>
    );
}
