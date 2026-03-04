import React, { useState } from 'react';
import './FeedPostCard.css';

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

function Avatar({ author }) {
    if (author.avatar) {
        return <img className="post-avatar-img" src={author.avatar} alt={author.name} />;
    }
    return (
        <div className="post-avatar-initial" style={{ background: author.color || '#6366F1' }}>
            {author.initial}
        </div>
    );
}

export default function FeedPostCard({ post }) {
    const [reacted, setReacted] = useState(false);

    return (
        <div className="feed-post-card">
            {post.isPinned && (
                <div className="pinned-badge">
                    <span className="pin-icon">📌</span>
                    <span>This is a pinned post</span>
                </div>
            )}

            <div className="post-header">
                <div className="post-author-wrap">
                    <div className="post-avatar">
                        <Avatar author={post.author} />
                    </div>
                    <div className="post-author-info">
                        <span className="post-author-name">{post.author.name}</span>
                        <span className="post-timestamp">{post.timestamp}</span>
                    </div>
                </div>
                <button className="post-more-btn"><MoreIcon /></button>
            </div>

            <div className="post-body">
                <p className="post-content">{post.content}</p>

                {post.steps && (
                    <ol className="post-steps">
                        {post.steps.map((step, i) => (
                            <li key={i} className="post-step-item">
                                <span className="step-num">{i + 1}</span>
                                <span className="step-text">{step}</span>
                            </li>
                        ))}
                    </ol>
                )}
            </div>

            <div className="post-footer">
                <div className="post-reactions">
                    <button
                        className={`reaction-btn ${reacted ? 'reacted' : ''}`}
                        onClick={() => setReacted(r => !r)}
                    >
                        <span className="reaction-emojis">🙏❤️</span>
                        <span className="reaction-count">{post.reactions.pray + (reacted ? 1 : 0)}</span>
                    </button>
                    <button className="reaction-btn">
                        <SmileIcon />
                    </button>
                    <button className="reaction-btn comment-btn">
                        <CommentIcon />
                    </button>
                </div>
                <span className="post-comments">{post.comments} Comments</span>
            </div>
        </div>
    );
}
