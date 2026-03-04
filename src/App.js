import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import FeedPostCard from './components/FeedPostCard/FeedPostCard';
import SubscriberPostCard from './components/SubscriberPostCard/SubscriberPostCard';
import CheckinInput from './components/CheckinInput/CheckinInput';
import JoinModal from './components/JoinModal/JoinModal';
import CheckinModal from './components/CheckinModal/CheckinModal';
import ChallengeDescPanel from './components/ChallengeDescPanel/ChallengeDescPanel';

const MOCK_FEED = [
  {
    id: 1,
    author: { name: 'Russell Brunson', avatar: 'https://i.pravatar.cc/40?img=11', initial: null, color: null },
    timestamp: '3 hrs ago',
    isPinned: true,
    content: `This 9-day fitness challenge is designed to help you build consistency, boost energy, and feel stronger—one day at a time. Each day comes with a simple, achievable fitness task that fits easily into your routine, no matter your current fitness level.`,
    steps: ['Minimum 20 minutes of sit-up', 'Mention Intensity', 'Upload Media (Optional)', 'Upload Media (Optional)', 'Upload Media (Optional)'],
    reactions: { pray: 18 },
    comments: 10,
  },
  {
    id: 2,
    author: { name: 'Sayantan Chandra', avatar: null, initial: 'S', color: '#C89B00' },
    timestamp: '1 hrs ago',
    isPinned: false,
    content: `Completed today's challenge workout, one step closer to my goal.`,
    steps: null,
    reactions: { pray: 18 },
    comments: 10,
  },
  {
    id: 3,
    author: { name: 'Pappu Saha', avatar: 'https://i.pravatar.cc/40?img=33', initial: null, color: null },
    timestamp: '2 day ago',
    isPinned: false,
    content: `Today's challenge workout completed—feeling stronger already`,
    steps: null,
    reactions: { pray: 12 },
    comments: 7,
  },
  {
    id: 4,
    author: { name: 'Meera Nair', avatar: null, initial: 'M', color: '#6366F1' },
    timestamp: '3 day ago',
    isPinned: false,
    content: `Day 1 done! Feeling great after completing the workout. Consistency is key!`,
    steps: null,
    reactions: { pray: 9 },
    comments: 4,
  },
];

const TOTAL_DAYS = 9;

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [appState, setAppState] = useState('before-joining');
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [showDescPanel, setShowDescPanel] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [checkinSubmissions, setCheckinSubmissions] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleJoin = () => setAppState('feed');

  const handleSubmitCheckin = (data) => {
    setShowCheckinModal(false);
    setAppState('submitted');
    setCheckinSubmissions(prev => [{ ...data, id: Date.now() }, ...prev]);
    setCompletedDays(prev => prev.includes(selectedDay) ? prev : [...prev, selectedDay]);
  };

  return (
    <div className="app">
      <Header
        theme={theme}
        onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        selectedDay={selectedDay}
        totalDays={TOTAL_DAYS}
        onInfoClick={() => setShowDescPanel(true)}
      />
      <div className="app-body">
        <Sidebar
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
          completedDays={completedDays}
          totalDays={TOTAL_DAYS}
        />
        <main className="main-content">
          <div className="feed-container">
            {appState !== 'before-joining' && (
              <CheckinInput onCheckinClick={() => setShowCheckinModal(true)} />
            )}
            {appState === 'submitted' && checkinSubmissions.map(sub => (
              <SubscriberPostCard key={sub.id} data={sub} />
            ))}
            {appState !== 'before-joining' && (
              <div className="feed-section">
                <div className="feed-section-header">
                  <div className="feed-section-title">
                    <span>See what others</span>
                    <span className="avatar-stack">
                      <img src="https://i.pravatar.cc/24?img=10" alt="" />
                      <img src="https://i.pravatar.cc/24?img=20" alt="" />
                      <img src="https://i.pravatar.cc/24?img=30" alt="" />
                    </span>
                    <span>shared</span>
                  </div>
                  <div className="feed-section-sub">85+ participants already completed</div>
                </div>
                {MOCK_FEED.map(post => <FeedPostCard key={post.id} post={post} />)}
              </div>
            )}
          </div>
        </main>
      </div>

      {appState === 'before-joining' && (
        <JoinModal onClose={handleJoin} onJoin={handleJoin} />
      )}
      {showCheckinModal && (
        <CheckinModal onClose={() => setShowCheckinModal(false)} onSubmit={handleSubmitCheckin} />
      )}
      {showDescPanel && (
        <ChallengeDescPanel onClose={() => setShowDescPanel(false)} />
      )}
    </div>
  );
}
