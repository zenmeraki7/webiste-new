import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, 
  FaArrowRight,
  FaChevronDown,
  FaLinkedin,
  FaGithub,
  FaQuoteLeft,
  FaStar
} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import Footer from '../../components/Footer';
import {ANIMATION_VARIANTS} from './hooks/variants';
import {CORE_VALUES} from './hooks/variants';
import {SERVICES} from './hooks/variants';
import {TEAM_MEMBERS} from './hooks/variants';
import {TESTIMONIALS} from './hooks/variants';
import {useScrollAnimation, useIntersectionObserver, useTypewriter, useAnimatedCounter} from './hooks/Abouthooks';
import {ErrorBoundary} from '../AboutUs/hooks/ErrorBoundary';
import './About.css';
import Header from '../../components/Header';

// Component Implementations
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <FaRocket className="loading-icon" />
  </div>
);

// Enhanced Metric Card with Animation
const MetricCard = React.memo(({ number, label, suffix = '', inView }) => {
  const animatedNumber = useAnimatedCounter(number, 2000, inView);
  
  return (
    <div className="metric-card">
      <span className="metric-number">
        {animatedNumber}{suffix}
      </span>
      <span className="metric-label">
        {label}
      </span>
    </div>
  );
});

// Value Card Component
const ValueCard = React.memo(({ value, index }) => {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });
  const IconComponent = value.icon;
  
  return (
    <motion.div
      ref={ref}
      className="value-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: value.delay }}
    >
      <motion.div 
        className="value-card"
        {...ANIMATION_VARIANTS.scaleOnHover}
        whileTap={{ scale: 0.98 }}
      >
        <div className="value-icon-container">
          <motion.div 
            className="value-icon"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <IconComponent size={32} />
          </motion.div>
        </div>
        <h5 className="value-title">
          {value.title}
        </h5>
        <p className="value-description">
          {value.description}
        </p>
      </motion.div>
    </motion.div>
  );
});

// Enhanced Service Card
const ServiceCard = React.memo(({ service, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });
  const IconComponent = service.icon;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <motion.div 
        className="service-card"
        {...ANIMATION_VARIANTS.scaleOnHover}
        layout
      >
        <div className="service-header">
          <div className="service-icon">
            <IconComponent />
          </div>
          <h4 className="service-title">
            {service.title}
          </h4>
        </div>
        
        <p className="service-description">
          {service.description}
        </p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="service-features"
            >
              {service.features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="service-feature"
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          className="service-expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Show less' : 'Show more features'}
        >
          <FaChevronDown 
            className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
          />
        </button>
      </motion.div>
    </motion.div>
  );
});

// Team Member Card
const TeamCard = React.memo(({ member, index }) => {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="team-card"
    >
      <div className="team-avatar">
        <span>{member.avatar}</span>
      </div>
      <h4 className="team-name">
        {member.name}
      </h4>
      <div className="team-role">
        {member.role}
      </div>
      <p className="team-bio">
        {member.bio}
      </p>
      <div className="team-social">
        <a 
          href={member.social.linkedin} 
          className="social-link"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a 
          href={member.social.github} 
          className="social-link"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </motion.div>
  );
});

