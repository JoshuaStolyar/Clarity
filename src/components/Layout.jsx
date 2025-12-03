import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import './Layout.css';

function Layout() {
  return (
    <div className="app-container">
      <div className="mobile-frame">
        <div className="content-area">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Layout;
