import { X, Flame, Calendar, TrendingUp, BookOpen, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './ProfileModal.css';

function ProfileModal({ isOpen, onClose }) {
  const { user, checkIns, subscriptionTier, resetApp } = useApp();

  if (!isOpen) return null;

  // Calculate streak
  const calculateStreak = () => {
    if (checkIns.length === 0) return 0;

    const sortedCheckIns = [...checkIns].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const checkIn of sortedCheckIns) {
      const checkInDate = new Date(checkIn.timestamp);
      checkInDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((currentDate - checkInDate) / (1000 * 60 * 60 * 24));

      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  };

  // Calculate days since first check-in (app usage)
  const getDaysSinceStart = () => {
    if (checkIns.length === 0) return 0;

    const oldestCheckIn = checkIns.reduce((oldest, checkIn) => {
      const checkInDate = new Date(checkIn.timestamp);
      const oldestDate = new Date(oldest.timestamp);
      return checkInDate < oldestDate ? checkIn : oldest;
    }, checkIns[0]);

    const daysSince = Math.floor(
      (new Date() - new Date(oldestCheckIn.timestamp)) / (1000 * 60 * 60 * 24)
    );

    return daysSince;
  };

  // Calculate level (based on total check-ins)
  const getLevel = () => {
    return Math.floor(checkIns.length / 7) + 1;
  };

  const streak = calculateStreak();
  const daysSinceStart = getDaysSinceStart();
  const level = getLevel();
  const progress = (checkIns.length % 7) / 7 * 100;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user?.name || 'Friend'}</h2>
            <p className="profile-tier">
              {subscriptionTier === 'free' ? 'Free Plan' :
               subscriptionTier === 'monthly' ? 'Premium Monthly' : 'Premium Yearly'}
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon fire">
              <Flame size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon calendar">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{daysSinceStart}</div>
              <div className="stat-label">Days on Clarity</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon level">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">Level {level}</div>
              <div className="stat-label">Current Level</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon logs">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{checkIns.length}</div>
              <div className="stat-label">Total Check-ins</div>
            </div>
          </div>
        </div>

        <div className="level-progress">
          <div className="level-progress-header">
            <span className="level-progress-label">Progress to Level {level + 1}</span>
            <span className="level-progress-count">{checkIns.length % 7}/7 check-ins</span>
          </div>
          <div className="level-progress-bar">
            <div
              className="level-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-action-button settings-button">
            <Settings size={18} />
            Settings
          </button>
          <button
            className="profile-action-button reset-button"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
                resetApp();
                onClose();
              }
            }}
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
