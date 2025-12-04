import { useState, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './CurrentFocus.css';

function CurrentFocus({ focus }) {
  const { updateGoal } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(focus);

  // Update editValue when focus prop changes
  useEffect(() => {
    setEditValue(focus);
  }, [focus]);

  const handleSave = () => {
    if (editValue.trim()) {
      updateGoal(editValue);
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
          <input
            type="text"
            className="focus-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            autoFocus
            placeholder="What's your current focus?"
          />
          <div className="focus-actions">
            <button className="focus-action-button save" onClick={handleSave}>
              <Check size={16} />
            </button>
            <button className="focus-action-button cancel" onClick={handleCancel}>
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="focus-text">{focus}</div>
      )}
    </div>
  );
}

export default CurrentFocus;
