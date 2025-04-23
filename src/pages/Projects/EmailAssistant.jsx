import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import emailproject from "../../assets/images/emailproject.png";
import emailwrk from "../../assets/images/emailwrk.jpg";
import emailnew from "../../assets/images/emailnew.webp";
import Footer from "../../components/Footer";

// Using the same color theme as Metamatrix
const theme = {
  primary: "#0e3b39",
  secondary: "#1a5e5c",
  accent: "#2c8280",
  light: "#e6f2f2",
  white: "#ffffff",
  dark: "#052525"
};

// Enhanced animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

const slideFromLeft = {
  initial: { opacity: 0, x: -70 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.9, type: "spring", stiffness: 50 }
};

const slideFromRight = {
  initial: { opacity: 0, x: 70 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.9, type: "spring", stiffness: 50 }
};

const slideFromBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, type: "spring", stiffness: 40 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const listItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

function EmailAssistant() {
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState({
    days: 24,
    hours: 12,
    minutes: 36,
    seconds: 45
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  // Add functioning countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setFormSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setEmail("");
      setFormSubmitted(false);
    }, 3000);
  };

  const handleNavigate = () => {
    navigate("/privacy");
  };

  return (
    <div className="email-assistant-page">
      <Header />

      {/* Hero Section with Enhanced Animation */}
      <section className="hero-section py-5" style={{ backgroundColor: theme.white }}>
        <div className="container">
          <motion.div
            className="text-center"
            {...fadeIn}
          >
            <motion.h1
              className="display-4 fw-bold mb-3"
              style={{ color: theme.primary }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            >
              Email Assistant
            </motion.h1>

            <motion.p
              className="lead mb-4 fw-bold"
              style={{ color: theme.secondary }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Your Smart Email Companion
            </motion.p>

            <motion.div
              className="hero-image-container mt-5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 30 }}
            >
              <img
                src={emailproject}
                alt="Email Assistant Dashboard"
                className="img-fluid rounded shadow-lg"
                style={{ 
                  border: `4px solid ${theme.light}`,
                  maxHeight: "500px", // Limit height
                  width: "auto",      // Maintain aspect ratio
                  maxWidth: "100%"    // Ensure it doesn't overflow container
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section with Staggered Animation */}
      <section className="overview-section py-5" style={{ backgroundColor: theme.primary, color: theme.white }}>
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-5"
            {...slideFromLeft}
          >
            Email Assistant in a Nutshell
          </motion.h2>

          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 mb-4 mb-lg-0"
              {...slideFromLeft}
            >
              <div className="pe-lg-4">
                <motion.p className="mb-4">
                  Our Email Assistance tool is designed to enhance email management, helping businesses automate responses, organize inboxes, and improve customer interactions.
                </motion.p>

                <motion.h5 className="fw-bold mb-3" {...fadeIn}>
                  Key features:
                </motion.h5>

                <motion.ul
                  className="feature-list"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <motion.li variants={listItem}>✔ Smart Email Automation – Automatically respond to common queries with predefined templates</motion.li>
                  <motion.li variants={listItem}>✔ Inbox Organization – Categorize, filter, and prioritize emails for better efficiency</motion.li>
                  <motion.li variants={listItem}>✔ Bulk Email Actions – Send, archive, or delete multiple emails at once</motion.li>
                  <motion.li variants={listItem}>✔ Customizable Templates – Create and personalize email responses to maintain brand consistency</motion.li>
                  <motion.li variants={listItem}>✔ Real-Time Notifications – Get alerts for important emails and follow-ups</motion.li>
                </motion.ul>

                <motion.div
                  className="d-flex justify-content-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <button
                    className="btn mt-4 w-50"
                    onClick={handleNavigate}
                    style={{
                      backgroundColor: theme.white,
                      color: theme.primary,
                      borderColor: theme.white,
                      fontWeight: "bold"
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: theme.light,
                      transition: { duration: 0.3 }
                    }}
                  >
                    Learn More
                  </button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-6"
              {...slideFromRight}
            >
              <div className="text-center">
                <motion.img
                  src={emailwrk}
                  alt="Email Assistant Overview"
                  className="img-fluid rounded shadow-lg"
                  style={{
                    maxHeight: "350px",         // Reduced from 400px
                    objectFit: "contain",       // Changed from cover to contain
                    width: "100%",              // Added to ensure responsive sizing
                    border: `4px solid ${theme.accent}`
                  }}
                  whileHover={{
                    scale: 1.03,               // Reduced scale effect
                    boxShadow: "0 15px 20px rgba(0, 0, 0, 0.15)",
                    rotate: 1
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Email Assistant in Motion Section */}
      <section className="motion-section py-5" style={{ backgroundColor: theme.white }}>
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-5"
            style={{ color: theme.primary }}
            {...fadeIn}
          >
            Email Assistant in Motion
          </motion.h2>

          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 order-lg-2"
              {...slideFromRight}
            >
              <div className="ps-lg-4">
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div
                    className="feature-card mb-3 p-3 rounded shadow-sm"
                    style={{ backgroundColor: theme.light, borderLeft: `4px solid ${theme.accent}` }}
                    variants={slideFromBottom}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                      backgroundColor: theme.white,
                      borderLeft: `8px solid ${theme.accent}`
                    }}
                  >
                    <h5 className="fw-bold" style={{ color: theme.primary }}>✔ Real-time processing</h5>
                    <p className="mb-0" style={{ color: theme.secondary }}>Monitors, prioritizes, and categorizes emails as they arrive</p>
                  </motion.div>

                  <motion.div
                    className="feature-card mb-3 p-3 rounded shadow-sm"
                    style={{ backgroundColor: theme.light, borderLeft: `4px solid ${theme.accent}` }}
                    variants={slideFromBottom}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                      backgroundColor: theme.white,
                      borderLeft: `8px solid ${theme.accent}`
                    }}
                  >
                    <h5 className="fw-bold" style={{ color: theme.primary }}>✔ Smart automation</h5>
                    <p className="mb-0" style={{ color: theme.secondary }}>Suggests responses, creates tasks, and schedules meetings automatically</p>
                  </motion.div>

                  <motion.div
                    className="feature-card mb-3 p-3 rounded shadow-sm"
                    style={{ backgroundColor: theme.light, borderLeft: `4px solid ${theme.accent}` }}
                    variants={slideFromBottom}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                      backgroundColor: theme.white,
                      borderLeft: `8px solid ${theme.accent}`
                    }}
                  >
                    <h5 className="fw-bold" style={{ color: theme.primary }}>✔ Adaptive learning</h5>
                    <p className="mb-0" style={{ color: theme.secondary }}>Improves with use, learning your style and preferences</p>
                  </motion.div>

                  <motion.div
                    className="feature-card mb-3 p-3 rounded shadow-sm"
                    style={{ backgroundColor: theme.light, borderLeft: `4px solid ${theme.accent}` }}
                    variants={slideFromBottom}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                      backgroundColor: theme.white,
                      borderLeft: `8px solid ${theme.accent}`
                    }}
                  >
                    <h5 className="fw-bold" style={{ color: theme.primary }}>✔ Seamless experience</h5>
                    <p className="mb-0" style={{ color: theme.secondary }}>Works consistently across all your devices and locations</p>
                  </motion.div>

                  <motion.div
                    className="feature-card p-3 rounded shadow-sm"
                    style={{ backgroundColor: theme.light, borderLeft: `4px solid ${theme.accent}` }}
                    variants={slideFromBottom}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                      backgroundColor: theme.white,
                      borderLeft: `8px solid ${theme.accent}`
                    }}
                  >
                    <h5 className="fw-bold" style={{ color: theme.primary }}>✔ Time-saving</h5>
                    <p className="mb-0" style={{ color: theme.secondary }}>Handles routine correspondence so you can focus on what matters</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-6 order-lg-1"
              {...slideFromLeft}
            >
              <div className="text-center">
                <motion.img
                  src={emailnew}
                  alt="Email Assistant in Motion"
                  className="img-fluid rounded shadow-lg"
                  style={{
                    maxHeight: "350px",         // Reduced from 400px
                    objectFit: "contain",       // Changed from cover to contain
                    width: "100%",              // Added to ensure responsive sizing
                    border: `4px solid ${theme.light}`
                  }}
                  whileHover={{
                    scale: 1.03,               // Reduced scale effect
                    boxShadow: "0 15px 20px rgba(0, 0, 0, 0.15)",
                    rotate: -1
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section with Enhanced Animation */}
      <section className="coming-soon-section py-5" style={{ backgroundColor: theme.light }}>
        <div className="container">
          <motion.div
            className="card shadow-lg border-0 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: `linear-gradient(135deg, ${theme.light} 0%, rgba(255,255,255,0.9) 100%)`,
              border: `1px solid ${theme.accent}`
            }}
          >
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, type: "spring", stiffness: 100 }}
                >
                  <h2
                    className="mb-3 fw-bold"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 3.5rem)", // Reduced size
                      background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textFillColor: "transparent"
                    }}
                  >
                    Coming Soon
                  </h2>

                  <div className="d-flex justify-content-center">
                    <div className="badge py-2 px-3 mb-4 text-uppercase" style={{ backgroundColor: theme.primary }}>
                      <span className="pulse-dot me-2"></span>In Development
                    </div>
                  </div>

                  <p className="lead fw-bold mb-2" style={{ color: theme.secondary }}>
                    Get early access to our powerful new features
                  </p>
                  <p className="text-muted mb-4">
                    Join our waiting list and be the first to know when we launch
                  </p>
                </motion.div>
              </div>

              {/* Countdown timer with matching style */}
              <motion.div
                className="row justify-content-center mb-5 g-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Minutes" },
                  { value: countdown.seconds, label: "Seconds" }
                ].map((item, index) => (
                  <div className="col-auto" key={index}>
                    <motion.div
                      className="countdown-item text-center p-3 shadow-sm rounded"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                        backgroundColor: theme.white
                      }}
                      style={{
                        background: theme.white,
                        minWidth: "80px", // Reduced from 90px
                        border: `2px solid ${theme.accent}`
                      }}
                    >
                      <div className="h3 mb-0 fw-bold" style={{ color: theme.primary }}>{item.value}</div>
                      <div className="small text-uppercase" style={{ color: theme.secondary }}>{item.label}</div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Email subscription form with matching style */}
              <motion.div
                className="mx-auto"
                style={{ maxWidth: "550px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {formSubmitted ? (
                  <div className="alert shadow-sm" role="alert" style={{ backgroundColor: theme.accent, color: theme.white }}>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Thank you! You'll be notified when we launch.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="subscription-form">
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text" style={{ backgroundColor: theme.light, borderColor: theme.accent }}>
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          aria-label="Email address"
                          style={{
                            borderColor: theme.accent,
                            height: "52px" // Reduced from 56px
                          }}
                        />
                        <motion.button
                          className="btn btn-lg"
                          type="submit"
                          whileHover={{ scale: 1.03 }} // Reduced from 1.05
                          whileTap={{ scale: 0.97 }}
                          style={{
                            backgroundColor: theme.primary,
                            color: theme.white,
                            fontWeight: "bold"
                          }}
                        >
                          Notify Me
                        </motion.button>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <small className="text-muted">
                        <i className="bi bi-shield-check me-1"></i>
                        We respect your privacy and will never share your information
                      </small>

                      <div className="form-check mt-2 mt-sm-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="newsletterCheck"
                          defaultChecked
                          style={{ borderColor: theme.accent }}
                        />
                        <label className="form-check-label small" htmlFor="newsletterCheck">
                          Subscribe to newsletter
                        </label>
                      </div>
                    </div>
                  </form>
                )}

                {/* Social sharing with matching style */}
                <div className="text-center mt-4"> {/* Changed from flex to standard bootstrap classes */}
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="bg-secondary opacity-25" style={{ height: "1px", width: "60px" }}></div>
                    <span className="px-3 text-muted small">Or stay connected</span>
                    <div className="bg-secondary opacity-25" style={{ height: "1px", width: "60px" }}></div>
                  </div>

                  <div className="d-flex justify-content-center gap-3"> {/* Changed spacing and alignment */}
                    <a href="#" className="p-2 rounded-circle border" style={{ color: "#1DA1F2", transition: "all 0.3s ease" }}>
                      <Twitter size={18} />
                    </a>
                    <a href="#" className="p-2 rounded-circle border" style={{ color: "#4267B2", transition: "all 0.3s ease" }}>
                      <Facebook size={18} />
                    </a>
                    <a href="#" className="p-2 rounded-circle border" style={{ color: "#E1306C", transition: "all 0.3s ease" }}>
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="p-2 rounded-circle border" style={{ color: "#0077B5", transition: "all 0.3s ease" }}>
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          .pulse-dot {
            display: inline-block;
            width: 6px;          /* Reduced from 8px */
            height: 6px;         /* Reduced from 8px */
            background-color: #fff;
            border-radius: 50%;
            animation: pulse 1.5s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          .subscription-form .input-group {
            border-radius: 6px;  /* Reduced from 8px */
            overflow: hidden;
          }
          
          /* Improved mobile responsiveness */
          @media (max-width: 768px) {
            .countdown-item {
              min-width: 65px; /* Reduced from 70px */
            }
            
            .input-group {
              flex-direction: column;
            }
            
            .input-group > * {
              margin-bottom: 10px;
              width: 100%;
              border-radius: 6px !important;
            }
            
            .input-group > *:last-child {
              margin-bottom: 0;
            }
            
            /* Fix for small screens */
            h2 {
              font-size: 1.75rem !important;
            }
            
            .lead {
              font-size: 1rem;
            }
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}

export default EmailAssistant;