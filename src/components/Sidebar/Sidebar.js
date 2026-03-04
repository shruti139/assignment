import './Sidebar.css';

const LockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
);

const CheckIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);

const ROW_HEIGHT = 44;

export default function Sidebar({ selectedDay, onDaySelect, completedDays, totalDays }) {
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const selectedIndex = days.indexOf(selectedDay);

    return (
        <aside className="sidebar">
            <div className="sidebar-inner">
                <div className="sidebar-list" style={{ '--row-height': `${ROW_HEIGHT}px` }}>

                    {/* Sliding indicator pill */}
                    <div
                        className="day-indicator"
                        style={{ transform: `translateY(${selectedIndex * ROW_HEIGHT}px)` }}
                    />

                    {days.map((day) => {
                        const isSelected = selectedDay === day;
                        const isCompleted = completedDays.includes(day);
                        const maxUnlocked = Math.max(...completedDays, 0) + 1;
                        const isLocked = day > maxUnlocked;
                        const isCurrent = day === selectedDay && !isCompleted;

                        return (
                            <button
                                key={day}
                                className={`day-row${isSelected ? ' selected' : ''}${isCompleted ? ' completed' : ''}${isLocked ? ' locked' : ''}`}
                                onClick={() => !isLocked && onDaySelect(day)}
                                style={{ height: ROW_HEIGHT }}
                                aria-current={isSelected ? 'step' : undefined}
                            >
                                <span className="day-label">Day - {day}</span>

                                <span className="day-status-icon">
                                    {isCompleted ? (
                                        <span className="status-check">
                                            <CheckIcon />
                                        </span>
                                    ) : isLocked ? (
                                        <span className="status-lock">
                                            <LockIcon />
                                        </span>
                                    ) : isCurrent ? (
                                        <span className="status-clock">
                                            <ClockIcon />
                                        </span>
                                    ) : null}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Gradient fade at bottom */}
                <div className="sidebar-fade" />
            </div>
        </aside>
    );
}