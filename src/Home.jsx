import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Home/Landing'
import ServicesPage from './pages/Home/Servicesection'
import VisionPage from './pages/Home/VisionPage'
import OurAppsPage from './pages/Home/OurApps'
import ProjectsPage from './pages/Home/Projectpage'
import ContactFormSection from './pages/Home/Contactform'

export default function Home() {
  return (
    <div>
      <Header />

      <Landing />
      <ServicesPage />
      <VisionPage />
      <OurAppsPage />
      <ProjectsPage />
      <ContactFormSection />


      <Footer />
    </div>
  )
}
