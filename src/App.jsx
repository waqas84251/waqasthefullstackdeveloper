import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './index.css';

// Import Assets
import profileImg from './assets/profile.png';
import chatAvatarImg from './assets/chat_avatar.png';
import huzaifaImg from './assets/huzaifa.jpg';
import harisImg from './assets/haris.jpg';
import abdulRehmanImg from './assets/abdul_rehman.jpg';
import rajaSaifImg from './assets/raja_saif.jpg';
import abdullahImg from './assets/abdullah.jpg';
import naveedImg from './assets/naveed.jpg';
import ahmadImg from './assets/ahmad.png';
import abdulBasitImg from './assets/abdul_basit.jpg';
import posLogoImg from './assets/pos_logo.png';

function App() {
  const [showPoster, setShowPoster] = useState(() => {
    // Skip poster if we are refreshing or have a hash in URL (direct navigation)
    if (typeof window !== 'undefined') {
      const hasSeenPoster = sessionStorage.getItem('hasSeenPoster');
      const hasHash = window.location.hash;
      return !(hasSeenPoster || hasHash);
    }
    return true;
  });
  const [isExiting, setIsExiting] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const formRef = useRef();
  const teamTrackRef = useRef(null);
  const portfolioTrackRef = useRef(null);
  const isHoveringTeam = useRef(false);
  const isHoveringPortfolio = useRef(false);

  // Handle Theme Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleEnter = () => {
    setIsExiting(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasSeenPoster', 'true');
    }
    setTimeout(() => {
      setShowPoster(false);
      setIsExiting(false);
    }, 500); // Snappier exit
  };

  // Lock scroll when poster is active
  useEffect(() => {
    if (showPoster) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showPoster]);

  // Handle scroll effect for navbar and hide poster
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 10 && showPoster && !isExiting) {
        handleEnter();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPoster, isExiting]);

  // Automatically open website after a few seconds
  useEffect(() => {
    if (showPoster && !isExiting) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 2500); // 2.5 seconds (Faster transition)
      return () => clearTimeout(timer);
    }
  }, [showPoster, isExiting]);

  // Scroll Reveal Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [showPoster]); // Re-run when poster is hidden to find new elements if needed

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuActive && !e.target.closest('.navbar-menu') && !e.target.closest('.navbar-toggle')) {
        setMenuActive(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuActive]);

  // Handle form submission with EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_vweutds',
      'template_zbyngcg',
      formRef.current,
      'pffwusc_J9i7KIPN_'
    )
      .then((result) => {
        console.log('Message sent:', result.text);
        setNotification({
          show: true,
          type: 'success',
          message: '✓ Message sent successfully! I\'ll get back to you soon.'
        });
        formRef.current.reset();
        setTimeout(() => setNotification({ show: false, type: '', message: '' }), 5000);
      })
      .catch((error) => {
        console.log('Error:', error.text);
        setNotification({
          show: true,
          type: 'error',
          message: '✗ Failed to send message. Please try again later.'
        });
        setTimeout(() => setNotification({ show: false, type: '', message: '' }), 5000);
      });
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuActive(false);
    }
  };

  // Disable Automated Crisp Features (Welcome & Triggers)
  useEffect(() => {
    if (window.$crisp) {
      // Disable the manual welcome message trigger and the default Crisp welcome system
      window.$crisp.push(["set", "chat:welcome", [false]]);
      // Disable all proactive automated triggers
      window.$crisp.push(["set", "chat:triggers", [false]]);
    }
  }, []);

  return (
    <div className={`App ${showPoster ? 'poster-active' : ''}`}>
      {showPoster && (
        <div className={`welcome-poster ${isExiting ? 'exiting' : ''}`}>
          <div className="poster-overlay"></div>
          <div className="poster-content">
            <div className="poster-glow"></div>
            <div className="poster-image-container animate-fade-up">
              <img src={profileImg} alt="Waqas Khan" className="poster-profile-img" />
            </div>
            <h2 className="poster-title animate-fade-up delay-1">Welcome to My Portfolio</h2>
            <p className="poster-text animate-fade-up delay-2">
              I’m glad you’re here — explore my work, skills, and creative journey.
            </p>
          </div>
        </div>
      )}

      {/* ===================================
          NAVBAR
          =================================== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <img src={profileImg} alt="WK" className="navbar-logo-img" />
            <div className="logo-details">
              <span className="logo-name">Waqas Khan</span>
              <div className="availability-status">
                <span className="status-icon">💬</span>
                <span className="status-text">Available for new projects</span>
              </div>
            </div>
          </a>

          <ul className={`navbar-menu ${menuActive ? 'active' : ''}`}>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
            <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Portfolio</a></li>
            <li><a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>Team</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>

          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <button
              className={`navbar-toggle ${menuActive ? 'active' : ''}`}
              onClick={() => setMenuActive(!menuActive)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ===================================
          FLOATING SOCIAL SIDEBAR
          =================================== */}
      <div
        className={`premium-contact-wrapper ${menuActive ? 'hidden' : ''}`}
        onClick={() => window.$crisp && window.$crisp.push(['do', 'chat:open'])}
      >
        <span className="bubble-element"></span>
        <span className="bubble-element"></span>
        <span className="bubble-element"></span>
      </div>

      <div className={`social-sidebar ${menuActive ? 'hidden' : ''}`}>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="linkedin"><i className="fab fa-linkedin"></i></a>
        <a href="https://x.com/waqask_niazi" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="twitter"><i className="fab fa-x-twitter"></i></a>
        <a href="https://youtube.com/@muhammadwaqaskhan-z5r?si=1Y2hsgAvTvcoBMaF" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="youtube"><i className="fab fa-youtube"></i></a>
        <a href="https://vm.tiktok.com/ZSHoddr9ME8hm-OVbh4/" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="tiktok"><i className="fab fa-tiktok"></i></a>
        <a href="https://www.facebook.com/share/1D3p7ZD4rC/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="facebook"><i className="fab fa-facebook"></i></a>
      </div>

      {/* ===================================
          HERO SECTION
          =================================== */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text reveal reveal-up">
              <h1 className="reveal reveal-up stagger-1">
                Hi, I'm <span className="highlight">Waqas Khan</span>
                <br />
                <span className="typing-text">Full Stack Developer</span>
              </h1>
              <p className="tagline reveal reveal-up stagger-2">
                Building modern, scalable web applications by leading our experienced team with cutting-edge technologies
              </p>
              <div className="hero-buttons reveal reveal-up stagger-3">
                <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
                  Get In Touch
                </button>
                <button className="btn btn-outline" onClick={() => scrollToSection('portfolio')}>
                  View My Work
                </button>
              </div>
            </div>
            <div className="hero-image reveal reveal-scale stagger-2">
              <div className="hero-image-wrapper">
                <img
                  src={profileImg}
                  alt="Waqas Khan"
                  loading="eager"
                  width="460"
                  height="460"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================
          ABOUT SECTION
          =================================== */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-title">
            <h2>About Us</h2>
            <p>A central look at our collective journey, leadership, and expertise</p>
          </div>

          <div className="about-radial-wrapper">
            {/* Radial Nodes Container */}
            <div className="about-radial-layout">

              {/* Center Profile Image */}
              <div className="about-center-node">
                <div className="about-image-ring"></div>
                <img src={profileImg} alt="Waqas Khan" className="about-center-img" loading="lazy" />
              </div>

              {/* Node 1: Education (Top Left) */}
              <div className="about-node node-top-left education-detailed reveal reveal-left stagger-1">
                <div className="node-icon"><i className="fas fa-graduation-cap"></i></div>
                <div className="node-content">
                  <h4>Education</h4>

                  <div className="edu-timeline">
                    <div className="edu-item">
                      <div className="edu-dot"></div>
                      <h5>BS Computer Science (BSCS)</h5>
                      <span className="edu-inst">Foundation in Software Engineering</span>
                      <p>Focus on algorithms, logic, and core development concepts.</p>
                    </div>

                    <div className="edu-item">
                      <div className="edu-dot"></div>
                      <h5>Full Stack Web & App Development 📘</h5>
                      <span className="edu-inst">Professional Certification</span>
                      <p>React, React Native, Node.js, and Modern Web Practices.</p>
                    </div>

                    <div className="edu-item">
                      <div className="edu-dot"></div>
                      <h5>Intermediate (FSc)</h5>
                      <span className="edu-inst">Pre-Engineering</span>
                      <p>Strong analytical and mathematical background.</p>
                    </div>

                    <div className="edu-item">
                      <div className="edu-dot"></div>
                      <h5>Matriculation 🔬</h5>
                      <span className="edu-inst">Science Foundation</span>
                      <p>Early technical and scientific fundamentals.</p>
                    </div>
                  </div>
                </div>
                <div className="node-connector"></div>
              </div>

              {/* Node 2: Experience (Top Right) */}
              <div className="about-node node-top-right experience-detailed reveal reveal-right stagger-1">
                <div className="node-icon"><i className="fas fa-briefcase"></i></div>
                <div className="node-content">
                  <h4>Experience</h4>

                  <div className="exp-timeline">
                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>Full Stack Web Dev</h5>
                        <span className="exp-duration">1 Year Overall</span>
                      </div>
                      <p>Focused on clean code, UI consistency, and React-based performance.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>Modern Web Internship</h5>
                        <span className="exp-duration">3 Months</span>
                      </div>
                      <p>Built mini-projects and improved debugging & project structuring.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>React.js Internship</h5>
                        <span className="exp-duration">2 Months</span>
                      </div>
                      <p>Reusable components, state management, and component architecture.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>Backend Internship</h5>
                        <span className="exp-duration">2 Months</span>
                      </div>
                      <p>API development, database management, and server-side logic using Node.js.</p>
                    </div>
                  </div>
                </div>
                <div className="node-connector"></div>
              </div>

              {/* Node 3: Career Goals (Bottom Right) */}
              <div className="about-node node-bottom-right goals-detailed reveal reveal-right stagger-2">
                <div className="node-icon"><i className="fas fa-bullseye"></i></div>
                <div className="node-content">
                  <h4>Career Goal</h4>

                  <div className="exp-timeline">
                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>Team Expansion 🤝</h5>
                      </div>
                      <p>Integrating professional Video Editors and Graphic Designers into our team.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>New Services 🚛</h5>
                      </div>
                      <p>Launching and managing Truck Dispatching as a parallel professional offering.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>Business Objectives 📉</h5>
                      </div>
                      <p>Expanding the firm into a diverse developer group with enterprise-scale projects.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>Future Vision 🚀</h5>
                      </div>
                      <p>Aiming for long-term collaborations on complex, industry-standard digital solutions.</p>
                    </div>
                  </div>
                </div>
                <div className="node-connector"></div>
              </div>

              {/* Node 4: Our Departments (Bottom Left) */}
              <div className="about-node node-bottom-left departments-detailed reveal reveal-left stagger-2">
                <div className="node-icon"><i className="fas fa-layer-group"></i></div>
                <div className="node-content">
                  <h4>Our Departments</h4>

                  <div className="exp-timeline">
                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>Web Development 💻</h5>
                      </div>
                      <p>Full-stack web solutions using React, Node.js, and modern tech.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>App Development 📱</h5>
                      </div>
                      <p>Building high-performance Android & iOS mobile applications.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>UI/UX Design 🎨</h5>
                      </div>
                      <p>Crafting creative, user-friendly layouts and brand identities.</p>
                    </div>

                    <div className="exp-item">
                      <div className="exp-dot"></div>
                      <div className="exp-header">
                        <h5>Q/A Department 🔍</h5>
                      </div>
                      <p>Ensuring quality, bug-free delivery, and performance testing.</p>
                    </div>
                  </div>
                </div>
                <div className="node-connector"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===================================
          SERVICES SECTION
          =================================== */}
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-title">
            <h2>Services</h2>
            <p>Specialized in modern technologies and high-performance digital solutions</p>
          </div>
          <div className="services-grid">
            {/* Service 1: Website Development */}
            <div className="card service-card reveal reveal-up stagger-1">
              <div className="service-icon"><i className="fas fa-laptop-code"></i></div>
              <h3>Website Development</h3>
              <ul className="service-features">
                <li>Responsive and modern websites</li>
                <li>Custom UI with clean and scalable code</li>
                <li>SEO-friendly and performance-optimized layouts</li>
              </ul>
            </div>

            {/* Service 2: Web App Development */}
            <div className="card service-card reveal reveal-up stagger-2">
              <div className="service-icon"><i className="fas fa-rocket"></i></div>
              <h3>Web App Development</h3>
              <ul className="service-features">
                <li>Interactive and dynamic web applications</li>
                <li>Built using modern technologies (React, JavaScript)</li>
                <li>Scalable and maintainable architecture</li>
              </ul>
            </div>

            {/* Service 3: Mobile App Development */}
            <div className="card service-card reveal reveal-up stagger-3">
              <div className="service-icon"><i className="fas fa-mobile-screen-button"></i></div>
              <h3>Mobile App Development</h3>
              <ul className="service-features">
                <li>Cross-platform mobile applications</li>
                <li>Smooth performance and clean UI</li>
                <li>User-focused functionality</li>
              </ul>
            </div>

            {/* Service 4: UI / UX & Frontend Development */}
            <div className="card service-card">
              <div className="service-icon"><i className="fas fa-wand-magic-sparkles"></i></div>
              <h3>UI / UX & Frontend Development</h3>
              <ul className="service-features">
                <li>User-centered UI/UX design</li>
                <li>Responsive frontend development</li>
                <li>Modern layouts and accessibility-focused design</li>
              </ul>
            </div>

            {/* Service 5: Backend Development */}
            <div className="card service-card">
              <div className="service-icon"><i className="fas fa-server"></i></div>
              <h3>Backend Development</h3>
              <ul className="service-features">
                <li>Server-side development and APIs</li>
                <li>Database integration and data handling</li>
                <li>Secure and scalable backend solutions</li>
              </ul>
            </div>

            {/* Service 6: Bug Fixing & Website Support */}
            <div className="card service-card">
              <div className="service-icon"><i className="fas fa-bug-slash"></i></div>
              <h3>Bug Fixing & Website Support</h3>
              <ul className="service-features">
                <li>Fix frontend and backend issues</li>
                <li>Debugging, optimization, and automation</li>
                <li>Website maintenance and technical support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================
          PORTFOLIO SECTION
          =================================== */}
      <section id="portfolio" className="section portfolio-section">
        <div className="container">
          <div className="section-title">
            <h2>Portfolio</h2>
            <p>A selection of projects crafted with precision and performance in mind</p>
          </div>

          <div className="portfolio-carousel-wrapper">
            {/* Scroll Buttons */}
            <button
              className="carousel-btn btn-left"
              onClick={() => {
                const track = document.getElementById('portfolioTrack');
                track.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              aria-label="Scroll Left"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <button
              className="carousel-btn btn-right"
              onClick={() => {
                const track = document.getElementById('portfolioTrack');
                track.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              aria-label="Scroll Right"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Carousel Track */}
            <div
              className="portfolio-track-container"
              id="portfolioTrack"
              ref={portfolioTrackRef}
              onMouseEnter={() => isHoveringPortfolio.current = true}
              onMouseLeave={() => isHoveringPortfolio.current = false}
            >
              <div className="portfolio-track-content">
                <div className="portfolio-set">
                  {/* VIP POS System Project */}
                  <div className="portfolio-card-modern reveal reveal-up stagger-1 vip-card">
                    <div className="portfolio-card-header">
                      <div className="vip-badge">VIP</div>
                      <div className="custom-pos-logo">
                        <div className="logo-circle">
                          <i className="fas fa-shopping-basket"></i>
                          <div className="logo-text-glow">P.O.S</div>
                        </div>
                      </div>
                    </div>
                    <div className="portfolio-card-body">
                      <h3>VIP POS System</h3>
                      <span className="portfolio-card-type">Enterprise Solution</span>
                      <div className="portfolio-card-tags">
                        <span>Blade</span>
                        <span>Laravel</span>
                        <span>MySQL</span>
                      </div>
                      <div className="portfolio-card-actions">
                        <a href="https://waqas84251.github.io/posflowgallery/" className="portfolio-btn btn-explore">
                          <i className="fas fa-globe"></i> Explore Flow on Website
                        </a>
                        <a href="https://github.com/waqas84251/possystem" className="portfolio-btn btn-source">
                          <i className="fas fa-code"></i> View Source Code
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Project 1 */}
                  <div className="portfolio-card-modern reveal reveal-up stagger-1">
                    <div className="portfolio-card-header">
                      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" alt="E-commerce" />
                    </div>
                    <div className="portfolio-card-body">
                      <h3>E-commerce Store</h3>
                      <span className="portfolio-card-type">Full Stack App</span>
                      <div className="portfolio-card-tags">
                        <span>React</span>
                        <span>Node.js</span>
                      </div>
                    </div>
                  </div>

                  {/* Project 2 */}
                  <div className="portfolio-card-modern">
                    <div className="portfolio-card-header">
                      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" alt="Analytics" />
                    </div>
                    <div className="portfolio-card-body">
                      <h3>Analytics Pro</h3>
                      <span className="portfolio-card-type">Dashboard</span>
                      <div className="portfolio-card-tags">
                        <span>D3.js</span>
                        <span>Firebase</span>
                      </div>
                    </div>
                  </div>

                  {/* Project 3 */}
                  <div className="portfolio-card-modern">
                    <div className="portfolio-card-header">
                      <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" alt="Social App" />
                    </div>
                    <div className="portfolio-card-body">
                      <h3>Connect Social</h3>
                      <span className="portfolio-card-type">Mobile App</span>
                      <div className="portfolio-card-tags">
                        <span>Socket.io</span>
                        <span>PostgreSQL</span>
                      </div>
                    </div>
                  </div>

                  {/* Project 4 */}
                  <div className="portfolio-card-modern">
                    <div className="portfolio-card-header">
                      <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" alt="Task Manager" />
                    </div>
                    <div className="portfolio-card-body">
                      <h3>Task Flow</h3>
                      <span className="portfolio-card-type">Productivity</span>
                      <div className="portfolio-card-tags">
                        <span>Redux</span>
                        <span>Express</span>
                      </div>
                    </div>
                  </div>

                  {/* Project 5 */}
                  <div className="portfolio-card-modern">
                    <div className="portfolio-card-header">
                      <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop" alt="Portfolio" />
                    </div>
                    <div className="portfolio-card-body">
                      <h3>Dev Portfolio</h3>
                      <span className="portfolio-card-type">Personal Site</span>
                      <div className="portfolio-card-tags">
                        <span>Framer</span>
                        <span>CSS3</span>
                      </div>
                    </div>
                  </div>

                  {/* Project 6 */}
                  <div className="portfolio-card-modern">
                    <div className="portfolio-card-header">
                      <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop" alt="Fitness App" />
                    </div>
                    <div className="portfolio-card-body">
                      <h3>FitTrack Pro</h3>
                      <span className="portfolio-card-type">Health Tech</span>
                      <div className="portfolio-card-tags">
                        <span>React Native</span>
                        <span>MySQL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===================================
          TEAM SECTION (INTERACTIVE CAROUSEL)
          =================================== */}
      < section id="team" className="section team-section" >
        <div className="container">
          <div className="section-title">
            <h2>Our Expert Team</h2>
            <p>A specialized task force of technology experts</p>
          </div>

          <div className="team-carousel-wrapper">
            {/* Scroll Buttons */}
            <button
              className="carousel-btn btn-left"
              onClick={() => {
                const track = document.getElementById('teamTrack');
                track.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              aria-label="Scroll Left"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <button
              className="carousel-btn btn-right"
              onClick={() => {
                const track = document.getElementById('teamTrack');
                track.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              aria-label="Scroll Right"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Carousel Track */}
            <div
              className="team-track-container"
              id="teamTrack"
              ref={teamTrackRef}
              onMouseEnter={() => isHoveringTeam.current = true}
              onMouseLeave={() => isHoveringTeam.current = false}
            >
              <div className="team-track-content">
                <div className="team-set">
                  {/* Member 1 */}
                  <div className="team-card-circular reveal reveal-scale stagger-1">
                    <div className="member-img-circle">
                      <img src={profileImg} alt="Waqas Khan" />
                    </div>
                    <h3>Waqas Khan</h3>
                    <span className="member-role">Team Lead</span>
                    <span className="member-tech">MERN Stack Expert</span>
                  </div>

                  {/* Member 1.5: Muhammad Ahmad */}
                  <div className="team-card-circular">
                    <div className="member-img-circle">
                      <img src={ahmadImg} alt="Muhammad Ahmad" loading="lazy" />
                    </div>
                    <h3>Muhammad Ahmad</h3>
                    <span className="member-role">Software Engineer</span>
                    <span className="member-tech">MERN Stack</span>
                  </div>

                  {/* Member 2 */}
                  <div className="team-card-circular">
                    <div className="member-img-circle">
                      <img src={huzaifaImg} alt="Huzaifa Nadeem" loading="lazy" />
                    </div>
                    <h3>Huzaifa Nadeem</h3>
                    <span className="member-role">UI/UX Designer</span>
                    <span className="member-tech">Figma Specialist</span>
                  </div>

                  {/* Member 3 */}
                  <div className="team-card-circular">
                    <div className="member-img-circle">
                      <img src={harisImg} alt="Haris Sultan Shah" loading="lazy" />
                    </div>
                    <h3>Haris Sultan Shah</h3>
                    <span className="member-role">Frontend Expert</span>
                    <span className="member-tech">React / Tailwind</span>
                  </div>

                  {/* Member 4 */}
                  <div className="team-card-circular">
                    <div className="member-img-circle">
                      <img src={abdulRehmanImg} alt="Abdul Rehman Khan" loading="lazy" />
                    </div>
                    <h3>Abdul Rehman Khan</h3>
                    <span className="member-role">Backend Expert</span>
                    <span className="member-tech">Node.js / Express</span>
                  </div>

                  {/* Member 5 */}
                  <div className="team-card-circular">
                    <div className="member-img-circle">
                      <img src={rajaSaifImg} alt="Raja Saif" loading="lazy" />
                    </div>
                    <h3>Raja Saif</h3>
                    <span className="member-role">Modern Web Expert</span>
                    <span className="member-tech">Laravel / PHP</span>
                  </div>

                  {/* Member 6 */}
                  <div className="team-card-circular">
                    <div className="member-img-circle">
                      <img src={abdullahImg} alt="Chaudhary Abdullah" loading="lazy" />
                    </div>
                    <h3>Chaudhary Abdullah</h3>
                    <span className="member-role">Mobile App Developer</span>
                    <span className="member-tech">React Native</span>
                  </div>

                  {/* Member 7 */}
                  <div className="team-card-circular">
                    <div className="member-img-circle">
                      <img src={naveedImg} alt="Naveed Abbas" loading="lazy" />
                    </div>
                    <h3>Naveed Abbas</h3>
                    <span className="member-role">SQA Expert</span>
                    <span className="member-tech">Manual & Automation</span>
                  </div>

                  {/* Member 8: Abdul Basit */}
                  <div className="team-card-circular">
                    <div className="member-img-circle">
                      <img src={abdulBasitImg} alt="Abdul Basit" loading="lazy" />
                    </div>
                    <h3>Abdul Basit</h3>
                    <span className="member-role">Python Expert</span>
                    <span className="member-tech">Python / Backend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >


      {/* ===================================
          CONTACT SECTION
          =================================== */}
      {/* ===================================
          CONTACT SECTION
          =================================== */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-title">
            <h2>Get In Touch</h2>
            <p>Please send me an email so I can reply to you, or feel free to start a live chat—I'm here to help!</p>
          </div>

          <div className="contact-container">
            {/* Left Side: Info & Trust */}
            <div className="contact-info">
              <h3>Let's Build Something Extraordinary</h3>
              <p>
                Have a project in mind? Whether you need a full-stack application,
                a stunning website, or a custom mobile solution, my team and I are
                ready to bring your vision to life.
              </p>

              <div className="contact-details">
                <div
                  className="contact-item email-box-card reveal reveal-left stagger-1"
                  aria-label="Send email to nwaqas1166@gmail.com"
                  onClick={(e) => {
                    const email = "nwaqas1166@gmail.com";
                    const subject = encodeURIComponent("Project Inquiry from Portfolio");
                    const body = encodeURIComponent("Hello 👋\n\nI visited your portfolio and I’m impressed with your work.\n\nI’d like to discuss a potential project.\n\nLooking forward to your response.");

                    // Detect if it's a mobile device
                    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

                    if (isMobile) {
                      // Use mailto: for mobile apps to ensure subject and body are pre-filled
                      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                    } else {
                      // Gmail Direct Compose URL for Desktop
                      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
                      window.open(gmailUrl, '_blank');
                    }

                    // Always copy to clipboard as fallback
                    navigator.clipboard.writeText(email);

                    // Simple UI Feedback
                    const label = e.currentTarget.querySelector('span');
                    const originalText = label.innerText;
                    label.innerText = "Email Copied!";
                    setTimeout(() => label.innerText = originalText, 2000);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="icon-box">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="item-text">
                    <span>Send Email</span>
                    <p>nwaqas1166@gmail.com</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/923095450891?text=Hi%20Waqas!%20%F0%9F%91%8B%20I%20just%20checked%20out%20your%20portfolio%20and%20I'm%20absolutely%20impressed%20with%20your%20expertise.%20I'd%20love%20to%20discuss%20a%20potential%20project%20collaboration%20with%20you.%20When%20are%20you%20available%20for%20a%20quick%20chat%3F%20%F0%9F%9A%80"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item whatsapp-item"
                  aria-label="Chat with Waqas on WhatsApp"
                >
                  <div className="icon-box whatsapp-box">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="item-text">
                    <span>Chat on WhatsApp</span>
                    <p>+92 309 5450891</p>
                  </div>
                </a>

                <div className="contact-item">
                  <div className="icon-box">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="item-text">
                    <span>Location</span>
                    <p>Pakistan</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Side: Form */}
            <div className="contact-form-wrapper">
              {notification.show && (
                <div className={`notification ${notification.type}`}>
                  {notification.message}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="fas fa-user"></i> Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email so I can reply to you shortly"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <i className="fas fa-comment-alt"></i> Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>

            {/* VIP Chat Invite Card - Positioned in the middle below */}
            <div
              className="chat-invite-card "
              onClick={() => window.$crisp && window.$crisp.push(['do', 'chat:open'])}
            >
              <div className="chat-avatar-wrapper">
                <img src={chatAvatarImg} alt="Waqas" loading="lazy" />
                <span className="online-badge"></span>
              </div>
              <div className="chat-content">
                <div className="chat-header">
                  <h4>Muhammad Waqas</h4>
                  <span>Admin</span>
                </div>
                <div className="chat-message-box">
                  <p className="typing-text">
                    Hello! 👋 Welcome to my portfolio. I’m Muhammad Waqas. Excited to start a project with you! 🚀
                  </p>
                </div>
                <button className="start-chat-btn">
                  <span>Start Live Chat</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================
          FOOTER
          =================================== */}
      < footer className="footer" >
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              © 2026 Waqas Khan. All rights reserved. Built with React & passion.
            </p>
          </div>
        </div>
      </footer >
    </div >
  );
}

export default App;
