import React, { useState, useRef, useEffect } from 'react';
import {
  AppBar, Box, Button, Card, CardContent, Container, Divider,
  Grid, IconButton, Paper, Tab, Tabs, Typography, List,
  ListItem, ListItemIcon, ListItemText, Rating, useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import Header from '../../components/Header';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';

// Create a custom theme with crimson as the primary color
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

const Tap2shareApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState('hero');
  const [hoverStates, setHoverStates] = useState({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  // References to section elements for scrolling
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    'how-it-works': useRef(null),
    pricing: useRef(null),
    faq: useRef(null),
    cta: useRef(null)
  };
  
  // Check if screen is mobile
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleHover = (id, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [id]: isHovering
    }));
  };
  
  // Function to handle navigation and scrolling
  const handleNavigation = (page) => {
    setActivePage(page);
    setMobileNavOpen(false);
    
    // Smooth scroll to the section
    if (sectionRefs[page] && sectionRefs[page].current) {
      sectionRefs[page].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  const tabContents = {
    0: {
      title: 'Seamless Social Sharing',
      description: 'Enable your customers to share products directly to their favorite social networks with just one click, increasing your store\'s visibility and driving new traffic.',
      benefits: [
        'One-click sharing to multiple platforms',
        'Customizable share messages with product details',
        'Image optimization for each social network',
        'Mobile-friendly sharing experience'
      ]
    },
    1: {
      title: 'Customization',
      description: 'Tailor the sharing experience to match your brand and product needs.',
      benefits: [
        'Custom button styling and placement',
        'Branded share messages and images',
        'Control which products can be shared',
        'Multiple display options'
      ]
    },
    2: {
      title: 'Analytics',
      description: 'Track how your customers are sharing your products and the traffic it generates.',
      benefits: [
        'Real-time sharing statistics',
        'Conversion tracking from shared links',
        'Most popular products and platforms',
        'ROI measurement tools'
      ]
    },
    3: {
      title: 'Integration',
      description: 'Seamlessly works with your existing Shopify store and other apps.',
      benefits: [
        'One-click installation',
        'Compatible with all Shopify themes',
        'Works with other marketing apps',
        'Regular updates and support'
      ]
    }
  };

  const HeroSection = () => (
    <Box sx={{ py: 4 }} ref={sectionRefs.hero}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ fontSize: { xs: '1.9rem', sm: '1.8rem', md: '3.4rem' } }} /* Custom font size scaling */

          >
            Boost Your Sales Through Tap2share
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: isMobile ? 2 : 4 }}>
            Tap2share for Shopify makes it simple for your customers to share their favorite products on social media, driving traffic and increasing conversions for your Shopify store.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 4 }}>
            <MotionButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShareIcon />}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ backgroundColor: theme.palette.primary.main }}
              animate={{
                backgroundColor: [
                  theme.palette.primary.main,
                  theme.palette.primary.light,
                  theme.palette.primary.main
                ],
                transition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              onMouseEnter={() => handleHover('installBtn', true)}
              onMouseLeave={() => handleHover('installBtn', false)}
              style={{
                background: hoverStates['installBtn']
                  ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                  : undefined
              }}
              fullWidth={isMobile}
              disabled={true}
              sx={{ opacity: 0.6 }}
            >
              Install App
            </MotionButton>
            <MotionButton
              variant="outlined"
              color="primary"
              size="large"
              href='https://youtu.be/916_bQB-xgI'
              whileHover={{
                borderColor: theme.palette.primary.dark,
                color: theme.palette.primary.dark,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              fullWidth={isMobile}
            >
              Watch Demo
            </MotionButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const FeatureSection = () => (
    <Box sx={{ py: 4 }} ref={sectionRefs.features}>
      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0">
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
              <ListItemIcon sx={{ minWidth: 36 }}>
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CheckIcon color="success" />
                </motion.div>
              </ListItemIcon>
              <ListItemText primary={benefit} />
            </ListItem>
          ))}
        </List>
      </Box>
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
      <Box sx={{ py: 4 }} ref={sectionRefs['how-it-works']}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h2" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ mb: 3 }}
        >
          How Tap2share for Shopify Works
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Get up and running in minutes with our simple installation process
        </Typography>

        <Grid container spacing={isMobile ? 3 : 6} justifyContent="center">
          {[
            { icon: <ShoppingCartIcon fontSize="large" />, title: '1. Install the App', desc: 'Add Tap2share to your Shopify store with just one click' },
            { icon: <BoltIcon fontSize="large" />, title: '2. Customize Settings', desc: 'Choose which products can be shared and how they appear' },
            { icon: <RefreshIcon fontSize="large" />, title: '3. Increase Sales', desc: 'Watch as customers share products and drive new traffic to your store' }
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
                  mb: 2,
                  mx: 'auto',
                }}
                variants={circleVariants}
                initial="initial"
                whileHover="hover"
                animate={{
                  backgroundColor: [
                    theme.palette.primary.light,
                    `linear-gradient(135deg, #0e3b39 0%,rgb(24, 193, 185) 50%,rgba(14, 59, 57, 0.47) 100%)`,
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
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2">
                {item.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const PricingSection = () => (
    <Box sx={{ py: 4 }} ref={sectionRefs.pricing}>
      <Typography variant="h6" component="div" sx={{ mb: 1, mt: 2 }}>
        Get Started
      </Typography>

      <MotionCard
        variant="outlined"
        sx={{
          borderRadius: 2,
          position: 'relative',
          overflow: 'visible',
          mb: 4,
          maxWidth: isMobile ? '100%' : '500px',
          mx: 'auto'
        }}
        whileHover={{
          boxShadow: '0px 10px 30px rgba(220, 20, 60, 0.2)',
          borderColor: theme.palette.primary.main,
          y: -5
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        animate={{
          borderColor: [
            'rgba(0, 0, 0, 0.12)',
            theme.palette.primary.light,
            'rgba(0, 0, 0, 0.12)'
          ],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <CardContent sx={{ p: isMobile ? 2 : 4 }}>
          <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
            Basic
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            For growing businesses
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography component="span" variant="h4" fontWeight="bold">
              $3
            </Typography>
            <Typography component="span" variant="subtitle1" color="text.secondary">
              /month
            </Typography>
          </Box>

          <List disablePadding>
            {[
              'Social sharing for all platforms',
              'Unlimited shares',
              'Custom button styling'
            ].map((feature, index) => (
              <ListItem key={index} disablePadding disableGutters sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, color: theme.palette.primary.main }}
                  >
                    <CheckIcon color="success" fontSize="small" />
                  </motion.div>
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>

          <MotionButton
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 4 }}
            href='https://admin.shopify.com/store/demo-zen-store/apps/customizer-39?app_load_id=ea3ddb76-72ce-4436-82c1-f57b35cb2e68&link_source=search'
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            animate={{
              backgroundImage: [
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
              ],
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            Get Started
          </MotionButton>
        </CardContent>
      </MotionCard>
    </Box>
  );

  const FAQSection = () => {
    const faqs = [
      {
        question: "How easy is it to install Tap2share for Shopify?",
        answer: "Installation is a simple one-click process through the Shopify App Store. There's no coding required, and most merchants are up and running in under 5 minutes."
      },
      {
        question: "Which social platforms does Tap2share for Shopify support?",
        answer: "Tap2share for Shopify supports all major social platforms including Facebook, Instagram, Twitter, Pinterest, TikTok, and LinkedIn. We regularly add support for new platforms as they gain popularity."
      },
      {
        question: "Can I customize how my products appear when shared?",
        answer: "Absolutely! You can customize the share message, image, and description for each product. You can also set default templates for your entire store."
      },
      {
        question: "Do you offer a free trial?",
        answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start."
      },
      {
        question: "How detailed are the analytics?",
        answer: "Our analytics dashboard shows you which products are being shared, on which platforms, conversion rates from shared links, and ROI calculations based on the sales generated."
      }
    ];

    return (
      <Box sx={{ py: 4 }} ref={sectionRefs.faq}>
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
              sx={{ mb: 3 }}
              initial={{ opacity: 0.9 }}
              whileHover={{
                backgroundColor: 'rgba(220, 20, 60, 0.03)',
                borderRadius: '8px',
                padding: isMobile ? '12px' : '16px',
                marginLeft: isMobile ? '-12px' : '-16px',
                marginRight: isMobile ? '-12px' : '-16px',
                x: 0,
                borderLeft: `3px solid ${theme.palette.primary.main}`
              }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant={isMobile ? "subtitle1" : "h6"} component="h3" fontWeight="bold" gutterBottom>
                {faq.question}
              </Typography>
              <Typography variant="body1" color="text.secondary">
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
        mb: 4,
        bgcolor: theme.palette.primary.main,
        position: 'relative'
      }}
      ref={sectionRefs.cta}
    >
      <Container>
        <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h2" 
              fontWeight="bold" 
              gutterBottom 
              color="white"
            >
              Ready to Boost Your Social Presence?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="white">
              Join thousands of successful merchants who use Tap2share for Shopify to drive traffic, increase engagement, and boost sales.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                }
              }}
              href='https://youtu.be/916_bQB-xgI'
            >
              WATCH DEMO
            </Button>
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

  // Mobile Navigation Drawer Component
  const MobileNavigation = () => (
    <MotionBox
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: mobileNavOpen ? 'auto' : 0,
        opacity: mobileNavOpen ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      sx={{ 
        overflow: 'hidden',
        borderBottom: mobileNavOpen ? 1 : 0,
        borderColor: 'divider',
        mb: mobileNavOpen ? 2 : 0
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
        {['hero', 'features', 'how-it-works', 'pricing', 'faq', 'cta'].map((page) => (
          <MotionButton
            key={page}
            color="inherit"
            onClick={() => handleNavigation(page)}
            initial={activePage === page ? "active" : "inactive"}
            animate={activePage === page ? "active" : "inactive"}
            whileHover="hover"
            variants={NavigationButtonVariants}
            sx={{ py: 1, justifyContent: 'flex-start' }}
          >
            {page === 'hero' ? 'Home' :
              page === 'features' ? 'Features' :
                page === 'how-it-works' ? 'How It Works' :
                  page === 'pricing' ? 'Pricing' :
                    page === 'faq' ? 'FAQ' : 'Get Started'}
          </MotionButton>
        ))}
      </Box>
    </MotionBox>
  );
  
  // Horizontal Scrolling Tab Navigation for Mobile
  const MobileTabNavigation = () => (
    <Box 
      className="scroll-nav-container"
      sx={{ 
        overflowX: 'auto',
        display: 'flex',
        pb: 1.5,
        mb: 2,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        px: 1
      }}
    >
      {['hero', 'features', 'how-it-works', 'pricing', 'faq', 'cta'].map((page) => (
        <Box
          key={page}
          sx={{ 
            minWidth: 'auto',
            px: 2,
            py: 1,
            mr: 1,
            // borderRadius: '20px',
            // backgroundColor: activePage === page ? theme.palette.primary.main : 'transparent',
            color: activePage === page ? 'white' : 'text.primary',
            fontWeight: activePage === page ? 'bold' : 'normal',
            fontSize: '0.875rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            // border: activePage === page ? 'none' : '1px solid rgba(0,0,0,0.12)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleNavigation(page)}
        >
          {page === 'hero' ? 'Home' :
            page === 'features' ? 'Features' :
              page === 'how-it-works' ? 'How It Works' :
                page === 'pricing' ? 'Pricing' :
                  page === 'faq' ? 'FAQ' : 'Get Started'}
        </Box>
      ))}
    </Box>
  );

  // Desktop Navigation Component
  const DesktopNavigation = () => (
    <Box 
      className="scroll-nav-container"
      sx={{ 
        display: 'flex', 
        justifyContent: 'flex-start',
        mb: 2,
        overflowX: 'auto',
        pb: 1.5,
        position: 'relative',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        px: 1
      }}>
      {['hero', 'features', 'how-it-works', 'pricing', 'faq', 'cta'].map((page) => (
        <MotionButton
          key={page}
          color="inherit"
          onClick={() => handleNavigation(page)}
          initial={activePage === page ? "active" : "inactive"}
          animate={activePage === page ? "active" : "inactive"}
          whileHover="hover"
          variants={NavigationButtonVariants}
          sx={{ 
            mx: isTablet ? 0.5 : 1,
            whiteSpace: 'nowrap',
            px: isTablet ? 1 : 2
          }}
        >
          {page === 'hero' ? 'Home' :
            page === 'features' ? 'Features' :
              page === 'how-it-works' ? 'How It Works' :
                page === 'pricing' ? 'Pricing' :
                  page === 'faq' ? 'FAQ' : 'Get Started'}
        </MotionButton>
      ))}
    </Box>
  );

  // Custom scrolling functionality
  useEffect(() => {
    // Add scroll indicators and handle scroll behavior
    const handleScroll = () => {
      const navContainers = document.querySelectorAll('.scroll-nav-container');
      
      navContainers.forEach(container => {
        // Show shadows based on scroll position
        const isScrollable = container.scrollWidth > container.clientWidth;
        const isScrolledToEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        const isScrolledFromStart = container.scrollLeft > 10;
        
        container.classList.toggle('show-right-shadow', isScrollable && !isScrolledToEnd);
        container.classList.toggle('show-left-shadow', isScrolledFromStart);
      });
    };

    // Initial call to set up shadows
    setTimeout(handleScroll, 100);
    
    // Add scroll event listeners
    const navContainers = document.querySelectorAll('.scroll-nav-container');
    navContainers.forEach(container => {
      container.addEventListener('scroll', handleScroll);
    });

    // Clean up
    return () => {
      navContainers.forEach(container => {
        container.removeEventListener('scroll', handleScroll);
      });
    };
  }, [activePage]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Header />
        <Container sx={{ py: isMobile ? 2 : 4, px: isMobile ? 2 : 3 }}>
          <style jsx global>{`
            .scroll-nav-container {
              position: relative;
              scrollbar-width: thin;
              -ms-overflow-style: -ms-autohiding-scrollbar;
            }
            
            .scroll-nav-container::-webkit-scrollbar {
              height: 8px;
            }
            
            .scroll-nav-container::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            
            .scroll-nav-container::-webkit-scrollbar-thumb {
              background: #0e3b39;
              border-radius: 10px;
            }
            
            .scroll-nav-container::-webkit-scrollbar-thumb:hover {
              background: #082624;
            }
            
            .show-right-shadow::after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
              width: 30px;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.9));
              pointer-events: none;
            }
            
            .show-left-shadow::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 30px;
              background: linear-gradient(to left, transparent, rgba(255,255,255,0.9));
              pointer-events: none;
              z-index: 1;
            }
          `}</style>
          
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
                py: 2,
                borderBottom: 1,
                borderColor: 'divider'
              }}
              initial={{ backgroundColor: 'white' }}
              whileHover={{ backgroundColor: 'rgba(220, 20, 60, 0.02)' }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MotionBox
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 1,
                    borderRadius: 1,
                    display: 'flex',
                    mr: 2
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
                    <ShareIcon />
                  </motion.div>
                </MotionBox>
                <Typography variant={isMobile ? "subtitle1" : "h6"} component="div">
                  Tap2share for Shopify
                </Typography>
              </Box>
              
              {isMobile && (
                <IconButton 
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </MotionBox>

            {/* Mobile Navigation - Vertical Dropdown */}
            {isMobile && mobileNavOpen && <MobileNavigation />}

            <Box sx={{ p: isMobile ? 2 : 3 }}>
              {/* Horizontal Scrolling Navigation */}
              {isMobile ? <MobileTabNavigation /> : <DesktopNavigation />}

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
                  {activePage === 'pricing' && <PricingSection />}
                  {activePage === 'faq' && <FAQSection />}
                  {activePage === 'cta' && <CallToActionSection />}
                </motion.div>
              </AnimatePresence>

              {/* Add the CTA section to the bottom of specific pages if desired */}
              {(activePage === 'hero' || activePage === 'features' || activePage === 'how-it-works') && (
                <CallToActionSection />
              )}
            </Box>
          </MotionPaper>
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Tap2shareApp;