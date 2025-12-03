import { useState } from 'react';
import './SmallStep.css';

function SmallStep({ task }) {
  const [isDone, setIsDone] = useState(false);

  const handleMarkDone = () => {
    setIsDone(!isDone);
    console.log('Task marked as:', !isDone ? 'done' : 'not done');
  };

  return (
    <div className="small-step-card">
      <h2 className="step-title">Today's Small Step</h2>

      <div className="step-task">
        <span className="task-icon">📝</span>
        <p className="task-text">{task}</p>
      </div>

      <button
        className={`mark-done-button ${isDone ? 'done' : ''}`}
        onClick={handleMarkDone}
      >
        {isDone ? 'Completed ✓' : 'Mark as Done'}
      </button>
    </div>
  );
}

export default SmallStep;
