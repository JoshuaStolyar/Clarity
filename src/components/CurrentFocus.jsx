import { useState, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './CurrentFocus.css';

const FOCUS_OPTIONS = [
  { value: 'finding', label: 'Finding what I love', icon: '🔍' },
  { value: 'implementing', label: 'Building my future', icon: '🚀' },
  { value: 'learning', label: 'Learning & getting good', icon: '📚' },
  { value: 'exploring', label: 'Exploring different paths', icon: '🗺️' },
  { value: 'career-change', label: 'Changing careers', icon: '🔄' },
  { value: 'purpose', label: 'Finding my purpose', icon: '🎯' }
];

function CurrentFocus({ focus }) {
  const { updateGoal } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(focus);

  // Update editValue when focus prop changes
  useEffect(() => {
    setEditValue(focus);
  }, [focus]);

  const handleSave = (selectedOption) => {
    if (selectedOption) {
      updateGoal(selectedOption.label);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(focus);
    setIsEditing(false);
  };

  return (
    <div className="current-focus-card">
      <div className="focus-header">
        <div className="focus-label">Current focus</div>
        {!isEditing && (
          <button
            className="focus-edit-button"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 size={14} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="focus-edit-mode">
          <div className="focus-options-grid">
            {FOCUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`focus-option-card ${editValue === option.label ? 'selected' : ''}`}
                onClick={() => handleSave(option)}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-label">{option.label}</span>
              </button>
            ))}
          </div>
          <button className="focus-cancel-button" onClick={handleCancel}>
            <X size={16} />
            Cancel
          </button>
        </div>
      ) : (
        <div className="focus-text">{focus}</div>
      )}
    </div>
  );
}

export default CurrentFocus;
