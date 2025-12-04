import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Crown, Calendar, Target, TrendingUp, Settings, LogOut, BookOpen } from 'lucide-react';
import './Me.css';

function Me() {
  const { user, checkIns, currentGoal, goalStage, subscriptionTier, resetApp } = useApp();
  const navigate = useNavigate();

  const getDaysSinceStart = () => {
    const savedData = localStorage.getItem('clarityAppData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.user) {
          // This is a simplified version; in production, track actual start date
          return Math.floor(checkIns.length / 0.7); // Estimate based on check-ins
        }
      } catch (error) {
        return 0;
      }
    }
    return 0;
  };

  const getStreak = () => {
    // Simplified streak calculation
    return Math.min(checkIns.length, 30);
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      resetApp();
    }
  };

  const stats = [
    {
      icon: <Calendar size={24} />,
      label: 'Days Active',
      value: getDaysSinceStart()
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Check-Ins',
      value: checkIns.length
    },
    {
      icon: <Target size={24} />,
      label: 'Current Streak',
      value: `${getStreak()} days`
    }
  ];

  return (
    <div className="me-page">
      <header className="me-header">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || '👤'}
        </div>
        <h1 className="profile-name">{user?.name || 'User'}</h1>
        <p className="profile-age">{user?.age ? `${user.age} years old` : ''}</p>
        <div className="subscription-badge">
          {subscriptionTier === 'free' ? (
            <span className="badge-free">Free Plan</span>
          ) : (
            <span className="badge-premium">
              <Crown size={14} />
              Premium {subscriptionTier === 'yearly' ? 'Yearly' : 'Monthly'}
            </span>
          )}
        </div>
      </header>

      <div className="me-content">
        {/* Current Goal */}
        <div className="goal-card">
          <h2 className="section-title">Current Focus</h2>
          <p className="goal-text">{currentGoal}</p>
          <div className="goal-stage">
            Stage: <strong>{goalStage.charAt(0).toUpperCase() + goalStage.slice(1)}</strong>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subscription CTA */}
        {subscriptionTier === 'free' && (
          <div className="upgrade-cta-card">
            <div className="upgrade-icon">
              <Crown size={32} />
            </div>
            <h3 className="upgrade-title">Unlock Premium Features</h3>
            <p className="upgrade-description">
              Get AI coaching, community access, and multiple mentor personalities
            </p>
            <button className="upgrade-button" onClick={handleUpgrade}>
              Upgrade Now
            </button>
          </div>
        )}

        {/* Settings */}
        <div className="settings-card">
          <h2 className="section-title">Settings</h2>
          <div className="settings-list">
            <button className="settings-item" onClick={() => navigate('/journal')}>
              <BookOpen size={20} />
              <span>My Journal</span>
            </button>
            <button className="settings-item" onClick={handleUpgrade}>
              <Crown size={20} />
              <span>Manage Subscription</span>
            </button>
            <button className="settings-item">
              <Settings size={20} />
              <span>Preferences</span>
            </button>
            <button className="settings-item danger" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Reset All Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Me;
