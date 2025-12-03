import { useApp } from '../context/AppContext';
import CurrentFocus from '../components/CurrentFocus';
import DailyCheckIn from '../components/DailyCheckIn';
import SmallStep from '../components/SmallStep';
import './Today.css';

const GOAL_STAGE_TASKS = {
  finding: 'Write down 3 things you enjoy doing that don\'t feel like work.',
  testing: 'Try out one activity related to your potential path today.',
  implementing: 'Take one concrete action toward building your new direction.'
};

function Today() {
  const { user, currentGoal, goalStage } = useApp();

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
    <div className="today-page">
      <header className="today-header">
        <h1 className="greeting">{getGreeting()}, {user?.name || 'Friend'} 👋</h1>
        <p className="tagline">Let's move 1% closer to who you want to be.</p>
      </header>

      <div className="today-content">
        <CurrentFocus focus={currentGoal || 'Find your purpose'} />
        <DailyCheckIn />
        <SmallStep task={getCurrentTask()} />
      </div>
    </div>
  );
}

export default Today;
