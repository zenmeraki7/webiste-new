import React, { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Home/Landing'
import ServicesPage from './pages/Home/Servicesection'
import VisionPage from './pages/Home/VisionPage'
import OurAppsPage from './pages/Home/OurApps'
import ProjectsPage from './pages/Home/Projectpage'
import ContactFormSection from './pages/Home/Contactform'
import ErrorBoundary from './components/Error/Errorboundary'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation();
   useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      const element = document.querySelector(scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // slight delay ensures page renders
      }
    }
  }, [location]);
  return (
    <div>
      <Header />
      <section id="landing">
        <Landing />
      </section>

      <section id="services">
        <ServicesPage />
      </section>

      <section id="vision">
        <VisionPage />
      </section>

      

      <section id="projects">
        <ProjectsPage />
      </section>

      <section id="apps">
        <OurAppsPage />
      </section>

      <section>
        <ContactFormSection />
      </section>

     <ErrorBoundary>    
    <Footer />
    </ErrorBoundary>
    </div>
  )
}
