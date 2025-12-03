import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Book, Lightbulb, TrendingUp } from 'lucide-react';
import './Discover.css';

const RESOURCES = [
  {
    category: 'Career Paths',
    icon: <TrendingUp size={24} />,
    items: [
      { title: 'Software Engineering', description: 'Build apps and solve problems with code' },
      { title: 'Product Design', description: 'Create beautiful user experiences' },
      { title: 'Digital Marketing', description: 'Grow brands and reach audiences online' },
      { title: 'Content Creation', description: 'Share your story and build an audience' }
    ]
  },
  {
    category: 'Learning Resources',
    icon: <Book size={24} />,
    items: [
      { title: 'Coursera', description: 'Online courses from top universities', link: 'https://www.coursera.org' },
      { title: 'Udemy', description: 'Practical skills from expert instructors', link: 'https://www.udemy.com' },
      { title: 'Khan Academy', description: 'Free learning for anyone, anywhere', link: 'https://www.khanacademy.org' }
    ]
  },
  {
    category: 'Inspiration',
    icon: <Lightbulb size={24} />,
    items: [
      { title: 'How to Find Your Passion', description: 'TED Talk by Elizabeth Gilbert' },
      { title: 'Ikigai Framework', description: 'Japanese concept of finding purpose' },
      { title: 'The Dip by Seth Godin', description: 'Know when to quit and when to stick' }
    ]
  }
];

function Discover() {
  const { subscriptionTier } = useApp();
  const [showCommunity, setShowCommunity] = useState(false);

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

  return (
    <div className="discover-page">
      <header className="discover-header">
        <h1 className="discover-title">Discover</h1>
        <p className="discover-subtitle">Explore paths, resources, and connect with others</p>
      </header>

      <div className="discover-content">
        {/* Community CTA */}
        <button className="community-cta" onClick={handleCommunityClick}>
          <div className="community-icon">
            <Users size={32} />
          </div>
          <div className="community-text">
            <h3>Join the Community</h3>
            <p>Connect with others on similar journeys</p>
          </div>
          {subscriptionTier === 'free' && <span className="premium-badge-small">Premium</span>}
        </button>

        {/* Resources */}
        {RESOURCES.map((section, index) => (
          <div key={index} className="resource-section">
            <div className="section-header">
              <div className="section-icon">{section.icon}</div>
              <h2 className="section-title">{section.category}</h2>
            </div>
            <div className="resource-list">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="resource-item">
                  <h3 className="resource-title">{item.title}</h3>
                  <p className="resource-description">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
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
