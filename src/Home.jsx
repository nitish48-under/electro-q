import { Link } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div className="app">

      <header className="navbar">
        <div className="logo">ELECTRO-Q</div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/subjects">Subjects</Link>
          <a href="#about">About</a>
        </nav>

        <button className="login-btn">Login</button>
      </header>

      <main>

        <section className="hero">

          <div className="hero-content">
            <p className="tagline">ECE QUIZ & ASSESSMENT PLATFORM</p>

            <h1>
              Master ECE.
              <br />
              <span>One Quiz at a Time.</span>
            </h1>

            <p className="hero-text">
              Test your knowledge in Electronics and Communication
              Engineering through interactive quizzes and assessments.
            </p>

            <Link to="/subjects">
              <button className="start-btn">
                Start Quiz
              </button>
            </Link>
          </div>

          <div className="hero-card">
            <div className="circuit-icon">⚡</div>
            <h2>ELECTRO-Q</h2>
            <p>Learn • Practice • Improve</p>
          </div>

        </section>

        <section className="subjects" id="about">

          <p className="section-label">EXPLORE</p>

          <h2>ECE Subjects</h2>

          <div className="subject-grid">

            <div className="subject-card">
              <h3>Analog Electronics</h3>
              <p>
                Test your knowledge of amplifiers, diodes,
                transistors and analog circuits.
              </p>
              <Link to="/quiz/analog">
                <button>Take Quiz →</button>
              </Link>
            </div>

            <div className="subject-card">
              <h3>Digital Electronics</h3>
              <p>
                Practice logic gates, Boolean algebra,
                flip-flops and digital circuits.
              </p>
              <Link to="/quiz/digital">
                <button>Take Quiz →</button>
              </Link>
            </div>

            <div className="subject-card">
              <h3>Communication Systems</h3>
              <p>
                Test your understanding of modulation,
                signals and communication systems.
              </p>
              <Link to="/quiz/communication">
                <button>Take Quiz →</button>
              </Link>
            </div>

            <div className="subject-card">
              <h3>Embedded Systems</h3>
              <p>
                Practice microcontrollers, peripherals,
                communication protocols and embedded concepts.
              </p>
              <Link to="/quiz/embedded">
                <button>Take Quiz →</button>
              </Link>
            </div>

            <div className="subject-card">
              <h3>Signals & Systems</h3>
              <p>
                Challenge yourself with signals,
                systems and signal-processing concepts.
              </p>
              <Link to="/quiz/signals">
                <button>Take Quiz →</button>
              </Link>
            </div>

            <div className="subject-card">
              <h3>Microprocessors</h3>
              <p>
                Practice architecture, instructions,
                memory and microprocessor concepts.
              </p>
              <Link to="/quiz/microprocessors">
                <button>Take Quiz →</button>
              </Link>
            </div>

          </div>

        </section>

      </main>

      <footer>
        <h3>ELECTRO-Q</h3>
        <p>ECE Quiz & Assessment Platform</p>
      </footer>

    </div>
  )
}

export default Home