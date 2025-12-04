import { useApp } from '../context/AppContext';
import './SmallStep.css';

function SmallStep({ task }) {
  const { checkIns, goalStage, GOAL_STAGES } = useApp();

  // Calculate progress based on check-ins this week
  const getWeekProgress = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const thisWeekCheckIns = checkIns.filter(checkIn => {
      const checkInDate = new Date(checkIn.timestamp);
      return checkInDate >= weekStart;
    });

    const daysCompleted = new Set(
      thisWeekCheckIns.map(checkIn => new Date(checkIn.timestamp).toDateString())
    ).size;

    return Math.min(Math.round((daysCompleted / 7) * 100), 100);
  };

  const getStageEmoji = () => {
    switch(goalStage) {
      case GOAL_STAGES.FINDING: return '🔍';
      case GOAL_STAGES.TESTING: return '🧪';
      case GOAL_STAGES.IMPLEMENTING: return '🚀';
      default: return '📝';
    }
  };

  const progress = getWeekProgress();

  return (
    <div className="small-step-card">
      <h2 className="step-title">Today's Small Step</h2>

      <div className="step-task">
        <span className="task-icon">{getStageEmoji()}</span>
        <p className="task-text">{task}</p>
      </div>

      <div className="progress-tracker">
        <div className="progress-info">
          <span className="progress-label">Weekly Progress</span>
          <span className="progress-text">{progress}%</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.max(progress, 2)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default SmallStep;
