import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SubscriptionModal from '../components/SubscriptionModal';
import './Onboarding.css';

const PRESET_GOALS = [
  'Help me find what I love',
  'Change careers',
  'Find my life purpose'
];

function Onboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const navigate = useNavigate();
  const { completeOnboarding, updateGoal } = useApp();

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && age) {
      setStep(3);
    } else if (step === 3 && selectedGoal) {
      completeOnboarding({ name, age });
      updateGoal(selectedGoal);
      setShowSubscriptionModal(true);
    }
  };

  const handleSubscriptionModalClose = () => {
    setShowSubscriptionModal(false);
    navigate('/');
  };

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
  };

  return (
    <>
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={handleSubscriptionModalClose}
      />
      <div className="onboarding-container">
        <div className="onboarding-content">
        {step === 1 && (
          <div className="onboarding-step">
            <h1 className="onboarding-title">Welcome to Clarity</h1>
            <p className="onboarding-subtitle">Let's get to know you</p>

            <div className="onboarding-form">
              <label className="form-label">What's your name?</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            <button
              className="onboarding-button"
              onClick={handleNext}
              disabled={!name.trim()}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h1 className="onboarding-title">Nice to meet you, {name}!</h1>
            <p className="onboarding-subtitle">Help us personalize your experience</p>

            <div className="onboarding-form">
              <label className="form-label">How old are you?</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="13"
                max="100"
                autoFocus
              />
            </div>

            <button
              className="onboarding-button"
              onClick={handleNext}
              disabled={!age || age < 13}
            >
              Continue
            </button>
            <button
              className="onboarding-button-secondary"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <h1 className="onboarding-title">What brings you here?</h1>
            <p className="onboarding-subtitle">Choose your current focus</p>

            <div className="goal-selection">
              {PRESET_GOALS.map((goal) => (
                <button
                  key={goal}
                  className={`goal-option ${selectedGoal === goal ? 'selected' : ''}`}
                  onClick={() => handleGoalSelect(goal)}
                >
                  {goal}
                </button>
              ))}
            </div>

            <button
              className="onboarding-button"
              onClick={handleNext}
              disabled={!selectedGoal}
            >
              Get Started
            </button>
            <button
              className="onboarding-button-secondary"
              onClick={() => setStep(2)}
            >
              Back
            </button>
          </div>
        )}

        <div className="onboarding-progress">
          <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}></div>
          <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}></div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Onboarding;
