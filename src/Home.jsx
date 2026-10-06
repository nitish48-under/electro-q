import { Link } from 'react-router-dom'
import './App.css'

const subjects = [
  {
    number: '01',
    title: 'Analog Electronics',
    short: 'ANALOG',
    description: 'Diodes, transistors, amplifiers and analog circuits.',
    route: '/quiz/analog',
  },
  {
    number: '02',
    title: 'Digital Electronics',
    short: 'DIGITAL',
    description: 'Logic gates, Boolean algebra, flip-flops and circuits.',
    route: '/quiz/digital',
  },
  {
    number: '03',
    title: 'Communication Systems',
    short: 'COMMS',
    description: 'Modulation, signals and modern communication concepts.',
    route: '/quiz/communication',
  },
  {
    number: '04',
    title: 'Embedded Systems',
    short: 'EMBEDDED',
    description: 'Microcontrollers, GPIO, protocols and embedded systems.',
    route: '/quiz/embedded',
  },
  {
    number: '05',
    title: 'Signals & Systems',
    short: 'SIGNALS',
    description: 'Signals, systems, transforms and signal processing.',
    route: '/quiz/signals',
  },
  {
    number: '06',
    title: 'Microprocessors',
    short: 'PROCESSORS',
    description: 'Architecture, registers, memory and instructions.',
    route: '/quiz/microprocessors',
  },
]

function Home() {
  return (
    <div className="app">

      {/* Background */}
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <div className="grid-overlay"></div>

      {/* Navbar */}
      <header className="navbar">

        <Link to="/" className="logo">
          ELECTRO<span>-Q</span>
        </Link>

        <nav>
          <a href="#home">Home</a>
          <a href="#subjects">Subjects</a>
          <a href="#about">About</a>
        </nav>

        <Link to="/quiz/analog" className="login-btn">
          Start Quiz
        </Link>

      </header>

      <main>

        {/* Hero */}
        <section className="hero" id="home">

          <div className="hero-content">

            <div className="eyebrow">
              <span className="pulse-dot"></span>
              ECE QUIZ & ASSESSMENT PLATFORM
            </div>

            <h1>
              Think.
              <br />
              <span>Practice.</span>
              <br />
              <strong>Master ECE.</strong>
            </h1>

            <p className="hero-text">
              A focused quiz platform built for Electronics and
              Communication Engineering students.
              Practice by subject. Test your concepts.
              Know where you stand.
            </p>

            <div className="hero-actions">

              <a href="#subjects" className="primary-btn">
                Explore Quizzes
                <span>↗</span>
              </a>

              <a href="#about" className="secondary-btn">
                How it works
                <span>↓</span>
              </a>

            </div>

            <div className="hero-stats">

              <div>
                <strong>06</strong>
                <span>SUBJECTS</span>
              </div>

              <div className="stat-line"></div>

              <div>
                <strong>48+</strong>
                <span>QUESTIONS</span>
              </div>

              <div className="stat-line"></div>

              <div>
                <strong>01</strong>
                <span>PLATFORM</span>
              </div>

            </div>

          </div>

          {/* Hero Visual */}
          <div className="hero-visual">

            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="floating-tag tag-top">
              <span className="mini-dot"></span>
              LIVE ASSESSMENT
            </div>

            <div className="quiz-terminal">

              <div className="terminal-top">
                <span>ELECTRO-Q / QUIZ_ENGINE</span>

                <div className="terminal-status">
                  <span></span>
                  ONLINE
                </div>
              </div>

              <div className="terminal-body">

                <div className="terminal-number">
                  01
                </div>

                <div className="terminal-label">
                  CURRENT MODULE
                </div>

                <h2>
                  Analog
                  <br />
                  Electronics
                </h2>

                <div className="terminal-progress">

                  <div className="progress-label">
                    <span>PROGRESS</span>
                    <span>25%</span>
                  </div>

                  <div className="progress-track">
                    <div></div>
                  </div>

                </div>

                <div className="terminal-bottom">
                  <span>QUESTION 02</span>
                  <span>04 OPTIONS</span>
                </div>

              </div>

            </div>

            <div className="floating-tag tag-bottom">
              <span>+</span>
              INSTANT RESULTS
            </div>

          </div>

        </section>

        {/* Divider */}
        <div className="section-divider">
          <span>01 / 03</span>
          <div></div>
          <span>EXPLORE</span>
        </div>

        {/* Subjects */}
        <section className="subjects" id="subjects">

          <div className="section-heading">

            <div>
              <p className="section-label">THE CURRICULUM</p>

              <h2>
                Choose your
                <span> battlefield.</span>
              </h2>
            </div>

            <p>
              Six core ECE domains.
              One place to sharpen your fundamentals.
            </p>

          </div>

          <div className="subject-grid">

            {subjects.map((subject) => (

              <Link
                to={subject.route}
                className="subject-card"
                key={subject.number}
              >

                <div className="card-top">
                  <span>{subject.number}</span>
                  <span className="card-arrow">↗</span>
                </div>

                <div className="subject-code">
                  {subject.short}
                </div>

                <h3>{subject.title}</h3>

                <p>{subject.description}</p>

                <div className="card-bottom">
                  <span>START QUIZ</span>
                  <div className="card-line"></div>
                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* About */}
        <section className="about-section" id="about">

          <div className="about-grid">

            <div>
              <p className="section-label">WHY ELECTRO-Q</p>

              <h2>
                Less searching.
                <br />
                <span>More solving.</span>
              </h2>
            </div>

            <div className="about-content">

              <p>
                ELECTRO-Q brings subject-focused ECE practice
                into a single assessment platform. Instead of
                searching through scattered resources, students
                can select a subject, attempt a quiz and review
                their performance instantly.
              </p>

              <div className="feature-list">

                <div>
                  <span>01</span>
                  <strong>Subject-wise practice</strong>
                </div>

                <div>
                  <span>02</span>
                  <strong>Instant assessment</strong>
                </div>

                <div>
                  <span>03</span>
                  <strong>Answer review</strong>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="cta-section">

          <div className="cta-glow"></div>

          <p className="section-label">READY?</p>

          <h2>
            Put your ECE
            <br />
            <span>knowledge to the test.</span>
          </h2>

          <a href="#subjects" className="primary-btn">
            Start Your Quiz
            <span>↗</span>
          </a>

        </section>

      </main>

      {/* Footer */}
      <footer>

        <div className="footer-left">

          <div className="logo">
            ELECTRO<span>-Q</span>
          </div>

          <p>ECE Quiz & Assessment Platform</p>

        </div>

        <div className="footer-right">
          <span>REACT</span>
          <span>VITE</span>
          <span>ECE PROJECT</span>
          <span>2026</span>
        </div>

      </footer>

    </div>
  )
}

export default Home