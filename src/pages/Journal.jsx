import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PenLine, Calendar, Trash2, Edit, X, Check } from 'lucide-react';
import './Journal.css';

function Journal() {
  const { journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useApp();
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({ title: '', content: '' });

  const handleSaveNew = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      addJournalEntry(newEntry);
      setNewEntry({ title: '', content: '' });
      setIsWriting(false);
    }
  };

  const handleStartEdit = (entry) => {
    setEditingId(entry.id);
    setEditValue({ title: entry.title, content: entry.content });
  };

  const handleSaveEdit = () => {
    if (editValue.title.trim() && editValue.content.trim()) {
      updateJournalEntry(editingId, editValue);
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      deleteJournalEntry(id);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="journal-page">
      <header className="journal-header">
        <div>
          <h1 className="journal-title">Journal</h1>
          <p className="journal-subtitle">Reflect on your journey</p>
        </div>
        {!isWriting && (
          <button
            className="new-entry-button"
            onClick={() => setIsWriting(true)}
          >
            <PenLine size={18} />
            New Entry
          </button>
        )}
      </header>

      <div className="journal-content">
        {isWriting && (
          <div className="journal-editor-card">
            <input
              type="text"
              className="journal-title-input"
              placeholder="Entry title..."
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              autoFocus
            />
            <textarea
              className="journal-content-input"
              placeholder="What's on your mind?"
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              rows={8}
            />
            <div className="editor-actions">
              <button
                className="editor-action-button cancel"
                onClick={() => {
                  setIsWriting(false);
                  setNewEntry({ title: '', content: '' });
                }}
              >
                Cancel
              </button>
              <button
                className="editor-action-button save"
                onClick={handleSaveNew}
                disabled={!newEntry.title.trim() || !newEntry.content.trim()}
              >
                Save Entry
              </button>
            </div>
          </div>
        )}

        {journalEntries.length === 0 && !isWriting ? (
          <div className="empty-state">
            <PenLine size={48} className="empty-icon" />
            <h3 className="empty-title">No journal entries yet</h3>
            <p className="empty-text">Start writing to capture your thoughts and reflections</p>
            <button
              className="empty-state-button"
              onClick={() => setIsWriting(true)}
            >
              Write Your First Entry
            </button>
          </div>
        ) : (
          <div className="journal-entries">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="journal-entry-card">
                {editingId === entry.id ? (
                  <>
                    <input
                      type="text"
                      className="journal-title-input edit"
                      value={editValue.title}
                      onChange={(e) => setEditValue({ ...editValue, title: e.target.value })}
                    />
                    <textarea
                      className="journal-content-input edit"
                      value={editValue.content}
                      onChange={(e) => setEditValue({ ...editValue, content: e.target.value })}
                      rows={8}
                    />
                    <div className="entry-actions">
                      <button
                        className="entry-action-button save"
                        onClick={handleSaveEdit}
                      >
                        <Check size={16} />
                        Save
                      </button>
                      <button
                        className="entry-action-button cancel"
                        onClick={() => setEditingId(null)}
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="entry-header">
                      <div className="entry-date">
                        <Calendar size={16} className="calendar-icon" />
                        <span>{formatDate(entry.timestamp)}</span>
                        <span className="entry-time">{formatTime(entry.timestamp)}</span>
                      </div>
                      <div className="entry-actions">
                        <button
                          className="entry-action-icon"
                          onClick={() => handleStartEdit(entry)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="entry-action-icon delete"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="entry-title">{entry.title}</h3>
                    <p className="entry-content">{entry.content}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Journal;
