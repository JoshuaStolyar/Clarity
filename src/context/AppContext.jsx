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
  const [journalEntries, setJournalEntries] = useState([]);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning reflection', icon: '☀️', completedDates: [] },
    { id: 2, name: 'Evening gratitude', icon: '🌙', completedDates: [] },
    { id: 3, name: 'Read 10 pages', icon: '📖', completedDates: [] }
  ]);

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
        setJournalEntries(data.journalEntries || []);
        setBookmarkedResources(data.bookmarkedResources || []);
        setHabits(data.habits || [
          { id: 1, name: 'Morning reflection', icon: '☀️', completedDates: [] },
          { id: 2, name: 'Evening gratitude', icon: '🌙', completedDates: [] },
          { id: 3, name: 'Read 10 pages', icon: '📖', completedDates: [] }
        ]);
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
      subscriptionTier,
      journalEntries,
      bookmarkedResources,
      habits
    };
    localStorage.setItem('clarityAppData', JSON.stringify(dataToSave));
  }, [user, isOnboarded, currentGoal, goalStage, checkIns, selectedMentor, subscriptionTier, journalEntries, bookmarkedResources, habits]);

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

  const addJournalEntry = (entryData) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...entryData
    };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const updateJournalEntry = (id, updates) => {
    setJournalEntries(journalEntries.map(entry =>
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  };

  const deleteJournalEntry = (id) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
  };

  const toggleBookmark = (resource) => {
    const isBookmarked = bookmarkedResources.some(r => r.id === resource.id);
    if (isBookmarked) {
      setBookmarkedResources(bookmarkedResources.filter(r => r.id !== resource.id));
    } else {
      setBookmarkedResources([...bookmarkedResources, { ...resource, bookmarkedAt: Date.now() }]);
    }
  };

  const toggleHabit = (habitId) => {
    const today = new Date().toDateString();
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const isCompletedToday = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: isCompletedToday
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today]
        };
      }
      return habit;
    }));
  };

  const addHabit = (name, icon) => {
    const newHabit = {
      id: Date.now(),
      name,
      icon,
      completedDates: []
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
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
    setJournalEntries([]);
    setBookmarkedResources([]);
    setHabits([
      { id: 1, name: 'Morning reflection', icon: '☀️', completedDates: [] },
      { id: 2, name: 'Evening gratitude', icon: '🌙', completedDates: [] },
      { id: 3, name: 'Read 10 pages', icon: '📖', completedDates: [] }
    ]);
  };

  const value = {
    user,
    isOnboarded,
    currentGoal,
    goalStage,
    checkIns,
    selectedMentor,
    subscriptionTier,
    journalEntries,
    bookmarkedResources,
    habits,
    GOAL_STAGES,
    completeOnboarding,
    updateGoal,
    updateGoalStage,
    addCheckIn,
    setSelectedMentor,
    updateSubscription,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    toggleBookmark,
    toggleHabit,
    addHabit,
    deleteHabit,
    resetApp
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
