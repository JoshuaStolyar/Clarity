import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Onboarding.css';

const PRESET_GOALS = [
  'Figure out what career fits me',
  'Find my life purpose',
  'Start a business',
  'Change careers',
  'Improve my relationships',
  'Build better habits',
  'Custom goal...'
];

function Onboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const navigate = useNavigate();
  const { completeOnboarding, updateGoal } = useApp();

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && age) {
      setStep(3);
    } else if (step === 3 && (selectedGoal || customGoal)) {
      const finalGoal = selectedGoal === 'Custom goal...' ? customGoal : selectedGoal;
      completeOnboarding({ name, age });
      updateGoal(finalGoal);
      navigate('/');
    }
  };

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    if (goal !== 'Custom goal...') {
      setCustomGoal('');
    }
  };

  return (
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

            {selectedGoal === 'Custom goal...' && (
              <div className="onboarding-form">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your custom goal"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            <button
              className="onboarding-button"
              onClick={handleNext}
              disabled={!selectedGoal || (selectedGoal === 'Custom goal...' && !customGoal.trim())}
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
  );
}

export default Onboarding;
