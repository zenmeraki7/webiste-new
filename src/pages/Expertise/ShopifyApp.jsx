import React, { useEffect, useState } from 'react';
import { FiShoppingBag, FiSettings, FiBarChart2, FiChevronRight } from "react-icons/fi";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Style.css';

function ShopifyApp() {
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
      icon: <FiShoppingBag />,
      title: "Custom Shopify Solutions",
      description: "Tailored applications designed specifically for your unique business requirements and customer needs."
    },
    {
      icon: <FiSettings />,
      title: "Seamless Integrations",
      description: "Connect your store with third-party tools and APIs for enhanced functionality and automation."
    },
    {
      icon: <FiBarChart2 />,
      title: "Scalable Architecture",
      description: "Future-proof solutions built to grow alongside your business and accommodate increasing demand."
    }
  ];

  // Process steps data
  const processSteps = [
    {
      phase: "Discovery",
      title: "Understanding Your Requirements",
      points: [
        "In-depth consultation to understand your business goals",
        "Competitive analysis and market research",
        "Defining key functionalities and priorities",
        "Creating a detailed project roadmap"
      ]
    },
    {
      phase: "Development",
      title: "Building Your Solution",
      points: [
        "Agile development with regular progress updates",
        "Rigorous testing across devices and scenarios",
        "Optimizing for performance and scalability",
        "Implementing security best practices"
      ]
    },
    {
      phase: "Deployment",
      title: "Launch & Ongoing Support",
      points: [
        "Seamless deployment to your Shopify store",
        "Comprehensive training and documentation",
        "Post-launch monitoring and optimization",
        "Dedicated support and maintenance"
      ]
    }
  ];

  return (
    <div className="shopify-app">
      {/* Hero Section */}
      <Header />
      <section className="hero">
        
        <div className="hero-background">
          <div className="bg-shape shape1"></div>
          <div className="bg-shape shape2"></div>
          <div className="bg-shape shape3"></div>
        </div>
        <div className={`hero-content ${isVisible ? 'is-visible' : ''}`}>
          <h1>SHOPIFY APP DEVELOPMENT</h1>
          <p>Transform your e-commerce business with custom Shopify solutions</p>
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
              <h2 className="section-title animate-on-scroll">Custom Shopify Apps For Your Business Needs</h2>
              <p className="section-description animate-on-scroll">
                We create powerful, tailor-made Shopify applications that enhance your store's functionality
                and deliver exceptional user experiences to your customers.
              </p>
              
              <div className="features-list">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card animate-on-scroll" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <div className="feature-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
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
                  <div className="mockup-title">Custom Shopify Dashboard</div>
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
          <span className="overline text-center animate-on-scroll">Our Development Process</span>
          <h2 className="section-title text-center animate-on-scroll">How We Bring Your Vision To Life</h2>
          <p className="section-description text-center mx-auto animate-on-scroll">
            We follow a structured approach to ensure your Shopify app is developed efficiently, 
            meets all requirements, and delivers exceptional results.
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

export default ShopifyApp;