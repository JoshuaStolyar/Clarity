import { useState } from 'react';
import { Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CurrentFocus from '../components/CurrentFocus';
import DailyCheckIn from '../components/DailyCheckIn';
import SmallStep from '../components/SmallStep';
import DailyInspiration from '../components/DailyInspiration';
import ProfileModal from '../components/ProfileModal';
import './Today.css';

const GOAL_STAGE_TASKS = {
  finding: 'Write down 3 things you enjoy doing that don\'t feel like work.',
  testing: 'Try out one activity related to your potential path today.',
  implementing: 'Take one concrete action toward building your new direction.'
};

function Today() {
  const { user, currentGoal, goalStage } = useApp();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentTask = () => {
    return GOAL_STAGE_TASKS[goalStage] || GOAL_STAGE_TASKS.finding;
  };

  return (
    <>
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
      <div className="today-page">
        <header className="today-header">
          <div className="header-content">
            <div>
              <h1 className="greeting">{getGreeting()}, {user?.name || 'Friend'} 👋</h1>
              <p className="tagline">Let's move 1% closer to who you want to be.</p>
            </div>
            <button
              className="settings-button-header"
              onClick={() => setShowProfileModal(true)}
            >
              <Settings size={22} />
            </button>
          </div>
        </header>

        <div className="today-content">
          <CurrentFocus focus={currentGoal || 'Find your purpose'} />
          <DailyInspiration />
          <DailyCheckIn />
          <SmallStep task={getCurrentTask()} />
        </div>
      </div>
    </>
  );
}

export default Today;
