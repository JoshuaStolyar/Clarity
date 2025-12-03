import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './DailyCheckIn.css';

const moods = [
  { emoji: '😟', label: 'Feeling worried', value: 'worried' },
  { emoji: '😐', label: 'Feeling uncertain', value: 'uncertain' },
  { emoji: '🙂', label: 'Feeling good today', value: 'good' },
  { emoji: '😄', label: 'Feeling great', value: 'great' },
];

function DailyCheckIn() {
  const [selectedMood, setSelectedMood] = useState('good');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addCheckIn } = useApp();

  const handleCheckIn = () => {
    addCheckIn({ mood: selectedMood, note });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setNote('');
    }, 2000);
  };

  const getSelectedMoodLabel = () => {
    return moods.find(m => m.value === selectedMood)?.label || '';
  };

  return (
    <div className="daily-checkin-card">
      <h2 className="checkin-title">Daily Check-In</h2>

      <p className="checkin-question">
        How are you feeling about your direction today?
      </p>

      <div className="mood-selector">
        {moods.map((mood) => (
          <button
            key={mood.value}
            className={`mood-button ${selectedMood === mood.value ? 'selected' : ''}`}
            onClick={() => setSelectedMood(mood.value)}
          >
            <span className="mood-emoji">{mood.emoji}</span>
          </button>
        ))}
      </div>

      <p className="mood-label">{getSelectedMoodLabel()}</p>

      <textarea
        className="checkin-input"
        placeholder="One sentence about today..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
      />

      <button className="checkin-button" onClick={handleCheckIn} disabled={submitted}>
        {submitted ? 'Saved! ✓' : 'Check In'}
      </button>
    </div>
  );
}

export default DailyCheckIn;
