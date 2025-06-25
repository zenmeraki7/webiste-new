import React, { useEffect, useState } from 'react';
import { TbDeviceMobileCheck } from "react-icons/tb";
import { RiSeoLine } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { FiChevronRight } from "react-icons/fi";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// Using the same CSS file from ShopifyApp component
import './Style.css';

function Website() {
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
      icon: <TbDeviceMobileCheck />,
      title: "Responsive and mobile-optimized designs"
    },
    {
      icon: <RiSeoLine />,
      title: "SEO-friendly development to maximize visibility"
    },
    {
      icon: <CgWebsite />,
      title: "Fast, secure, and scalable websites tailored to your goals"
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
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="bg-shape shape1"></div>
          <div className="bg-shape shape2"></div>
          <div className="bg-shape shape3"></div>
        </div>
        <div className={`hero-content ${isVisible ? 'is-visible' : ''}`}>
          <h1>WEBSITE DEVELOPMENT</h1>
          <p>Crafting Websites That Captivate and Convert</p>
          <button className="btn-primary"
           onClick={() => window.location.href = '/contact'}>
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
              <h2 className="section-title animate-on-scroll">Crafting Websites That Captivate and Convert</h2>
              <p className="section-description animate-on-scroll">
                We create stunning, user-friendly websites that drive engagement and conversions:
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
                  <div className="mockup-title">Website Preview</div>
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
                      <div className="chart-bar" style={{height: '60%'}}></div>
                      <div className="chart-bar" style={{height: '80%'}}></div>
                      <div className="chart-bar" style={{height: '40%'}}></div>
                      <div className="chart-bar" style={{height: '70%'}}></div>
                      <div className="chart-bar" style={{height: '90%'}}></div>
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

export default Website;