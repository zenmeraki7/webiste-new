import React, { useRef, useEffect } from "react";
import { Briefcase, MapPin, ChevronRight } from "lucide-react";
import './Careers.css'; // Import the CSS file
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import careers from "../../assets/images/careers.png"; 


const Careers = () => {
  const jobRef = useRef(null);

  const scrollToSection = () => {
    jobRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Animation on scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.careers-animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.9) {
          element.classList.add('careers-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Jobs array for when the company is hiring
  const jobs = [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Backend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
    },
    {
      title: "UI/UX Designer",
      location: "New York, NY",
      type: "Contract",
    },
    {
      title: "Product Manager",
      location: "Remote",
      type: "Part-time",
    },
  ];

  return (
    <div className="careers-page">
      <Header />

      {/* Hero section */}
      <section className="careers-hero">
        <div className="careers-hero-content careers-fade-in">
          <h1 className="careers-hero-title">
            Discover Your Future at Zen Meraki
          </h1>
          <p className="careers-hero-subtitle">
            Join our team of innovators and help shape the future of e-commerce excellence
          </p>
          <button className="careers-hero-button careers-bounce" onClick={scrollToSection}>
            Explore Opportunities
          </button>
        </div>
      </section>

      {/* Values section */}
      <section className="careers-values-section">
        <div className="careers-container">
          <div className="careers-section-header careers-animate-on-scroll">
            <h2 className="careers-section-title">Our Core Values</h2>
            <p className="careers-section-subtitle">
              We're committed to excellence and quality in everything we do. Our values define who we are and guide how we work together.
            </p>
          </div>
          
          <div className="careers-values-row">
            {/* Value 1 */}
            <div className="careers-value-card careers-animate-on-scroll" style={{transitionDelay: "0.1s"}}>
              <div className="careers-value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0e3b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="careers-value-title">Honesty</h3>
              <p className="careers-value-description">
                We embrace transparency and inclusivity, ensuring that our global audience is always heard through the integration of multilingual support.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="careers-value-card careers-animate-on-scroll" style={{transitionDelay: "0.2s"}}>
              <div className="careers-value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0e3b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v8"></path>
                  <path d="M18.4 6.5l-5.5 5.5"></path>
                  <path d="M8 16H2"></path>
                  <path d="M9 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                  <path d="M15 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0"></path>
                  <path d="M12 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
                </svg>
              </div>
              <h3 className="careers-value-title">Innovation</h3>
              <p className="careers-value-description">
                We foster a culture of creativity and technological advancement, driving new ideas and solutions that revolutionize the e-commerce space.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="careers-value-card careers-animate-on-scroll" style={{transitionDelay: "0.3s"}}>
              <div className="careers-value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0e3b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
              <h3 className="careers-value-title">Recognition</h3>
              <p className="careers-value-description">
                We take pride in our achievements and continuous growth, delivering high-quality features that have earned recognition and loyalty from our clients.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="careers-value-card careers-animate-on-scroll" style={{transitionDelay: "0.4s"}}>
              <div className="careers-value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0e3b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4"></path>
                  <path d="M12 18v4"></path>
                  <path d="m4.93 4.93 2.83 2.83"></path>
                  <path d="m16.24 16.24 2.83 2.83"></path>
                  <path d="M2 12h4"></path>
                  <path d="M18 12h4"></path>
                  <path d="m4.93 19.07 2.83-2.83"></path>
                  <path d="m16.24 7.76 2.83-2.83"></path>
                </svg>
              </div>
              <h3 className="careers-value-title">Efficiency</h3>
              <p className="careers-value-description">
                We optimize every process to ensure maximum productivity and seamless user experiences, leading to sustainable and long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why join us section */}
      <section className="careers-join-us-section">
        <div className="careers-container">
          <div className="careers-join-us-container">
            <div className="careers-join-us-image careers-animate-on-scroll" style={{transitionDelay: "0.1s"}}>
              <img src={careers} alt="Team collaboration" className="careers-pulse" />
            </div>
            <div className="careers-join-us-content careers-animate-on-scroll" style={{transitionDelay: "0.3s"}}>
              <h2 className="careers-section-title">Why Join Our Team?</h2>
              <div className="careers-benefits-list">
                <div className="careers-benefit-item careers-animate-on-scroll" style={{transitionDelay: "0.5s"}}>
                  <div className="careers-benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="careers-benefit-details">
                    <h3>Growth Opportunities</h3>
                    <p>Continuous learning and professional development are integral parts of our culture.</p>
                  </div>
                </div>
                
                <div className="careers-benefit-item careers-animate-on-scroll" style={{transitionDelay: "0.6s"}}>
                  <div className="careers-benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="careers-benefit-details">
                    <h3>Collaborative Environment</h3>
                    <p>We foster a supportive community where every voice matters and teamwork thrives.</p>
                  </div>
                </div>
                
                <div className="careers-benefit-item careers-animate-on-scroll" style={{transitionDelay: "0.7s"}}>
                  <div className="careers-benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="careers-benefit-details">
                    <h3>Competitive Benefits</h3>
                    <p>We offer attractive compensation packages and benefits that support your well-being.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="careers-jobs-section" ref={jobRef} id="jobs">
        <div className="careers-container">
          <h2 className="careers-section-title careers-text-center careers-animate-on-scroll">Current Opportunities</h2>
          
          <div className="careers-not-hiring-card careers-animate-on-scroll">
            <h3 className="careers-not-hiring-title careers-text-focus-in">Currently Not Hiring</h3>
            <p className="careers-not-hiring-text">
              We may not have open positions right now, but we're always on the lookout for talented individuals like you!
            </p>
            <div className="careers-email-section careers-animate-on-scroll" style={{transitionDelay: "0.2s"}}>
              <p className="careers-email-label">Drop your CV at:</p>
              <a href="mailto:officialzenmeraki@gmail.com" className="careers-email-link careers-scale-on-hover">
                officialzenmeraki@gmail.com
              </a>
            </div>
            <p className="careers-future-message careers-animate-on-scroll" style={{transitionDelay: "0.3s"}}>
              Join us in building something extraordinary — your journey with us could begin soon!
            </p>
          </div>
          
          {/* Sample job positions section (hidden when not hiring) */}
          <div className="careers-job-listings" style={{ display: 'none' }}>
            {jobs.map((job, index) => (
              <div key={index} className="careers-job-card careers-animate-on-scroll" style={{transitionDelay: `${0.1 * (index + 1)}s`}}>
                <div className="careers-job-info">
                  <div className="careers-job-icon">
                    <Briefcase size={24} color="#0e3b39" />
                  </div>
                  <div className="careers-job-details">
                    <h3>{job.title}</h3>
                    <div className="careers-job-meta">
                      <div className="careers-job-location">
                        <MapPin size={16} className="careers-mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <span className="careers-job-type">{job.type}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={24} color="#0e3b39" className="careers-icon-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;