// Testimonial Card
const TestimonialCard = React.memo(({ testimonial, index }) => {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="testimonial-card"
    >
      <div className="testimonial-quote-icon">
        <FaQuoteLeft />
      </div>
      <p className="testimonial-text">
        "{testimonial.text}"
      </p>
      <div className="testimonial-author">
        <div className="author-info">
          <div className="author-name">
            {testimonial.author}
          </div>
          <div className="author-role">
            {testimonial.role}
          </div>
        </div>
        <div className="testimonial-rating">
          {[...Array(testimonial.rating)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

// Main Component
function AboutUs() {
  const navigate = useNavigate();
  const { y1, opacity } = useScrollAnimation();
  const [mounted, setMounted] = useState(false);
  const [metricsRef, metricsInView] = useIntersectionObserver({ threshold: 0.3 });
  
  const heroText = useTypewriter(
    "In a World of Possibilities, We Create Limitless Digital Experiences",
    { delay: 1000, speed: 50 }
  );
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const memoizedValues = useMemo(() => 
    CORE_VALUES.map((value, index) => (
      <ValueCard key={value.id} value={value} index={index} />
    )), []
  );

  const memoizedServices = useMemo(() =>
    SERVICES.map((service, index) => (
      <ServiceCard key={service.id} service={service} index={index} />
    )), []
  );

  const memoizedTeam = useMemo(() =>
    TEAM_MEMBERS.map((member, index) => (
      <TeamCard key={member.id} member={member} index={index} />
    )), []
  );

  const memoizedTestimonials = useMemo(() =>
    TESTIMONIALS.map((testimonial, index) => (
      <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
    )), []
  );

  if (!mounted) return <LoadingSpinner />;

  return (
    <ErrorBoundary>
      <div className="about-us-container" role="main">
<Header/>
        {/* Enhanced Hero Section */}
        <section 
          className="hero-section"
          aria-labelledby="hero-title"
        >
          <motion.div 
            className="hero-background"
            style={{ y: y1, opacity }}
          />
          
          <motion.div
            className="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <motion.h1 
              id="hero-title"
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {heroText}
            </motion.h1>
            
            <div className="hero-text-container">
              <motion.p 
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Welcome to <span className="brand-gradient">Zen Meraki</span>, where innovative 
                technology meets exceptional craftsmanship. We architect digital solutions 
                that transform businesses and delight users worldwide.
              </motion.p>
              
              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <button 
                  className="btn btn-primary"
                  onClick={handleContactClick}
                  aria-label="Start your project with us"
                >
                  Start Your Journey <FaArrowRight />
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => scrollToSection('our-story')}
                  aria-label="Learn more about our story"
                >
                  Our Story
                </button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => scrollToSection('vision')}
          >
            <FaChevronDown />
          </motion.div>
        </section>

        {/* Enhanced Vision Card */}
        <div className="container">
          <motion.div
            id="vision"
            className="vision-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="vision-content">
              <div className="vision-text">
                <h2 className="section-title">
                  OUR VISION
                  <div className="section-underline" />
                </h2>
                <p className="vision-description">
                  To democratize cutting-edge technology and empower businesses 
                  of all sizes to compete in the digital-first economy through 
                  innovative, scalable, and user-centric solutions that drive measurable growth.
                </p>
              </div>
              <div className="metrics-grid" ref={metricsRef}>
                <MetricCard number={100} label="Projects Delivered" suffix="+" inView={metricsInView} />
                <MetricCard number={100} label="Client Satisfaction" suffix="%" inView={metricsInView} />
                <MetricCard number={5} label="Countries Served" suffix="+" inView={metricsInView} />
                <MetricCard number={24} label="Support Hours" suffix="/7" inView={metricsInView} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Story Section */}
        <section id="our-story" className="story-section">
          <div className="container">
            <motion.div
              className="story-content"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={ANIMATION_VARIANTS.staggerContainer}
            >
              <div className="story-text">
                <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
                  <h2 className="section-title">
                    Our Story
                    <div className="section-underline" />
                  </h2>
                  <p className="story-description">
                    Founded by passionate engineers and designers, Zen Meraki emerged 
                    from a simple belief: technology should empower, not complicate. 
                    What started as a small team's vision has evolved into a full-service 
                    digital agency trusted by startups and Fortune 500 companies alike.
                  </p>
                  <p className="story-description">
                    Today, we combine deep technical expertise with human-centered design 
                    to create digital experiences that drive real business value and 
                    deliver measurable ROI for our clients.
                  </p>
                </motion.div>
              </div>
              <div className="timeline-container">
                <motion.div 
                  className="timeline"
                  variants={ANIMATION_VARIANTS.fadeInUp}
                >
                  <div className="timeline-line" />
                  {[
                    { year: '2020', content: 'Founded with focus on mobile app development and startup solutions' },
                    { year: '2022', content: 'Expanded to full-stack web development and enterprise solutions' },
                    { year: '2024', content: 'Pioneered AI/ML integration and cloud-native architecture solutions' },
                    { year: '2025', content: 'Global expansion with 100+ projects delivered across 5+ countries' }
                  ].map((item, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-year">
                        {item.year}
                      </div>
                      <div className="timeline-content">
                        {item.content}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Core Values */}
        <section className="values-section">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">
                What Drives Us
                <div className="section-underline centered" />
              </h2>
              <p className="section-description">
                Our core principles shape every decision, every line of code, 
                and every client interaction to deliver exceptional results.
              </p>
            </motion.div>

            <div className="values-grid">
              {memoizedValues}
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className="services-section">
          <div className="services-background" />
          
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title white">
                OUR EXPERTISE
                <div className="section-underline centered" />
              </h2>
              <p className="section-description white">
                From concept to deployment, we deliver comprehensive digital solutions 
                that scale with your business and exceed user expectations.
              </p>
            </motion.div>

            <div className="services-grid">
              {memoizedServices}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        {/* <section className="testimonials-section">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">
                What Our Clients Say
                <div className="section-underline centered" />
              </h2>
              <p className="section-description">
                Don't just take our word for it. Here's what industry leaders 
                say about working with Zen Meraki.
              </p>
            </motion.div>

            <div className="testimonials-grid">
              {memoizedTestimonials}
            </div>
          </div>
        </section> */}

        <section>
          <Footer/>
        </section>
      </div>
    </ErrorBoundary>
  );
}

export default React.memo(AboutUs);