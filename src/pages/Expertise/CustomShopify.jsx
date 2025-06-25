import React, { useEffect, useState } from 'react';
import { FaHandshake } from "react-icons/fa";
import { TbAutomation } from "react-icons/tb";
import { MdOutlineApps } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import dash from '../../assets/images/dash.mp4';
// Using the same CSS file from ShopifyApp component
import './Style.css';

function CustomShopify() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show initial animations
    setIsVisible(true);
    
    // Animate elements on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight - 100) {
          element.classList.add('is-visible');
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Run once to check initial elements in view
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Features data
  const features = [
    {
      icon: <FaHandshake />,
      title: "Fully customized solutions for bespoke business workflows"
    },
    {
      icon: <TbAutomation />,
      title: "Enhanced automation and process efficiency"
    },
    {
      icon: <MdOutlineApps />,
      title: "Apps built to match your brand's identity and vision"
    }
  ];

  // Process steps data
  const processSteps = [
    {
      phase: "Phase – 1",
      title: "Client Collaboration & Proposals",
      points: [
        "Understanding your unique needs to craft tailored solutions.",
        "Conduct in-depth discussions to grasp your business objectives.",
        "Analyze challenges and identify opportunities for growth.",
        "Present customized proposals that align with your vision and budget."
      ]
    },
    {
      phase: "Phase – 2",
      title: "Strategy Development & Planning",
      points: [
        "Laying the foundation for success with a well-defined roadmap.",
        "Develop a comprehensive project strategy based on your requirements.",
        "Plan milestones and allocate resources for efficient execution.",
        "Ensure transparency and alignment through regular updates."
      ]
    },
    {
      phase: "Phase – 3",
      title: "Execution, Review & Delivery",
      points: [
        "Bringing your ideas to life while maintaining quality at every step.",
        "Implement the plan with precision using the latest tools and technologies.",
        "Conduct thorough reviews to ensure the highest quality standards.",
        "Deliver the completed project on time and provide post-launch support."
      ]
    }
  ];

  return (
    <div className="shopify-app">
       <Header />
      {/* Hero Section with Video Background */}
      <section className="hero video-hero">
        <div className={`hero-content ${isVisible ? 'is-visible' : ''}`}>
          <h1>CUSTOM SHOPIFY APP DEVELOPMENT</h1>
          <p>Tailored Apps for Unique Business Needs</p>
          <button className="btn-primary"
           onClick={() => window.location.href = '/contact'}
           >
            Get Started <FiChevronRight className="icon-right" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-grid">
            <div className="content-column">
              <span className="overline animate-on-scroll">Innovative · Reliable · Results-Driven</span>
              <h2 className="section-title animate-on-scroll">Tailored Apps for Unique Business Needs</h2>
              <p className="section-description animate-on-scroll">
                Our expertise in custom Shopify app development ensures your store stands out with unique capabilities:
              </p>
              
              <div className="features-list">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card animate-on-scroll" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <div className="feature-content">
                      <h3>{feature.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="visual-column animate-on-scroll">
              <div className="app-mockup">
                <div className="mockup-header">
                  <div className="mockup-controls">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mockup-title">Custom App Dashboard</div>
                </div>
                <div className="mockup-body">
                  <div className="mockup-sidebar">
                    <div className="sidebar-item active"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                  </div>
                  <div className="mockup-content">
                    <div className="mockup-chart">
                      <div className="chart-bar" style={{height: '75%'}}></div>
                      <div className="chart-bar" style={{height: '45%'}}></div>
                      <div className="chart-bar" style={{height: '90%'}}></div>
                      <div className="chart-bar" style={{height: '60%'}}></div>
                      <div className="chart-bar" style={{height: '80%'}}></div>
                    </div>
                    <div className="mockup-stats">
                      <div className="stat-box"></div>
                      <div className="stat-box"></div>
                      <div className="stat-box"></div>
                    </div>
                    <div className="mockup-table">
                      <div className="table-row"></div>
                      <div className="table-row"></div>
                      <div className="table-row"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <span className="overline text-center animate-on-scroll">Innovative · Reliable · Results-Driven</span>
          <h2 className="section-title text-center animate-on-scroll">The Steps We Follow To Achieve Your Goals</h2>
          <p className="section-description text-center mx-auto animate-on-scroll">
            We turn your vision into reality with precision and creativity.
          </p>

          <div className="process-cards">
            {processSteps.map((step, index) => (
              <div key={index} className="process-card animate-on-scroll" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="process-number">{index + 1}</div>
                <div className="process-label">{step.phase}</div>
                <h3>{step.title}</h3>
                <ul>
                  {step.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}

export default CustomShopify;