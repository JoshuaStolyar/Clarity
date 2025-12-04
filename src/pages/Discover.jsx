import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Video, BookOpen, User } from 'lucide-react';
import './Discover.css';

const MODELS = [
  {
    id: 'ikigai',
    name: 'Ikigai',
    description: 'Japanese concept for finding purpose',
    icon: '🎯',
    color: '#6366f1',
    forGoals: ['Help me find what I love', 'Find my life purpose'],
    fullDescription: 'Ikigai is a Japanese concept meaning "reason for being". It sits at the intersection of what you love, what you\'re good at, what the world needs, and what you can be paid for.'
  },
  {
    id: 'perma',
    name: 'PERMA Model',
    description: 'Science of well-being and flourishing',
    icon: '🌱',
    color: '#10b981',
    forGoals: ['Help me find what I love', 'Find my life purpose'],
    fullDescription: 'PERMA stands for Positive emotion, Engagement, Relationships, Meaning, and Accomplishment. This model helps you build a fulfilling life.'
  },
  {
    id: 'hedgehog',
    name: 'Hedgehog Concept',
    description: 'From Good to Great by Jim Collins',
    icon: '🦔',
    color: '#f59e0b',
    forGoals: ['Change careers', 'Find my life purpose'],
    fullDescription: 'Find what you can be best at, what drives your economic engine, and what you\'re deeply passionate about.'
  },
  {
    id: 'design-thinking',
    name: 'Design Your Life',
    description: 'Stanford\'s approach to life design',
    icon: '✏️',
    color: '#8b5cf6',
    forGoals: ['Change careers', 'Help me find what I love'],
    fullDescription: 'Apply design thinking principles to build a meaningful and joyful life through prototyping and iteration.'
  }
];

