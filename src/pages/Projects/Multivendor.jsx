import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Twitter, Facebook, Instagram, Linkedin, Mail, Shield, CheckCircle } from "lucide-react";
import multivendor from "../../assets/images/multivendor.png";
import Footer from "../../components/Footer";
import "./email.css";

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


const Container = ({ children, className = '', ...props }) => (
  <div className={`mui-container ${className}`} {...props}>
    {children}
  </div>
);

const Typography = ({ variant = 'body1', component, children, className = '', ...props }) => {
  const Component = component ||
    (variant === 'h1' || variant === 'h2' || variant === 'h3' ||
      variant === 'h4' || variant === 'h5' || variant === 'h6') ? variant : 'p';

  return (
    <Component className={`mui-typography-${variant} ${className}`} {...props}>
      {children}
    </Component>
  );
};

const Paper = ({ children, elevation = 1, className = '', ...props }) => (
  <div className={`mui-paper mui-elevation-${elevation} ${className}`} {...props}>
    {children}
  </div>
);

const List = ({ children, className = '', ...props }) => (
  <div className={`mui-list ${className}`} {...props}>
    {children}
  </div>
);

const ListItem = ({ children, className = '', ...props }) => (
  <div className={`mui-list-item ${className}`} {...props}>
    {children}
  </div>
);

