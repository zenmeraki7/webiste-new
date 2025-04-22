import React, { useRef } from "react";
import { Briefcase, MapPin, ChevronRight } from "lucide-react";
import './Careers.css'; // Import the CSS file
import Header from "../../components/Header";

const Careers = () => {
  const jobRef = useRef(null);

  const scrollToSection = () => {
    jobRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="career-page">
      <Header />

      {/* Hero section */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}></div>
        <div className="container hero-content">
          <h1 className="hero-title">
            Discover Your Future at <span>Zen Meraki</span>
          </h1>
          <p className="hero-subtitle">
            Join our team of innovators and help shape the future of e-commerce excellence
          </p>
          <button className="hero-button" onClick={scrollToSection}>
            Explore Opportunities
          </button>
        </div>
      </section>

      {/* Values section */}
      <section className="values-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">
            We're committed to excellence and quality in everything we do. Our values define who we are and guide how we work together.
          </p>
        </div>
        
        <div className="values-row">
          {/* Value 1 */}
          <div className="value-card">
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0e3b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <h3 className="value-title">Honesty</h3>
            <p className="value-description">
              We embrace transparency and inclusivity, ensuring that our global audience is always heard through the integration of multilingual support.
            </p>
          </div>
          
          {/* Value 2 */}
          <div className="value-card">
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0e3b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v8"></path>
                <path d="M18.4 6.5l-5.5 5.5"></path>
                <path d="M8 16H2"></path>
                <path d="M9 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                <path d="M15 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0"></path>
                <path d="M12 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
              </svg>
            </div>
            <h3 className="value-title">Innovation</h3>
            <p className="value-description">
              We foster a culture of creativity and technological advancement, driving new ideas and solutions that revolutionize the e-commerce space.
            </p>
          </div>
          
          {/* Value 3 */}
          <div className="value-card">
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0e3b39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
            </div>
            <h3 className="value-title">Recognition</h3>
            <p className="value-description">
              We take pride in our achievements and continuous growth, delivering high-quality features that have earned recognition and loyalty from our clients.
            </p>
          </div>
          
          {/* Value 4 */}
          <div className="value-card">
            <div className="value-icon">
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
            <h3 className="value-title">Efficiency</h3>
            <p className="value-description">
              We optimize every process to ensure maximum productivity and seamless user experiences, leading to sustainable and long-term success.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Why join us section */}
      <section className="join-us-section">
        <div className="container">
          <div className="join-us-container">
            <div className="join-us-image slide-in-left">
              <img src="https://specials-images.forbesimg.com/imageserve/65fb34a45e253140736dc172/960x0.jpg" alt="Team collaboration" style={{height:"500px"}} />
            </div>
            <div className="join-us-content slide-in-right">
              <h2 className="section-title">Why Join Our Team?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="benefit-details">
                    <h3>Growth Opportunities</h3>
                    <p>Continuous learning and professional development are integral parts of our culture.</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="benefit-details">
                    <h3>Collaborative Environment</h3>
                    <p>We foster a supportive community where every voice matters and teamwork thrives.</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="benefit-details">
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
      <section className="jobs-section" ref={jobRef} id="jobs">
        <div className="container">
          <h2 className="section-title text-center">Current Opportunities</h2>
          
          <div className="not-hiring-card slide-in-up">
            <h3 className="not-hiring-title">Currently Not Hiring</h3>
            <p className="not-hiring-text">
              We may not have open positions right now, but we're always on the lookout for talented individuals like you!
            </p>
            <div className="email-section">
              <p className="email-label">Drop your CV at:</p>
              <a href="mailto:officialzenmeraki@gmail.com" className="email-link">
                officialzenmeraki@gmail.com
              </a>
            </div>
            <p className="future-message">
              Join us in building something extraordinary — your journey with us could begin soon!
            </p>
          </div>
          
          {/* Sample job positions section (hidden when not hiring) */}
          <div className="job-listings" style={{ display: 'none' }}>
            {jobs.map((job, index) => (
              <div key={index} className="job-card">
                <div className="job-info">
                  <div className="job-icon">
                    <Briefcase size={24} color="#0e3b39" />
                  </div>
                  <div className="job-details">
                    <h3>{job.title}</h3>
                    <div className="job-meta">
                      <div className="job-location">
                        <MapPin size={16} className="mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <span className="job-type">{job.type}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={24} color="#0e3b39" />
              </div>
            ))}
          </div>
        </div>
      </section>

    

      
    </div>
  );
};

export default Careers;