const getPersonalizedContent = (goal) => {
  const contentMap = {
    'Help me find what I love': {
      videos: [
        { title: 'The Power of Passion and Perseverance', author: 'Angela Duckworth', platform: 'TED', duration: '6 min' },
        { title: 'How to Find Your Passion', author: 'Elizabeth Gilbert', platform: 'TED', duration: '12 min' },
        { title: 'Finding Your Element', author: 'Sir Ken Robinson', platform: 'TED', duration: '18 min' }
      ],
      books: [
        { title: 'Designing Your Life', author: 'Bill Burnett & Dave Evans', description: 'Use design thinking to build a meaningful life' },
        { title: 'Range', author: 'David Epstein', description: 'Why generalists triumph in a specialized world' },
        { title: 'So Good They Can\'t Ignore You', author: 'Cal Newport', description: 'Why skills trump passion' }
      ],
      people: [
        { name: 'Cal Newport', role: 'Author & Professor', expertise: 'Deep work, career strategy', platform: 'Twitter: @calnewport' },
        { name: 'Ali Abdaal', role: 'YouTuber & Doctor', expertise: 'Productivity, career pivots', platform: 'YouTube: Ali Abdaal' },
        { name: 'Marie Forleo', role: 'Entrepreneur', expertise: 'Building meaningful businesses', platform: 'marieforleo.com' }
      ]
    },
    'Change careers': {
      videos: [
        { title: 'The Career Advice You Probably Didn\'t Get', author: 'Susan Colantuono', platform: 'TED', duration: '15 min' },
        { title: 'How to Make a Career Transition', author: 'Emily Bermes', platform: 'TED', duration: '9 min' },
        { title: 'Why 30 is not the new 20', author: 'Meg Jay', platform: 'TED', duration: '14 min' }
      ],
      books: [
        { title: 'What Color Is Your Parachute?', author: 'Richard N. Bolles', description: 'The classic career-change guide' },
        { title: 'Pivot', author: 'Jenny Blake', description: 'The only move that matters' },
        { title: 'Switchers', author: 'Dawn Graham', description: 'How smart professionals change careers' }
      ],
      people: [
        { name: 'Ramit Sethi', role: 'Author & Entrepreneur', expertise: 'Career growth, negotiations', platform: 'iwillteachyoutoberich.com' },
        { name: 'Scott Young', role: 'Author', expertise: 'Learning, skill acquisition', platform: 'scotthyoung.com' },
        { name: 'Tara Mohr', role: 'Leadership Coach', expertise: 'Career transitions for women', platform: 'taramohr.com' }
      ]
    },
    'Find my life purpose': {
      videos: [
        { title: 'How to Know Your Life Purpose in 5 Minutes', author: 'Adam Leipzig', platform: 'TED', duration: '5 min' },
        { title: 'The Psychology of Your Future Self', author: 'Dan Gilbert', platform: 'TED', duration: '7 min' },
        { title: 'Start With Why', author: 'Simon Sinek', platform: 'TED', duration: '18 min' }
      ],
      books: [
        { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', description: 'Finding purpose through suffering' },
        { title: 'The Purpose Driven Life', author: 'Rick Warren', description: 'What on earth am I here for?' },
        { title: 'Ikigai', author: 'Héctor García & Francesc Miralles', description: 'The Japanese secret to a long and happy life' }
      ],
      people: [
        { name: 'Simon Sinek', role: 'Author & Speaker', expertise: 'Purpose, leadership', platform: 'simonsinek.com' },
        { name: 'Brené Brown', role: 'Researcher', expertise: 'Courage, vulnerability, purpose', platform: 'brenebrown.com' },
        { name: 'Jay Shetty', role: 'Podcast Host', expertise: 'Purpose, mindfulness', platform: 'jayshetty.me' }
      ]
    }
  };

  return contentMap[goal] || contentMap['Help me find what I love'];
};

function Discover() {
  const { subscriptionTier, currentGoal } = useApp();
  const [selectedModel, setSelectedModel] = useState(null);
  const [showCommunity, setShowCommunity] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');

  const personalizedContent = getPersonalizedContent(currentGoal);
  const relevantModels = MODELS.filter(model => model.forGoals.includes(currentGoal));

  const handleCommunityClick = () => {
    if (subscriptionTier === 'free') {
      alert('Community access is available with Premium subscription. Upgrade to connect with others!');
    } else {
      setShowCommunity(true);
    }
  };

  if (showCommunity) {
    return <CommunityView onBack={() => setShowCommunity(false)} />;
  }

  if (selectedModel) {
    return <ModelDetailView model={selectedModel} onBack={() => setSelectedModel(null)} />;
  }

  return (
    <div className="discover-page">
      <header className="discover-header">
        <h1 className="discover-title">Explore & Learn</h1>
        <p className="discover-subtitle">Models and resources personalized for your journey</p>
      </header>

      <div className="discover-content">
        {/* Models Section */}
        <section className="models-section">
          <h2 className="section-heading">
            <span className="heading-icon">🧭</span>
            Frameworks for Your Journey
          </h2>
          <div className="models-grid">
            {relevantModels.map((model) => (
              <button
                key={model.id}
                className="model-card"
                style={{ borderColor: model.color }}
                onClick={() => setSelectedModel(model)}
              >
                <span className="model-icon">{model.icon}</span>
                <h3 className="model-name">{model.name}</h3>
                <p className="model-description">{model.description}</p>
                <span className="model-link" style={{ color: model.color }}>
                  Learn more →
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Learning Resources Tabs */}
        <section className="resources-section">
          <div className="tabs-container">
            <button
              className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              <Video size={18} />
              Videos
            </button>
            <button
              className={`tab-button ${activeTab === 'books' ? 'active' : ''}`}
              onClick={() => setActiveTab('books')}
            >
              <BookOpen size={18} />
              Books
            </button>
            <button
              className={`tab-button ${activeTab === 'people' ? 'active' : ''}`}
              onClick={() => setActiveTab('people')}
            >
              <User size={18} />
              People
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'videos' && (
              <div className="content-grid">
                {personalizedContent.videos.map((video, index) => (
                  <div key={index} className="content-card">
                    <div className="content-header">
                      <Video size={20} className="content-icon" />
                      <span className="content-duration">{video.duration}</span>
                    </div>
                    <h3 className="content-title">{video.title}</h3>
                    <p className="content-meta">{video.author} • {video.platform}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'books' && (
              <div className="content-grid">
                {personalizedContent.books.map((book, index) => (
                  <div key={index} className="content-card">
                    <BookOpen size={20} className="content-icon" />
                    <h3 className="content-title">{book.title}</h3>
                    <p className="content-author">{book.author}</p>
                    <p className="content-description">{book.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'people' && (
              <div className="content-grid">
                {personalizedContent.people.map((person, index) => (
                  <div key={index} className="content-card">
                    <div className="person-avatar">
                      <User size={24} />
                    </div>
                    <h3 className="content-title">{person.name}</h3>
                    <p className="content-role">{person.role}</p>
                    <p className="content-expertise">{person.expertise}</p>
                    <p className="content-platform">{person.platform}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Community CTA */}
        <button className="community-cta" onClick={handleCommunityClick}>
          <div className="community-icon">
            <Users size={28} />
          </div>
          <div className="community-text">
            <h3>Join the Community</h3>
            <p>Connect with others on similar journeys</p>
          </div>
          {subscriptionTier === 'free' && <span className="premium-badge-small">Premium</span>}
        </button>
      </div>
    </div>
  );
}

function ModelDetailView({ model, onBack }) {
  return (
    <div className="discover-page">
      <header className="discover-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="model-detail-header">
          <span className="model-detail-icon" style={{ color: model.color }}>
            {model.icon}
          </span>
          <div>
            <h1 className="discover-title">{model.name}</h1>
            <p className="discover-subtitle">{model.description}</p>
          </div>
        </div>
      </header>

      <div className="discover-content">
        <div className="model-detail-content">
          <p className="model-full-description">{model.fullDescription}</p>

          <div className="model-action-section">
            <h3>How to apply this framework:</h3>
            <ul className="model-steps">
              <li>Reflect on the core questions of this model</li>
              <li>Journal your thoughts and insights</li>
              <li>Share with your AI coach for personalized guidance</li>
              <li>Create action steps based on your discoveries</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityView({ onBack }) {
  const MOCK_USERS = [
    { name: 'Sarah M.', goal: 'Switch to UX Design', stage: 'testing', avatar: '👩' },
    { name: 'Mike T.', goal: 'Start a SaaS business', stage: 'implementing', avatar: '👨' },
    { name: 'Alex K.', goal: 'Become a content creator', stage: 'finding', avatar: '🧑' },
    { name: 'Jordan L.', goal: 'Career in data science', stage: 'testing', avatar: '👤' }
  ];

  return (
    <div className="discover-page">
      <header className="discover-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1 className="discover-title">Community</h1>
        <p className="discover-subtitle">Connect with others on similar paths</p>
      </header>

      <div className="discover-content">
        <div className="community-list">
          {MOCK_USERS.map((user, index) => (
            <div key={index} className="community-member">
              <div className="member-avatar">{user.avatar}</div>
              <div className="member-info">
                <h3 className="member-name">{user.name}</h3>
                <p className="member-goal">{user.goal}</p>
                <span className="member-stage">{user.stage}</span>
              </div>
              <button className="connect-button">Connect</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discover;
