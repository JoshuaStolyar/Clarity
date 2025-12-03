import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const GOAL_STAGES = {
  FINDING: 'finding',
  TESTING: 'testing',
  IMPLEMENTING: 'implementing'
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [goalStage, setGoalStage] = useState(GOAL_STAGES.FINDING);
  const [checkIns, setCheckIns] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [subscriptionTier, setSubscriptionTier] = useState('free'); // 'free', 'monthly', 'yearly'

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('clarityAppData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setUser(data.user || null);
        setIsOnboarded(data.isOnboarded || false);
        setCurrentGoal(data.currentGoal || null);
        setGoalStage(data.goalStage || GOAL_STAGES.FINDING);
        setCheckIns(data.checkIns || []);
        setSelectedMentor(data.selectedMentor || null);
        setSubscriptionTier(data.subscriptionTier || 'free');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      user,
      isOnboarded,
      currentGoal,
      goalStage,
      checkIns,
      selectedMentor,
      subscriptionTier
    };
    localStorage.setItem('clarityAppData', JSON.stringify(dataToSave));
  }, [user, isOnboarded, currentGoal, goalStage, checkIns, selectedMentor, subscriptionTier]);

  const completeOnboarding = (userData) => {
    setUser(userData);
    setIsOnboarded(true);
  };

  const updateGoal = (goal) => {
    setCurrentGoal(goal);
  };

  const updateGoalStage = (stage) => {
    if (Object.values(GOAL_STAGES).includes(stage)) {
      setGoalStage(stage);
    }
  };

  const addCheckIn = (checkInData) => {
    const newCheckIn = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...checkInData
    };
    setCheckIns([newCheckIn, ...checkIns]);
  };

  const updateSubscription = (tier) => {
    setSubscriptionTier(tier);
  };

  const resetApp = () => {
    localStorage.removeItem('clarityAppData');
    setUser(null);
    setIsOnboarded(false);
    setCurrentGoal(null);
    setGoalStage(GOAL_STAGES.FINDING);
    setCheckIns([]);
    setSelectedMentor(null);
    setSubscriptionTier('free');
  };

  const value = {
    user,
    isOnboarded,
    currentGoal,
    goalStage,
    checkIns,
    selectedMentor,
    subscriptionTier,
    GOAL_STAGES,
    completeOnboarding,
    updateGoal,
    updateGoalStage,
    addCheckIn,
    setSelectedMentor,
    updateSubscription,
    resetApp
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
