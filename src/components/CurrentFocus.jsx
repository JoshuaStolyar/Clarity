import './CurrentFocus.css';

function CurrentFocus({ focus }) {
  return (
    <div className="current-focus-card">
      <div className="focus-label">Current focus</div>
      <div className="focus-text">{focus}</div>
    </div>
  );
}

export default CurrentFocus;
