import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Check } from 'lucide-react';
import './Pricing.css';

const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with basic progress tracking',
    features: [
      'Daily progress logging',
      'Goal tracking',
      'Basic daily check-ins',
      'Limited to 1 active goal'
    ],
    limitations: [
      'No AI coaching',
      'No community access',
      'No mentor personalities'
    ],
    cta: 'Current Plan',
    highlighted: false
  },
  {
    id: 'monthly',
    name: 'Premium Monthly',
    price: '$4.99',
    period: 'per month',
    description: 'Full access to all features',
    trial: '3-day free trial',
    features: [
      'Everything in Free',
      'AI Coach with memory',
      'Multiple mentor personalities',
      'Community access',
      'Unlimited goals',
      'Progress analytics',
      'Priority support'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    id: 'yearly',
    name: 'Premium Yearly',
    price: '$29.99',
    period: 'per year',
    savings: 'Save 50%',
    description: 'Best value for committed growth',
    trial: '3-day free trial',
    features: [
      'Everything in Monthly',
      'Annual planning session',
      'Exclusive workshops',
      'Early access to new features',
      'Lifetime community access'
    ],
    cta: 'Start Free Trial',
    highlighted: false
  }
];

function Pricing() {
  const { subscriptionTier, updateSubscription } = useApp();
  const navigate = useNavigate();

  const handleSelectPlan = (tierId) => {
    if (tierId === 'free') {
      updateSubscription('free');
      navigate('/');
    } else {
      // In production, this would integrate with Stripe/payment processor
      const confirmed = window.confirm(
        `Ready to upgrade to ${tierId === 'monthly' ? 'Monthly' : 'Yearly'} Premium?\n\n` +
        `This would integrate with Stripe for payment processing.\n\n` +
        `For demo purposes, would you like to activate Premium features?`
      );

      if (confirmed) {
        updateSubscription(tierId);
        alert('Premium features activated! Enjoy your upgrade.');
        navigate('/coach');
      }
    }
  };

  return (
    <div className="pricing-page">
      <header className="pricing-header">
        <h1 className="pricing-title">Choose Your Plan</h1>
        <p className="pricing-subtitle">
          Unlock your full potential with Premium features
        </p>
      </header>

      <div className="pricing-content">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`pricing-card ${tier.highlighted ? 'highlighted' : ''} ${
              subscriptionTier === tier.id ? 'current' : ''
            }`}
          >
            {tier.highlighted && <div className="popular-badge">Most Popular</div>}
            {tier.savings && <div className="savings-badge">{tier.savings}</div>}

            <h2 className="tier-name">{tier.name}</h2>
            <div className="tier-price">
              <span className="price-amount">{tier.price}</span>
              <span className="price-period">/{tier.period}</span>
            </div>
            {tier.trial && <div className="trial-badge">{tier.trial}</div>}
            <p className="tier-description">{tier.description}</p>

            <ul className="features-list">
              {tier.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <Check size={18} className="check-icon" />
                  <span>{feature}</span>
                </li>
              ))}
              {tier.limitations?.map((limitation, index) => (
                <li key={`limit-${index}`} className="feature-item limitation">
                  <span>✗</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>

            <button
              className={`pricing-cta ${tier.highlighted ? 'primary' : 'secondary'}`}
              onClick={() => handleSelectPlan(tier.id)}
              disabled={subscriptionTier === tier.id}
            >
              {subscriptionTier === tier.id ? 'Current Plan' : tier.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="pricing-faq">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Can I cancel anytime?</h3>
          <p>Yes! You can cancel your subscription at any time with no penalties.</p>
        </div>
        <div className="faq-item">
          <h3>What happens after the free trial?</h3>
          <p>
            After 3 days, you'll be charged automatically. Cancel before then to avoid charges.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can I switch between plans?</h3>
          <p>Absolutely! You can upgrade or downgrade at any time.</p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
