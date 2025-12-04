import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Plus, X } from 'lucide-react';
import './HabitTracker.css';

function HabitTracker() {
  const { habits, toggleHabit, addHabit, deleteHabit } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('✨');

  const icons = ['✨', '💪', '📚', '🎯', '🏃', '🧘', '💧', '🥗', '😴', '🎨', '✍️', '🎵'];

  const today = new Date().toDateString();

  const isCompletedToday = (habit) => {
    return habit.completedDates.includes(today);
  };

  const getStreak = (habit) => {
    if (habit.completedDates.length === 0) return 0;

    const sortedDates = habit.completedDates
      .map(dateStr => new Date(dateStr))
      .sort((a, b) => b - a);

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const date of sortedDates) {
      date.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));

      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  };

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit(newHabitName, selectedIcon);
      setNewHabitName('');
      setSelectedIcon('✨');
      setIsAdding(false);
    }
  };

  return (
    <div className="habit-tracker-card">
      <div className="habit-tracker-header">
        <h2 className="habit-tracker-title">Daily Habits</h2>
        {!isAdding && (
          <button
            className="add-habit-icon-button"
            onClick={() => setIsAdding(true)}
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      {isAdding && (
        <div className="add-habit-form">
          <input
            type="text"
            className="habit-name-input"
            placeholder="Habit name..."
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddHabit();
              if (e.key === 'Escape') setIsAdding(false);
            }}
            autoFocus
          />
          <div className="icon-selector">
            {icons.map((icon) => (
              <button
                key={icon}
                className={`icon-option ${selectedIcon === icon ? 'selected' : ''}`}
                onClick={() => setSelectedIcon(icon)}
              >
                {icon}
              </button>
            ))}
          </div>
          <div className="habit-form-actions">
            <button className="habit-form-button cancel" onClick={() => setIsAdding(false)}>
              Cancel
            </button>
            <button className="habit-form-button save" onClick={handleAddHabit}>
              Add Habit
            </button>
          </div>
        </div>
      )}

      <div className="habits-list">
        {habits.map((habit) => {
          const completed = isCompletedToday(habit);
          const streak = getStreak(habit);

          return (
            <div key={habit.id} className="habit-item">
              <button
                className={`habit-checkbox ${completed ? 'completed' : ''}`}
                onClick={() => toggleHabit(habit.id)}
              >
                {completed && <Check size={16} />}
              </button>
              <div className="habit-info">
                <div className="habit-name">
                  <span className="habit-icon">{habit.icon}</span>
                  <span>{habit.name}</span>
                </div>
                {streak > 0 && (
                  <div className="habit-streak">
                    🔥 {streak} day{streak !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
              <button
                className="delete-habit-button"
                onClick={() => {
                  if (window.confirm(`Delete "${habit.name}"?`)) {
                    deleteHabit(habit.id);
                  }
                }}
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitTracker;
