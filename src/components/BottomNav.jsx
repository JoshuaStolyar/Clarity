import { NavLink } from 'react-router-dom';
import { Home, Search, Calendar, User, MessageCircle } from 'lucide-react';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <Home size={24} />
        <span>Today</span>
      </NavLink>
      <NavLink to="/discover" className="nav-item">
        <Search size={24} />
        <span>Discover</span>
      </NavLink>
      <NavLink to="/plan" className="nav-item">
        <Calendar size={24} />
        <span>Plan</span>
      </NavLink>
      <NavLink to="/me" className="nav-item">
        <User size={24} />
        <span>Me</span>
      </NavLink>
      <NavLink to="/coach" className="nav-item">
        <MessageCircle size={24} />
        <span>Coach</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
