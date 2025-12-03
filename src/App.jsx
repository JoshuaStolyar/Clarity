import './App.css'

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Clarity</h1>
        <p className="subtitle">Find Your Path Forward</p>
      </header>

      <main className="main-content">
        <section className="hero">
          <p className="hero-text">
            Feeling lost or unhappy with where you are in life? You're not alone.
          </p>
        </section>

        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            Clarity exists to help people who feel stuck, confused, or dissatisfied
            with their current situation. Whether you're questioning your career path,
            searching for deeper meaning, or simply feeling uncertain about your next steps,
            we're here to help you find clarity and purpose.
          </p>
        </section>

        <section className="features">
          <h2>How We Help</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Life Direction</h3>
              <p>Discover what truly matters to you and align your life with your values</p>
            </div>
            <div className="feature-card">
              <h3>Career Guidance</h3>
              <p>Find a career path that brings fulfillment and matches your strengths</p>
            </div>
            <div className="feature-card">
              <h3>Purpose Discovery</h3>
              <p>Uncover your unique purpose and create a meaningful life journey</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2>Ready to Find Your Clarity?</h2>
          <p>Take the first step toward a more purposeful life</p>
          <button className="cta-button">Get Started</button>
        </section>
      </main>

      <footer className="footer">
        <p>Your journey to clarity begins here</p>
      </footer>
    </div>
  )
}

export default App
