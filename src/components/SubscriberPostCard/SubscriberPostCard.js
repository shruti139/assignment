import React, { useEffect, useRef } from 'react';
import './SubscriberPostCard.css';

const MoreIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
    </svg>
);

const CommentIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);

const SmileIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 13s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
);

const PlayIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="none">
        <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.45)" />
        <polygon points="10,8 18,12 10,16" fill="white" />
    </svg>
);

// Canvas confetti burst
function ConfettiCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = canvas.offsetWidth;
        const H = canvas.height = canvas.offsetHeight;

        const colors = ['#F43F5E', '#F97316', '#FACC15', '#22C55E', '#3B82F6', '#A855F7', '#EC4899'];
        const pieces = Array.from({ length: 55 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H * 0.6 - H * 0.1,
            r: Math.random() * 5 + 3,
            d: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 5,
            tiltSpeed: Math.random() * 0.15,
            shape: Math.random() > 0.5 ? 'rect' : 'circle',
            w: Math.random() * 8 + 4,
            h: Math.random() * 4 + 2,
            angle: Math.random() * Math.PI * 2,
        }));

        let frame;
        let tick = 0;
        const animate = () => {
            ctx.clearRect(0, 0, W, H);
            tick++;
            pieces.forEach(p => {
                p.y += p.d;
                p.angle += p.tiltSpeed;
                p.tilt = Math.sin(p.angle) * 14;
                if (p.y > H + 20) { p.y = -10; p.x = Math.random() * W; }
                ctx.save();
                ctx.translate(p.x + p.tilt, p.y);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.85;
                if (p.shape === 'rect') {
                    ctx.rotate(p.angle);
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            });
            if (tick < 200) frame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frame);
    }, []);

    return <canvas ref={canvasRef} className="confetti-canvas" />;
}

export default function SubscriberPostCard({ data }) {
    const postText = data?.text || '';
    const mediaPreview = data?.mediaPreview || null;

    return (
        <div className="subscriber-post-card">
            {/* Confetti banner */}
            <div className="submission-banner">
                <ConfettiCanvas />
                <span className="submission-label">Your Submission</span>
            </div>

            {/* Post header */}
            <div className="sub-post-header">
                <div className="sub-post-author">
                    <img className="sub-avatar" src="https://i.pravatar.cc/40?img=55" alt="Ashraf Idrishi" />
                    <div>
                        <div className="sub-author-name">Ashraf Idrishi</div>
                        <div className="sub-timestamp">1s</div>
                    </div>
                </div>
                <button className="post-more-btn"><MoreIcon /></button>
            </div>

            {/* Post content */}
            <div className="sub-post-body">
                {postText && <p className="sub-post-text">{postText}</p>}
                {mediaPreview && (
                    <div className="sub-media-thumb">
                        <img src={mediaPreview} alt="Upload" />
                        <div className="play-overlay"><PlayIcon /></div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="sub-post-footer">
                <div className="post-reactions">
                    <button className="reaction-btn">
                        <span className="reaction-emojis">🙏❤️</span>
                        <span className="reaction-count">18</span>
                    </button>
                    <button className="reaction-btn"><SmileIcon /></button>
                    <button className="reaction-btn"><CommentIcon /></button>
                </div>
                <span className="post-comments">10 Comments</span>
            </div>
        </div>
    );
}
