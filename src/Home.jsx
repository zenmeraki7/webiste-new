import React, { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
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


// Create theme for your app
const theme = createTheme({
  palette: {
    primary: {
      main: '#0e3b39',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4caf50',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      default: '#ffffff',
      paper: '#EFF9F9',
    },
    divider: '#e0e0e0'
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 700,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: 'none'
        }
      }
    }
  },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        <Footer />
      </div>
    </ThemeProvider>

  )
}