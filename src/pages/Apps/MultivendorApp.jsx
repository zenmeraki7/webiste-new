import React, { useState, useEffect } from 'react';
import {
  AppBar, Box, Button, Card, CardContent, Container, Divider,
  Grid, IconButton, Paper, Tab, Tabs, Typography, List,
  ListItem, ListItemIcon, ListItemText, Rating, useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckIcon from '@mui/icons-material/Check';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import Header from '../../components/Header';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';

// Create a custom theme with teal as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: '#0e3b39', // Deep teal
      light: '#1a5754', // Lighter teal
      dark: '#082624', // Darker teal
      contrastText: '#FFFFFF',
      gradient: 'linear-gradient(135deg, #0e3b39 0%, #1a5754 50%, #0e3b39 100%)',
      pulseGradient: 'linear-gradient(90deg, #0e3b39, #1a5754, #0e3b39)'
    },
    secondary: {
      main: '#1E88E5', // Blue accent
      light: '#6AB7FF',
      dark: '#005CB2',
      contrastText: '#FFFFFF',
      gradient: 'linear-gradient(135deg, #1E88E5 0%, #6AB7FF 50%, #1E88E5 100%)'
    },
    accent: {
      coral: '#FF7F50',
      purple: '#9C27B0',
      teal: '#009688',
      amber: '#FFC107',
      gradient: 'linear-gradient(to right, #FF7F50, #9C27B0)'
    }
  },
  transitions: {
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  }
});

// Create motion components with enhanced color transitions
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionButton = motion(Button);
const MotionCard = motion(Card);

const MultiVendorApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState('hero');
  const [hoverStates, setHoverStates] = useState({});
  
  // Add media query hooks for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleHover = (id, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [id]: isHovering
    }));
  };

  // Scroll to section when navigation item is clicked
  const handleNavClick = (page) => {
    setActivePage(page);
    
    // Scroll into view if element exists
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabContents = {
    0: {
      title: 'Complete Multivendor Solution',
      description: 'Transform your Shopify store into a thriving marketplace with multiple vendors, commission management, and automated payouts all in one powerful platform.',
      benefits: [
        'Unlimited vendors and product listings',
        'Automated commission tracking and payments',
        'Vendor application and approval system',
        'Individual vendor dashboards and analytics'
      ]
    },
    1: {
      title: 'Vendor Management',
      description: 'Give vendors the tools they need while maintaining full control of your marketplace.',
      benefits: [
        'Customizable vendor application forms',
        'Vendor verification and approval workflow',
        'Performance-based commission tiers',
        'Vendor rating and review system'
      ]
    },
    2: {
      title: 'Revenue Management',
      description: 'Automate payments and keep track of all marketplace transactions.',
      benefits: [
        'Flexible commission structures',
        'Automated vendor payouts',
        'Complete financial reporting',
        'Multiple payment gateway support'
      ]
    },
    3: {
      title: 'Storefront Integration',
      description: 'Seamlessly integrate with your existing Shopify store and theme.',
      benefits: [
        'Works with all Shopify themes',
        'Customizable vendor storefronts',
        'Enhanced search with vendor filtering',
        'Mobile-optimized marketplace experience'
      ]
    }
  };

  const HeroSection = () => (
    <Box id="hero" sx={{ py: isMobile ? 2 : 4 }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12} md={6}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ fontSize: { xs: '1.9rem', sm: '1.8rem', md: '3.4rem' } }} /* Custom font size scaling */
          >
            Launch Your Own Marketplace with MultiVendor
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph 
            sx={{ mb: isMobile ? 2 : 4 }}
          >
            Transform your Shopify store into a thriving marketplace where multiple vendors can sell their products, while you earn commission on every sale without handling inventory.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: isMobile ? 2 : 4 }}>
            {/* Buttons removed as in original */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const FeatureSection = () => (
    <Box id="features" sx={{ py: isMobile ? 2 : 4 }}>
      <Paper sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 4 }}>
        <Box sx={{ mt: isMobile ? 2 : 3 }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2" 
            fontWeight="bold" 
            gutterBottom
          >
            {tabContents[activeTab].title}
          </Typography>
          <Typography variant="body1" paragraph>
            {tabContents[activeTab].description}
          </Typography>
          <List>
            {tabContents[activeTab].benefits.map((benefit, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: isMobile ? 30 : 36 }}>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CheckIcon color="success" fontSize={isMobile ? "small" : "medium"} />
                  </motion.div>
                </ListItemIcon>
                <ListItemText 
                  primary={benefit} 
                  primaryTypographyProps={{ 
                    fontSize: isMobile ? '0.9rem' : undefined 
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );

  const HowItWorksSection = () => {
    const circleVariants = {
      initial: { backgroundColor: theme.palette.primary.light },
      hover: {
        backgroundColor: theme.palette.primary.main,
        scale: 1.1,
        boxShadow: '0px 5px 15px rgba(0, 128, 128, 0.4)'
      }
    };

    return (
      <Box id="how-it-works" sx={{ py: isMobile ? 2 : 4 }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h2" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ mb: isMobile ? 2 : 3 }}
        >
          How MultiVendor Works
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ mb: isMobile ? 2 : 4 }}
        >
          Setting up your marketplace is simple with our guided installation process
        </Typography>

        <Grid container spacing={isMobile ? 3 : 6} justifyContent="center">
          {[
            { icon: <StorefrontIcon fontSize={isMobile ? "medium" : "large"} />, title: '1. Install the App', desc: 'Add MultiVendor to your Shopify store with our easy installation wizard' },
            { icon: <GroupIcon fontSize={isMobile ? "medium" : "large"} />, title: '2. Invite Vendors', desc: 'Set up your vendor application form and start approving sellers' },
            { icon: <MonetizationOnIcon fontSize={isMobile ? "medium" : "large"} />, title: '3. Start Earning', desc: 'Set commission rates and watch your marketplace grow' }
          ].map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} sx={{ textAlign: 'center' }}>
              <MotionPaper
                elevation={0}
                sx={{
                  width: isMobile ? 60 : 80,
                  height: isMobile ? 60 : 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: isMobile ? 1 : 2,
                  mx: 'auto',
                }}
                variants={circleVariants}
                initial="initial"
                whileHover="hover"
                animate={{
                  backgroundColor: [
                    theme.palette.primary.light,
                    `linear-gradient(135deg, #0e3b39 0%, #1a5754 50%, #0e3b39 100%)`,
                    theme.palette.primary.light,
                  ],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: index * 1,
                    ease: "easeInOut"
                  }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    transition: {
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: index
                    }
                  }}
                  style={{ color: 'white' }}
                >
                  {item.icon}
                </motion.div>
              </MotionPaper>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                component="h3" 
                fontWeight="bold" 
                gutterBottom
              >
                {item.title}
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"}>
                {item.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const FAQSection = () => {
    const faqs = [
      {
        question: "How do vendors join my marketplace?",
        answer: "You can send direct invitations or set up a vendor application form on your store. All vendor applications go through your approval process before they can start selling."
      },
      {
        question: "How are commissions calculated and paid?",
        answer: "You set the commission rate for each vendor or product category. The app automatically calculates the commission on each sale and handles payouts based on your schedule settings (weekly, bi-weekly, or monthly)."
      },
      {
        question: "Can I customize how vendor stores look?",
        answer: "Yes! Each vendor can have their own storefront page with customizable branding, while still matching your overall store design. You control how much customization vendors are allowed."
      },
      {
        question: "Do you offer a free trial?",
        answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start."
      },
      {
        question: "How does inventory management work?",
        answer: "Vendors manage their own inventory through their dedicated dashboard. They can add products, set prices, manage stock levels, and fulfill their own orders - all while you maintain oversight of the entire marketplace."
      }
    ];

    return (
      <Box id="faq" sx={{ py: isMobile ? 2 : 4 }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h2" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ mb: isMobile ? 2 : 3 }}
        >
          Frequently Asked Questions
        </Typography>

        <Box>
          {faqs.map((faq, index) => (
            <MotionBox
              key={index}
              sx={{ mb: isMobile ? 2 : 3 }}
              initial={{ opacity: 0.9 }}
              whileHover={{
                backgroundColor: 'rgba(0, 128, 128, 0.03)',
                borderRadius: '8px',
                padding: isMobile ? '12px' : '16px',
                marginLeft: isMobile ? '-12px' : '-16px',
                marginRight: isMobile ? '-12px' : '-16px',
                x: 0,
                borderLeft: `3px solid ${theme.palette.primary.main}`
              }}
              transition={{ duration: 0.2 }}
            >
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                component="h3" 
                fontWeight="bold" 
                gutterBottom
              >
                {faq.question}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ fontSize: isMobile ? '0.9rem' : undefined }}
              >
                {faq.answer}
              </Typography>
              {index < faqs.length - 1 && <Divider sx={{ mt: isMobile ? 2 : 3 }} />}
            </MotionBox>
          ))}
        </Box>
      </Box>
    );
  };

  const CallToActionSection = () => (
    <Box
      sx={{
        py: isMobile ? 3 : 5,
        borderRadius: 2,
        mb: isMobile ? 2 : 4,
        bgcolor: theme.palette.primary.main,
        position: 'relative'
      }}
    >
      <Container maxWidth="lg" sx={{ px: isMobile ? 2 : 3 }}>
        <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h2" 
              fontWeight="bold" 
              gutterBottom 
              color="white"
            >
              Ready to Launch Your Marketplace?
            </Typography>
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              sx={{ mb: isMobile ? 2 : 3 }} 
              color="white"
            >
              Join thousands of successful merchants who use MultiVendor to create thriving marketplaces without inventory hassles.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: isMobile ? 2 : 3,
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                component="span" 
                fontWeight="600" 
                color="white" 
                sx={{ 
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    width: isMobile ? 8 : 10, 
                    height: isMobile ? 8 : 10, 
                    borderRadius: '50%', 
                    backgroundColor: '#4caf50',
                    display: 'inline-block',
                    animation: 'pulse 1.5s infinite'
                  }} 
                />
                Coming Soon
              </Typography>
              <Typography 
                variant={isMobile ? "caption" : "body2"} 
                color="white" 
                align="center" 
                sx={{ mb: 2 }}
              >
                Our advanced marketplace builder is in final testing
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  // Define navigation button animation
  const NavigationButtonVariants = {
    inactive: { color: 'inherit' },
    active: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      scale: 1.05
    },
    hover: {
      color: theme.palette.primary.light,
      scale: 1.05,
      y: -2
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Header />
        <Container sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}>
          <MotionPaper
            sx={{ p: 0, overflow: 'hidden' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MotionBox
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: isMobile ? 2 : 3,
                py: isMobile ? 1.5 : 2,
                borderBottom: 1,
                borderColor: 'divider'
              }}
              initial={{ backgroundColor: 'white' }}
              whileHover={{ backgroundColor: 'rgba(0, 128, 128, 0.02)' }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MotionBox
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: isMobile ? 0.5 : 1,
                    borderRadius: 1,
                    display: 'flex',
                    mr: isMobile ? 1 : 2
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                    transition: {
                      duration: 0.5,
                      repeat: 1,
                      repeatType: "reverse"
                    }
                  }}
                  animate={{
                    backgroundColor: [
                      theme.palette.primary.main,
                      theme.palette.primary.light,
                      theme.palette.primary.main
                    ],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      transition: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    }}
                  >
                    <StorefrontIcon fontSize={isMobile ? "small" : "medium"} />
                  </motion.div>
                </MotionBox>
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  component="div"
                  sx={{ fontSize: isMobile ? '1rem' : undefined }}
                >
                  MultiVendor
                </Typography>
              </Box>
            </MotionBox>

            <Box sx={{ p: isMobile ? 2 : 3 }}>
              {/* Scrollable Navigation Bar - Key Change */}
              <Box 
                sx={{ 
                  display: 'flex',
                  mb: 2,
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  },
                  px: 1,
                  pb: 1, // Add padding at bottom for shadow
                  mx: -1, // Negative margin to counteract padding
                  position: 'relative'
                }}
              >
                {/* Shadow indicators on sides when scrollable */}
                <Box 
                  sx={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 20,
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))',
                    pointerEvents: 'none',
                    zIndex: 1,
                    display: { xs: 'block', md: 'none' }
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 20,
                    backgroundImage: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))',
                    pointerEvents: 'none',
                    zIndex: 1,
                    display: { xs: 'block', md: 'none' }
                  }}
                />
                
                {/* Navigation items */}
                <Box sx={{ display: 'flex', minWidth: 'max-content' }}>
                  {['hero', 'features', 'how-it-works', 'faq'].map((page) => (
                    <MotionButton
                      key={page}
                      color="inherit"
                      onClick={() => handleNavClick(page)}
                      initial={activePage === page ? "active" : "inactive"}
                      animate={activePage === page ? "active" : "inactive"}
                      whileHover="hover"
                      variants={NavigationButtonVariants}
                      sx={{ 
                        mx: 0.5,
                        whiteSpace: 'nowrap',
                        minWidth: isMobile ? 'auto' : undefined,
                        px: isMobile ? 1.5 : 2,
                        fontSize: isMobile ? '0.8rem' : undefined
                      }}
                    >
                      {page === 'hero' ? 'HERO' :
                        page === 'features' ? 'Features' :
                          page === 'how-it-works' ? 'How It Works' :
                            page === 'faq' ? 'FAQ' : 'GET STARTED'}
                    </MotionButton>
                  ))}
                </Box>
              </Box>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activePage === 'hero' && <HeroSection />}
                  {activePage === 'features' && <FeatureSection />}
                  {activePage === 'how-it-works' && <HowItWorksSection />}
                  {activePage === 'faq' && <FAQSection />}
                </motion.div>
              </AnimatePresence>

              <CallToActionSection />
            </Box>
          </MotionPaper>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MultiVendorApp;