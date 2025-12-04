import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './SubscriptionModal.css';

function SubscriptionModal({ isOpen, onClose }) {
  const { updateSubscription } = useApp();

  if (!isOpen) return null;

  const handleSelectPlan = (tier) => {
    updateSubscription(tier);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Choose Your Plan</h2>
          <p className="modal-subtitle">Start your journey to clarity</p>
        </div>

        <div className="plans-container">
          {/* Free Plan */}
          <div className="plan-card free-plan">
            <div className="plan-header">
              <h3 className="plan-name">Free</h3>
              <div className="plan-price">
                <span className="price-amount">$0</span>
                <span className="price-period">/month</span>
              </div>
            </div>

            <ul className="plan-features">
              <li>✓ Daily check-ins</li>
              <li>✓ Goal tracking</li>
              <li>✓ Basic resources</li>
              <li>✗ AI Coach access</li>
              <li>✗ Community access</li>
              <li>✗ Personalized learning paths</li>
            </ul>

            <button
              className="plan-button free-button"
              onClick={() => handleSelectPlan('free')}
            >
              Continue with Free
            </button>
          </div>

          {/* Premium Plan */}
          <div className="plan-card premium-plan">
            <div className="premium-badge">MOST POPULAR</div>
            <div className="plan-header">
              <h3 className="plan-name">Premium</h3>
              <div className="plan-price">
                <span className="price-amount">$9.99</span>
                <span className="price-period">/month</span>
              </div>
            </div>

            <ul className="plan-features">
              <li>✓ Everything in Free</li>
              <li>✓ Unlimited AI Coach access</li>
              <li>✓ Community access</li>
              <li>✓ Personalized learning paths</li>
              <li>✓ Video & book recommendations</li>
              <li>✓ Advanced progress insights</li>
            </ul>

            <button
              className="plan-button premium-button"
              onClick={() => handleSelectPlan('monthly')}
            >
              Start Premium
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="plan-card yearly-plan">
            <div className="savings-badge">SAVE 40%</div>
            <div className="plan-header">
              <h3 className="plan-name">Yearly</h3>
              <div className="plan-price">
                <span className="price-amount">$5.99</span>
                <span className="price-period">/month</span>
              </div>
              <p className="billed-text">Billed annually at $71.88</p>
            </div>

            <ul className="plan-features">
              <li>✓ Everything in Premium</li>
              <li>✓ Best value</li>
              <li>✓ Priority support</li>
              <li>✓ Early access to features</li>
            </ul>

            <button
              className="plan-button yearly-button"
              onClick={() => handleSelectPlan('yearly')}
            >
              Start Yearly
            </button>
          </div>
        </div>

        <p className="modal-footer-text">
          Cancel anytime. No commitments.
        </p>
      </div>
    </div>
  );
}

export default SubscriptionModal;