const CheckIcon = ({ color = '#1976d2' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
      fill={color} />
  </svg>
);

const FeatureIcons = {
  clock: ({ color = '#1976d2' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z"
        fill={color} />
    </svg>
  ),
  autoFix: ({ color = '#1976d2' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 5.6L10 7L8.6 4.5L10 2L7.5 3.4L5 2L6.4 4.5L5 7L7.5 5.6ZM19.5 15.4L17 14L18.4 16.5L17 19L19.5 17.6L22 19L20.6 16.5L22 14L19.5 15.4ZM22 2L20.6 4.5L22 7L19.5 5.6L17 7L18.4 4.5L17 2L19.5 3.4L22 2ZM13.34 12.78L15.78 10.34L13.66 8.22L11.22 10.66L13.34 12.78ZM14.37 7.29L16.71 9.63C17.1 10.02 17.1 10.65 16.71 11.04L5.04 22.71C4.65 23.1 4.02 23.1 3.63 22.71L1.29 20.37C0.9 19.98 0.9 19.35 1.29 18.96L12.96 7.29C13.35 6.9 13.98 6.9 14.37 7.29Z"
        fill={color} />
    </svg>
  ),
  brain: ({ color = '#1976d2' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3C9.2 3 6.2 5.9 6 9.7L4.1 12.2C3.9 12.5 4.1 13 4.5 13H6V16C6 17.1 6.9 18 8 18H9V21H16V16.3C18.4 15.2 20 12.8 20 10C20 6.1 16.9 3 13 3ZM16 10C14.9 10 14 9.1 14 8C14 7.6 14.1 7.2 14.3 6.9L15.3 8.3C15.5 8.7 16 8.8 16.4 8.6C16.8 8.4 16.9 7.9 16.7 7.5L15.7 6.1C16.1 6 16.5 6 17 6.1C17.6 6.5 18 7.2 18 8C18 9.1 17.1 10 16 10Z"
        fill={color} />
    </svg>
  ),
  devices: ({ color = '#1976d2' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H22V4H4C2.9 4 2 4.9 2 6V17H0V20H14V17H4V6ZM23 8H17C16.45 8 16 8.45 16 9V19C16 19.55 16.45 20 17 20H23C23.55 20 24 19.55 24 19V9C24 8.45 23.55 8 23 8ZM22 17H18V10H22V17Z"
        fill={color} />
    </svg>
  ),
  timer: ({ color = '#1976d2' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1H9V3H15V1ZM11 14H13V8H11V14ZM19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13C3 17.97 7.02 22 12 22C16.98 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM12 20C8.13 20 5 16.87 5 13C5 9.13 8.13 6 12 6C15.87 6 19 9.13 19 13C19 16.87 15.87 20 12 20Z"
        fill={color} />
    </svg>
  )
};



function Multivendor() {
  const [email, setEmail] = useState("");
  const [featureIndex, setFeatureIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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
        let seconds = prev.seconds - 1;
        let minutes = prev.minutes;
        let hours = prev.hours;
        let days = prev.days;

        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }

        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }

        if (hours < 0) {
          hours = 23;
          days -= 1;
        }

        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
          clearInterval(timer);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  // Transition styles for animation
  const transition = {
    type: "spring",
    stiffness: 100,
    damping: 20
  };

  ;






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

  // Check screen size for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const features = [
    {
      title: "Vendor Management",
      description: "Dedicated dashboard with bulk product uploads",
      icon: <FeatureIcons.clock color="#2E7D32" />,
      color: "#2E7D32"
    },
    {
      title: "Product Search & Filters",
      description: "Advanced filtering by size, color, price, and more",
      icon: <FeatureIcons.autoFix color="#1565C0" />,
      color: "#1565C0"
    },
    {
      title: "Order & Payments",
      description: "Multi-vendor cart with secure payment options",
      icon: <FeatureIcons.brain color="#7B1FA2" />,
      color: "#7B1FA2"
    },
    {
      title: "Customer Engagement",
      description: "Wishlists, reviews, and personalized recommendations",
      icon: <FeatureIcons.devices color="#EF6C00" />,
      color: "#EF6C00"
    },
    {
      title: "Delivery & Logistics",
      description: "Flexible shipping options and tracking",
      icon: <FeatureIcons.timer color="#C62828" />,
      color: "#C62828"
    }
  ];

  // Auto-scroll through features with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        setFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
        setFadeIn(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="email-assistant-page">
      <Header />

      {/* Hero Section with Enhanced Animation */}
      <section className="email-hero-section py-5" style={{ backgroundColor: theme.white }}>
        <div className="email-container container">
          <motion.div
            className="email-text-center text-center py-4"
            {...fadeIn}
          >
            <motion.h1
              className="email-display-4 display-4 fw-bold mb-3 mt-5"
              style={{
                color: theme.primary,
                fontSize: '3.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                marginTop: '0.8rem',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            >
              Multi-Vendor
            </motion.h1>

            <motion.p
              className="email-lead lead mb-4 fw-bold"
              style={{
                color: theme.secondary,
                fontSize: '1.4rem',
                fontWeight: '500'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              A platform enabling multiple sellers to list, sell, and manage products.
            </motion.p>

            <motion.div
              className="email-hero-image-container mt-5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 30 }}
            >
              <img
                src={multivendor}
                alt="Email Assistant Dashboard"
                className="email-img-fluid img-fluid rounded shadow-lg"
                style={{
                  border: `4px solid ${theme.light}`,
                  height: "550px", // Limit height
                  width: "100%",      // Maintain aspect ratio
                  maxWidth: "100%"    // Ensure it doesn't overflow container
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      

      {/* Email Assistant in Motion Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}>


        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px"
        }}>


          {/* Right side - Content with animations */}
          <div style={{
            flex: 1,
            order: isMobile ? 1 : 2
          }} className="animate-fadeIn">
            <Typography variant="h1">
              Features in Action

            </Typography>

            <List>
              {features.map((feature, index) => (
                <ListItem
                  key={index}
                  className={`mui-elevation-1 ${index === featureIndex ? 'feature-active' : 'feature-inactive'}`}
                  style={{
                    opacity: fadeIn && index === featureIndex ? 1 : 0.8,
                    transition: "all 0.3s ease"
                  }}
                >
                  <div className="feature-icon">
                    <CheckIcon color={feature.color} />
                  </div>

                  <div className="feature-content">
                    <Typography variant="h6" style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                      {feature.description}
                    </Typography>
                  </div>

                  <div className="feature-extra" style={{ display: isMobile ? "none" : "block" }}>
                    {feature.icon}
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>

      {/* Coming Soon Section with Enhanced Animation */}
      <div className="coming-soon-section" style={{ background: theme.light, padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
          <div className="card" style={{
            opacity: 0,
            transform: 'translateY(20px)',
            animation: 'fadeUp 0.8s forwards',
            background: `linear-gradient(135deg, ${theme.light} 0%, rgba(255,255,255,0.9) 100%)`,
            borderRadius: '8px',
            border: `1px solid ${theme.accent}`,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div className="card-body" style={{ padding: '2.5rem' }}>
              <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                <div style={{
                  opacity: 0,
                  transform: 'scale(0.9)',
                  animation: 'scaleIn 1s forwards 0.2s'
                }}>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent'
                  }}>
                    Coming Soon
                  </h2>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      backgroundColor: theme.primary,
                      color: theme.white,
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      marginBottom: '1.5rem',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}>
                      <span className="pulse-dot" style={{ marginRight: '0.5rem' }}></span>
                      In Development
                    </div>
                  </div>

                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: theme.secondary,
                    marginBottom: '0.5rem'
                  }}>
                    Get early access to our powerful new features
                  </p>
                  <p style={{
                    color: 'rgba(0,0,0,0.6)',
                    marginBottom: '1.5rem',
                    fontSize: '1rem'
                  }}>
                    Join our waiting list and be the first to know when we launch
                  </p>
                </div>
              </div>

              {/* Countdown timer */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeUp 0.8s forwards 0.3s'
              }}>
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Minutes" },
                  { value: countdown.seconds, label: "Seconds" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="countdown-item"
                    style={{
                      background: theme.white,
                      minWidth: '80px',
                      padding: '0.75rem',
                      textAlign: 'center',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      border: `2px solid ${theme.accent}`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      color: theme.primary,
                      marginBottom: 0
                    }}>
                      {item.value}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      color: theme.secondary
                    }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subscription form */}
              <div style={{
                maxWidth: '550px',
                margin: '0 auto',
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeUp 0.8s forwards 0.5s'
              }}>
                {formSubmitted ? (
                  <div style={{
                    backgroundColor: theme.accent,
                    color: theme.white,
                    padding: '1rem',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <CheckCircle size={18} style={{ marginRight: '0.5rem' }} />
                    Thank you! You'll be notified when we launch.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        position: 'relative',
                        borderRadius: '6px',
                        overflow: 'hidden'
                      }} className="input-group">
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 1rem',
                          backgroundColor: theme.light,
                          borderTop: `1px solid ${theme.accent}`,
                          borderLeft: `1px solid ${theme.accent}`,
                          borderBottom: `1px solid ${theme.accent}`,
                          borderTopLeftRadius: '6px',
                          borderBottomLeftRadius: '6px'
                        }}>
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          aria-label="Email address"
                          style={{
                            flex: '1 1 auto',
                            padding: '0.75rem 1rem',
                            fontSize: '1rem',
                            border: `1px solid ${theme.accent}`,
                            outline: 'none',
                            height: '52px'
                          }}
                        />
                        <button
                          type="submit"
                          className="notify-button"
                          style={{
                            backgroundColor: theme.primary,
                            color: theme.white,
                            fontWeight: 'bold',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderTopRightRadius: '6px',
                            borderBottomRightRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Notify Me
                        </button>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <small style={{ color: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center' }}>
                        <Shield size={14} style={{ marginRight: '0.25rem' }} />
                        We respect your privacy and never share your information
                      </small>

                      <div style={{ marginTop: '0.5rem' }}>
                        <input
                          type="checkbox"
                          id="newsletterCheck"
                          defaultChecked
                          style={{
                            marginRight: '0.5rem',
                            accentColor: theme.accent
                          }}
                        />
                        <label htmlFor="newsletterCheck" style={{ fontSize: '0.875rem' }}>
                          Subscribe to newsletter
                        </label>
                      </div>
                    </div>
                  </form>
                )}

                {/* Social sharing */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ height: '1px', width: '60px', backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
                    <span style={{ padding: '0 1rem', color: 'rgba(0,0,0,0.5)', fontSize: '0.875rem' }}>
                      Or stay connected
                    </span>
                    <div style={{ height: '1px', width: '60px', backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <a href="#" className="social-icon" style={{ padding: '0.5rem', border: '1px solid #e1e1e1', borderRadius: '50%', color: '#1DA1F2' }}>
                      <Twitter size={18} />
                    </a>
                    <a href="#" className="social-icon" style={{ padding: '0.5rem', border: '1px solid #e1e1e1', borderRadius: '50%', color: '#4267B2' }}>
                      <Facebook size={18} />
                    </a>
                    <a href="#" className="social-icon" style={{ padding: '0.5rem', border: '1px solid #e1e1e1', borderRadius: '50%', color: '#E1306C' }}>
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="social-icon" style={{ padding: '0.5rem', border: '1px solid #e1e1e1', borderRadius: '50%', color: '#0077B5' }}>
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .pulse-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
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
        
        .countdown-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        
        .notify-button:hover {
          background-color: #1565c0;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
        }
        
        .social-icon {
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .input-group {
            flex-direction: column;
          }
          
          .input-group > div:first-child {
            border-radius: 6px 6px 0 0;
            border-right: 1px solid ${theme.accent};
            border-bottom: none;
          }
          
          .input-group > input {
            border-radius: 0;
            border-top: none;
          }
          
          .input-group > button {
            border-radius: 0 0 6px 6px;
            padding: 1rem;
          }
          
          .countdown-item {
            min-width: 65px;
          }
        }
      `}</style>
      </div>

      <Footer />
    </div>
  );
}

export default Multivendor;