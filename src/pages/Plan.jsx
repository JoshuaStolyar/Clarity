import { useApp } from '../context/AppContext';
import HabitTracker from '../components/HabitTracker';
import './Plan.css';

const STAGES_INFO = {
  finding: {
    title: 'Finding Your Path',
    description: 'Explore different options and discover what truly resonates with you',
    icon: '🔍',
    tips: [
      'Try new activities and hobbies',
      'Talk to people in different fields',
      'Reflect on what energizes you',
      'Notice patterns in what you enjoy'
    ]
  },
  testing: {
    title: 'Testing & Exploring',
    description: 'Experiment with your chosen direction to see if it\'s the right fit',
    icon: '🧪',
    tips: [
      'Start small side projects',
      'Take online courses or workshops',
      'Find mentors in the field',
      'Document what you learn'
    ]
  },
  implementing: {
    title: 'Building Your Future',
    description: 'Take concrete steps to fully commit to your new direction',
    icon: '🚀',
    tips: [
      'Set clear milestones',
      'Build your skills consistently',
      'Network with like-minded people',
      'Track your progress weekly'
    ]
  }
};

function Plan() {
  const { currentGoal, goalStage, updateGoalStage, GOAL_STAGES, checkIns } = useApp();

  const stages = [
    { key: GOAL_STAGES.FINDING, label: 'Finding' },
    { key: GOAL_STAGES.TESTING, label: 'Testing' },
    { key: GOAL_STAGES.IMPLEMENTING, label: 'Implementing' }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === goalStage);
  const currentStageInfo = STAGES_INFO[goalStage];

  const handleStageChange = (newStage) => {
    updateGoalStage(newStage);
  };

  return (
    <div className="plan-page">
      <header className="plan-header">
        <h1 className="plan-title">Your Journey</h1>
        <p className="plan-subtitle">{currentGoal}</p>
      </header>

      <div className="plan-content">
        {/* Stage Progress */}
        <div className="stage-progress-card">
          <h2 className="card-title">Progress Stages</h2>
          <div className="stages-visual">
            {stages.map((stage, index) => (
              <div key={stage.key} className="stage-item">
                <button
                  className={`stage-circle ${goalStage === stage.key ? 'active' : ''} ${index < currentStageIndex ? 'completed' : ''}`}
                  onClick={() => handleStageChange(stage.key)}
                >
                  {index < currentStageIndex ? '✓' : index + 1}
                </button>
                <span className="stage-label">{stage.label}</span>
                {index < stages.length - 1 && (
                  <div className={`stage-connector ${index < currentStageIndex ? 'completed' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Stage Info */}
        <div className="current-stage-card">
          <div className="stage-icon">{currentStageInfo.icon}</div>
          <h2 className="stage-title">{currentStageInfo.title}</h2>
          <p className="stage-description">{currentStageInfo.description}</p>

          <div className="stage-tips">
            <h3 className="tips-title">Focus Areas:</h3>
            <ul className="tips-list">
              {currentStageInfo.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Habit Tracker */}
        <HabitTracker />

        {/* Check-In History */}
        {checkIns.length > 0 && (
          <div className="checkin-history-card">
            <h2 className="card-title">Recent Check-Ins</h2>
            <div className="checkin-list">
              {checkIns.slice(0, 5).map((checkIn) => (
                <div key={checkIn.id} className="checkin-item">
                  <div className="checkin-date">
                    {new Date(checkIn.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="checkin-mood">{getMoodEmoji(checkIn.mood)}</div>
                  {checkIn.note && <div className="checkin-note">{checkIn.note}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getMoodEmoji(mood) {
  const moodMap = {
    worried: '😟',
    uncertain: '😐',
    good: '🙂',
    great: '😄'
  };
  return moodMap[mood] || '🙂';
}

export default Plan;
