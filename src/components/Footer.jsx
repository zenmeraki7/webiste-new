import React, { useState } from 'react';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaArrowRight,
  FaCode,
  FaMobile,
  FaCloud,
  FaStar,
  FaChevronRight,
  FaHeart
} from 'react-icons/fa';

// Professional Footer Styles with Complete Mobile Responsiveness
const footerStyles = `
  .professional-footer {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
  }

  /* Professional CTA Section */
.cta-section {
  background: linear-gradient(135deg, #0A2725 0%, #16726d 100%);
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(224, 241, 222, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(76, 215, 135, 0.1) 0%, transparent 50%);
}

.cta-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.4;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: center;
}

.cta-text h2 {
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #e8f5ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-text .subtitle {
  color: #4CD787;
  font-weight: 700;
  letter-spacing: 3px;
  font-size: 0.85rem;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  position: relative;
  margin-top: 0.5rem;
}

.cta-text .subtitle::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 2px;
  margin-top: 0.25rem;
}

.cta-text p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.15rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
}

.cta-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #4CD787;
  color: #0A2725;
 
  font-size: 0.7rem;
  font-weight: bold;
  flex-shrink: 0;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.cta-button {
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  min-width: 200px;
  justify-content: center;
}

.cta-button.primary {
  background: linear-gradient(135deg, #E0F1DE 0%, #C5E1C1 100%);
  color: #0A2725;
  box-shadow: 0 8px 25px rgba(224, 241, 222, 0.4);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(224, 241, 222, 0.6);
  background: linear-gradient(135deg, #C5E1C1 0%, #B0D7A8 100%);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

.cta-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
}

.stat {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 800;
  color: #4CD787;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 768px) {
  .cta-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }

  .cta-text {
    order: 1;
  }

  .cta-actions {
    order: 2;
    align-items: center;
    width: 100%;
    margin-bottom: 2rem;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
  }

  .cta-stats {
    max-width: 300px;
  }

  .cta-section {
    padding: 3rem 0;
  }
}

@media (max-width: 480px) {
  .cta-features {
    align-items: center;
  }

  .feature-item {
    justify-content: center;
  }

  .cta-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }
}

  /* Main Footer */
  .footer-main {
    background: white;
    color: #333;
    position: relative;
    overflow: hidden;
  }

  .footer-content {
    position: relative;
    z-index: 1;
    padding: 4rem 0 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 2fr;
    gap: 3rem;
  }

  /* Logo Section */
  .footer-logo {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .logo-icon {
    width: 35px;
    height: 35px;
    margin-right: 8px;
    background: #0A2725;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1rem;
  }

  .logo-text {
    font-size: 1.2rem;
    font-weight: 800;
    color: #0A2725;
  }

  .footer-description {
    color: #666;
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 350px;
    font-size: 0.9rem;
  }

  .social-links {
    display: flex;
    gap: 0.75rem;
  }

  .social-button {
    background: transparent;
    color: #0A2725;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 16px;
  }

  .social-button:hover {
    color: #00B8A9;
    transform: translateY(-2px);
  }

  /* Section Titles */
  .section-title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 2rem;
    position: relative;
    color: #0A2725;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: #00B8A9;
    border-radius: 2px;
  }

  /* Services */
  .service-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    transition: all 0.3s ease;
    cursor: default;
  }

  .service-item:hover {
    padding-left: 0.5rem;
  }

  .service-item:hover .service-icon {
    color: #00B8A9;
    transform: scale(1.1);
  }

  .service-icon {
    color: #666;
    margin-right: 1rem;
    transition: all 0.3s ease;
    font-size: 10px;
    width: 25px;
    height: 25px;
  }

  .service-text {
    color: #666;
    font-size: 0.9rem;
  }

  /* Quick Links */
  .quick-link {
    display: flex;
    align-items: center;
    color: #666;
    text-decoration: none;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .quick-link:hover {
    color: #00B8A9;
    padding-left: 0.5rem;
  }

  .quick-link:hover .arrow-icon {
    opacity: 1;
    transform: translateX(4px);
  }

  .arrow-icon {
    font-size: 10px;
    margin-left: 0.5rem;
    opacity: 0;
    transition: all 0.3s ease;
  }

  /* Contact Items - Reduced Size */
  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
  }

  .contact-item:hover {
    background: #f1f3f4;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

 .contact-icon {
  color: #00B8A9 !important;
  margin-right: 0.5rem;
  font-size: 9px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none !important;
    border-radius: 0 !important;
  padding: 0 !important;
}
.contact-item:hover .contact-icon {
  color: #00B8A9 !important;
}

  .contact-info h4 {
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0 0 0.2rem 0;
    color: #0A2725;
  }

  .contact-info p {
    color: #666;
    margin: 0;
    font-size: 0.75rem;
  }

  .contact-info a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .contact-info a:hover {
    color: #00B8A9;
  }

  /* Bottom Footer */
 .footer-bottom {
  background: #FFF6F6;
  border-top: 1px solid #e9ecef;
  padding: 2rem 0;
  position: relative;
  z-index: 1;
}

 .footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
}
.copyright {
  color: #666;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

  .heart-icon {
    color: #ff6b6b;
    animation: heartbeat 2s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0%, 50%, 100% { transform: scale(1); }
    25%, 75% { transform: scale(1.1); }
  }

 .footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-link {
  color: #666;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
}

.footer-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: #00B8A9;
  transition: width 0.3s ease;
}

.footer-link:hover {
  color: #00B8A9;
}

.footer-link:hover::after {
  width: 100%;
}

  /* Enhanced Responsive Design */
  @media (max-width: 1200px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 2rem;
    }
  }

  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    
    .footer-content {
      padding: 3rem 0 2rem;
    }
  }

  @media (max-width: 768px) {
    .cta-content {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 2rem;
    }

    .cta-text h2 {
      font-size: clamp(1.5rem, 5vw, 2.5rem);
    }

    .cta-text p {
      font-size: 1rem;
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      text-align: center;
    }

    .footer-bottom-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
    justify-items: center; 
  }
 .copyright {
    justify-content: center; /* Center the copyright content */
    width: 100%;
  }

     .footer-links {
    justify-content: center;
    width: 100%;
  }

    .cta-section {
      padding: 2.5rem 0;
    }

    .footer-content {
      padding: 2.5rem 0 1rem;
    }

    .section-title {
      text-align: center;
    }

    .section-title::after {
      left: 50%;
      transform: translateX(-50%);
    }

    .social-links {
      justify-content: center;
    }

    .footer-logo {
      justify-content: center;
    }

    .footer-description {
      text-align: center;
      max-width: 100%;
    }

    .service-item,
    .quick-link {
      justify-content: center;
      text-align: center;
    }

    .service-item:hover,
    .quick-link:hover {
      padding-left: 0;
    }

    .contact-item {
      justify-content: center;
      text-align: left;
      max-width: 300px;
      margin: 0 auto 0.75rem auto;
    }
  }

  @media (max-width: 640px) {
    .cta-content {
      padding: 0 0.5rem;
    }

    .footer-content {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

     .footer-bottom-content {
    gap: 1rem;
    padding: 0 1rem;
  }

    .cta-button {
      width: 100%;
      max-width: 280px;
      justify-content: center;
    }

    .contact-item {
      max-width: 100%;
      padding: 0.6rem;
    }

    .footer-grid {
      gap: 2rem;
    }
  }

  @media (max-width: 480px) {
    .cta-section {
      padding: 2rem 0;
    }

    .footer-content {
      padding: 2rem 0 1rem;
    }

     .footer-bottom {
    padding: 1.5rem 0;
  }

    .footer-links {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .cta-button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      width: 100%;
      max-width: 250px;
    }

    .cta-text h2 {
      font-size: clamp(1.25rem, 6vw, 2rem);
      margin-bottom: 0.75rem;
    }

    .cta-text p {
      font-size: 0.95rem;
    }

    .footer-logo img {
      width: 25px !important;
      height: 25px !important;
    }

    .logo-text {
      font-size: 1rem;
    }

    .footer-description {
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
    }

    .social-button {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }

    .section-title {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }

    .service-text,
    .quick-link {
      font-size: 0.85rem;
    }

    .contact-item {
      padding: 0.5rem;
      margin-bottom: 0.6rem;
    }

    .contact-icon {
      font-size: 10px;
      margin-right: 0.6rem;
    }

    .contact-info h4 {
      font-size: 0.75rem;
    }

    .contact-info p {
      font-size: 0.7rem;
    }

    .copyright {
      font-size: 0.8rem;
    }

    .footer-link {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 360px) {
    .cta-content,
    .footer-content,
    .footer-bottom-content {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }

    .cta-text h2 {
      font-size: clamp(1.1rem, 7vw, 1.8rem);
    }

    .cta-text p {
      font-size: 0.9rem;
    }

    .cta-button {
      padding: 0.6rem 1.25rem;
      font-size: 0.9rem;
    }

    .footer-description {
      font-size: 0.8rem;
    }

    .service-text,
    .quick-link {
      font-size: 0.8rem;
    }

    .contact-item {
      flex-direction: column;
      text-align: center;
      padding: 0.75rem 0.5rem;
    }

    .contact-icon {
      margin-right: 0;
      margin-bottom: 0.5rem;
    }

    .social-links {
      gap: 0.5rem;
    }

    .social-button {
      width: 30px;
      height: 30px;
      font-size: 12px;
    }
  }

  /* Landscape mobile orientation */
  @media (max-width: 768px) and (orientation: landscape) {
    .cta-section {
      padding: 1.5rem 0;
    }

    .footer-content {
      padding: 1.5rem 0 1rem;
    }

    .cta-text h2 {
      font-size: clamp(1.2rem, 4vw, 2rem);
    }

    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
  }

  /* Fix for very small screens */
  @media (max-width: 320px) {
    .footer-grid {
      gap: 1.5rem;
    }

    .section-title {
      margin-bottom: 1rem;
    }

    .contact-item {
      margin-bottom: 0.5rem;
    }
  }
`;

