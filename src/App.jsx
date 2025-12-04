import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Today from './pages/Today';
import Discover from './pages/Discover';
import Plan from './pages/Plan';
import Me from './pages/Me';
import Coach from './pages/Coach';
import Journal from './pages/Journal';
import Onboarding from './pages/Onboarding';
import Pricing from './pages/Pricing';
import './App.css';

function AppRoutes() {
  const { isOnboarded } = useApp();
  const basename = import.meta.env.MODE === 'production' ? '/Clarity' : '/';

  if (!isOnboarded) {
    return (
      <Router basename={basename}>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Today />} />
          <Route path="discover" element={<Discover />} />
          <Route path="plan" element={<Plan />} />
          <Route path="me" element={<Me />} />
          <Route path="coach" element={<Coach />} />
          <Route path="journal" element={<Journal />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
