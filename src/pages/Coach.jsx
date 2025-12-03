import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send } from 'lucide-react';
import './Coach.css';

const MENTORS = [
  {
    id: 'alex-hormozi',
    name: 'Alex Hormozi',
    avatar: '💼',
    style: 'Direct, tactical, and business-focused',
    description: 'Focused on building wealth and scaling businesses'
  },
  {
    id: 'dan-martell',
    name: 'Dan Martell',
    avatar: '🚀',
    style: 'Growth-oriented and systems-thinking',
    description: 'Expert in SaaS and lifestyle optimization'
  },
  {
    id: 'leila-hormozi',
    name: 'Leila Hormozi',
    avatar: '👩‍💼',
    style: 'Strategic and psychology-focused',
    description: 'Leadership and team building specialist'
  },
  {
    id: 'general',
    name: 'General Coach',
    avatar: '🎯',
    style: 'Supportive and balanced',
    description: 'Personalized guidance for your unique journey'
  }
];

function Coach() {
  const { selectedMentor, setSelectedMentor, user, currentGoal, subscriptionTier } = useApp();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedMentor && messages.length === 0) {
      const mentor = MENTORS.find(m => m.id === selectedMentor);
      const welcomeMessage = {
        id: Date.now(),
        sender: 'coach',
        text: `Hey ${user?.name || 'there'}! I'm here to help you with "${currentGoal}". What's on your mind today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedMentor]);

  const handleSelectMentor = (mentorId) => {
    if (subscriptionTier === 'free' && mentorId !== 'general') {
      alert('Mentor personalities are available with Premium subscription. Upgrade to unlock!');
      return;
    }
    setSelectedMentor(mentorId);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
      const coachMessage = {
        id: Date.now() + 1,
        sender: 'coach',
        text: generateMockResponse(inputMessage, selectedMentor),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, coachMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedMentor) {
    return (
      <div className="coach-page">
        <header className="coach-header">
          <h1 className="coach-title">Choose Your Mentor</h1>
          <p className="coach-subtitle">Select a coaching style that resonates with you</p>
        </header>

        <div className="mentor-grid">
          {MENTORS.map((mentor) => (
            <button
              key={mentor.id}
              className="mentor-card"
              onClick={() => handleSelectMentor(mentor.id)}
            >
              <div className="mentor-avatar">{mentor.avatar}</div>
              <h3 className="mentor-name">{mentor.name}</h3>
              <p className="mentor-style">{mentor.style}</p>
              <p className="mentor-description">{mentor.description}</p>
              {mentor.id !== 'general' && subscriptionTier === 'free' && (
                <span className="premium-badge">Premium</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentMentor = MENTORS.find(m => m.id === selectedMentor);

  return (
    <div className="coach-page">
      <header className="coach-chat-header">
        <button className="back-button" onClick={() => setSelectedMentor(null)}>
          ← Change Mentor
        </button>
        <div className="current-mentor">
          <span className="current-mentor-avatar">{currentMentor.avatar}</span>
          <span className="current-mentor-name">{currentMentor.name}</span>
        </div>
      </header>

      <div className="chat-container">
        <div className="messages-area">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === 'coach' && (
                <div className="message-avatar">{currentMentor.avatar}</div>
              )}
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message coach">
              <div className="message-avatar">{currentMentor.avatar}</div>
              <div className="message-bubble typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <textarea
            className="chat-input"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button className="send-button" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function generateMockResponse(userMessage, mentorId) {
  // This is a mock function. In production, integrate with OpenAI/Claude API
  const responses = {
    'alex-hormozi': [
      "Let's cut to the chase. What specific action can you take today that will move the needle?",
      "Focus on inputs, not outcomes. What are the key metrics you're tracking?",
      "The best time to start was yesterday. The second best time is now. What's stopping you?"
    ],
    'dan-martell': [
      "That's a great insight! Let's build a system around it. What's your repeatable process?",
      "Think about leverage. How can you automate or delegate this?",
      "Buy back your time. What's the highest and best use of your energy right now?"
    ],
    'leila-hormozi': [
      "Let's examine the psychology behind that. What belief is driving this behavior?",
      "Leadership is about making others better. How are you developing your team?",
      "What story are you telling yourself about this situation?"
    ],
    'general': [
      "That's an interesting perspective. Tell me more about what's driving that thought.",
      "I hear you. What do you think would be the best next step?",
      "Let's break this down. What's the core challenge you're facing?"
    ]
  };

  const mentorResponses = responses[mentorId] || responses.general;
  return mentorResponses[Math.floor(Math.random() * mentorResponses.length)];
}

export default Coach;