const Footer = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    { icon: FaMobile, text: 'Mobile App Development' },
    { icon: FaCode, text: 'Web Development' },
    { icon: FaCloud, text: 'Cloud Solutions' },
    { icon: FaStar, text: 'AI/ML Integration' },
  ];

  const quickLinks = [
    { text: 'About Us', href: '/about' },
    { text: 'Services', href: '/services' },
    { text: 'Portfolio', href: '/portfolio' },
    { text: 'Blog', href: '/blog' },
    { text: 'Careers', href: '/careers' },
    { text: 'Contact', href: '/contact' },
  ];

  const contactInfo = {
    location: 'Thrissur, Kerala',
    email: 'official@zenmeraki.com',
    phone: '+91 6282346108',
  };

  return (
    <div className="professional-footer">
      <style>{footerStyles}</style>
      
      {/* Call to Action Section */}
     <section className="cta-section">
  <div className="cta-content">
    <div className="cta-text">
      <div className="subtitle">PARTNER WITH EXPERTS</div>
      <h2>Ready to Scale Your Digital Presence?</h2>
      <p>
        Transform your business with cutting-edge mobile apps, web solutions, and AI-powered innovations. 
        Let our expert team deliver results that drive growth and exceed expectations.
      </p>
     
    </div>
    <div className="cta-actions">
      <a href="/contact" className="cta-button primary mb-4">
        Get Started Today
        <FaArrowRight />
      </a>
   
     
    </div>
  </div>
</section>

      {/* Main Footer Content */}
      <footer className="footer-main">
        <div className="footer-content">
          <div className="footer-grid">
            {/* Company Info */}
            <div>
              <div className="footer-logo">
                <img
                  src="/src/assets/images/zenlogo.png"
                  alt="ZEN MERAKI"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    marginRight: 8,
                    objectFit: 'contain',
                  }}
                />
                <div className="logo-text">ZENMERAKI</div>
              </div>
              
              <p className="footer-description">
                We specialize in transforming ideas into impactful solutions. 
                From cutting-edge applications to intuitive designs, 
                our work reflects a commitment to excellence and innovation in all we deliver.
              </p>

              <div className="social-links">
                <a 
                  href="https://twitter.com/zenmeraki" 
                  className="social-button"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="https://www.linkedin.com/company/zenmeraki/" 
                  className="social-button"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="mailto:official@zenmeraki.com" 
                  className="social-button"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="section-title">Services</h3>
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="service-item"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <service.icon className="service-icon" />
                  <span className="service-text">{service.text}</span>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="section-title">Quick Links</h3>
              {quickLinks.map((link, index) => (
                <a key={index} href={link.href} className="quick-link">
                  {link.text}
                  <FaChevronRight className="arrow-icon" />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h3 className="section-title">Contact</h3>
              
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div className="contact-info">
                  <h4>Location</h4>
                  <p>{contactInfo.location}</p>
                </div>
              </div>

              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div className="contact-info">
                  <h4>Email</h4>
                  <p>
                    <a href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div className="contact-info">
                  <h4>Phone</h4>
                  <p>
                    <a href={`tel:${contactInfo.phone}`}>
                      {contactInfo.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <span>Copyright @ 2025 Zenmeraki.com</span>
            </div>
            <div className="footer-links">
              <a href="/privacy-policy" className="footer-link">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="footer-link">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;