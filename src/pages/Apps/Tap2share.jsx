import React, { useState } from 'react';
import {
  AppBar, Box, Button, Card, CardContent, Container, Divider,
  Grid, IconButton, Paper, Tab, Tabs, Typography, List,
  ListItem, ListItemIcon, ListItemText, Rating
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';
import RefreshIcon from '@mui/icons-material/Refresh';
import Header from '../../components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleHover = (id, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [id]: isHovering
    }));
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
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Boost Your Sales Through Tap2share  
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Tap2share for Shopify makes it simple for your customers to share their favorite products on social media, driving traffic and increasing conversions for your Shopify store.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
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
              // disable buton

              disabled={true}
              // fade button
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
            >
              Watch Demo
            </MotionButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const FeatureSection = () => (
    <Box sx={{ py: 4 }}>
      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0">
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
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
        boxShadow: '0px 5px 15px rgba(220, 20, 60, 0.4)'
      }
    };

    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          How Tap2share for Shopify Works
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Get up and running in minutes with our simple installation process
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {[
            { icon: <ShoppingCartIcon fontSize="large" />, title: '1. Install the App', desc: 'Add Tap2share to your Shopify store with just one click' },
            { icon: <BoltIcon fontSize="large" />, title: '2. Customize Settings', desc: 'Choose which products can be shared and how they appear' },
            { icon: <RefreshIcon fontSize="large" />, title: '3. Increase Sales', desc: 'Watch as customers share products and drive new traffic to your store' }
          ].map((item, index) => (
            <Grid key={index} item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <MotionPaper
                elevation={0}
                sx={{
                  width: 80,
                  height: 80,
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
                    `rgba(255, 77, 109, 0.8)`,
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
    <Box sx={{ py: 4 }}>
      <Typography variant="h6" component="div" sx={{ mb: 1, mt: 2 }}>
        Get Started
      </Typography>

      <MotionCard
        variant="outlined"
        sx={{
          borderRadius: 2,
          position: 'relative',
          overflow: 'visible',
          mb: 4
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
        <CardContent sx={{ p: 4 }}>
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
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
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
                padding: '16px',
                marginLeft: '-16px',
                marginRight: '-16px',
                x: 0,
                borderLeft: `3px solid ${theme.palette.primary.main}`
              }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                {faq.question}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {faq.answer}
              </Typography>
              {index < faqs.length - 1 && <Divider sx={{ mt: 3 }} />}
            </MotionBox>
          ))}
        </Box>

        {/* <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" paragraph>
            Still have questions? We're here to help.
          </Typography>
          <MotionButton
            variant="outlined"
            color="primary"
            sx={{ mx: 1 }}
            whileHover={{
              borderColor: theme.palette.primary.dark,
              color: theme.palette.primary.dark,
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              borderColor: [
                theme.palette.primary.main,
                theme.palette.primary.light,
                theme.palette.primary.main
              ],
              color: [
                theme.palette.primary.main,
                theme.palette.primary.light,
                theme.palette.primary.main
              ],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            Contact Support
          </MotionButton>
          <MotionButton
            variant="text"
            color="primary"
            sx={{ mx: 1 }}
            whileHover={{
              color: theme.palette.primary.dark,
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            Read Documentation
          </MotionButton>
        </Box> */}
      </Box>
    );
  };

  const CallToActionSection = () => (
    <Box
      sx={{
        py: 5,
        borderRadius: 2,
        mb: 4,
        bgcolor: theme.palette.primary.main,
        position: 'relative'
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom color="white">
              Ready to Boost Your Social Presence?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="white">
              Join thousands of successful merchants who use Tap2share for Shopify to drive traffic, increase engagement, and boost sales.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                // startIcon={<ShareIcon />}
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
              {/* <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'grey.300',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }
                }}
                href='https://youtu.be/916_bQB-xgI'
              >
                Watch Demo
              </Button> */}

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
        <Container sx={{ py: 4 }}>
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
                px: 3,
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
                <Typography variant="h6" component="div">
                  Tap2share for Shopify
                </Typography>
              </Box>
              {/* <MotionButton
                variant="contained"
                color="primary"
                href='https://admin.shopify.com/store/demo-zen-store/apps/customizer-39?app_load_id=ea3ddb76-72ce-4436-82c1-f57b35cb2e68&link_source=search'
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundImage: [
                    `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                    `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
                  ],
                  boxShadow: [
                    '0px 3px 5px rgba(220, 20, 60, 0.2)',
                    '0px 3px 10px rgba(220, 20, 60, 0.4)',
                    '0px 3px 5px rgba(220, 20, 60, 0.2)'
                  ],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                Get the App
              </MotionButton> */}
            </MotionBox>

            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {['hero', 'features', 'how-it-works', 'pricing', 'faq', 'cta'].map((page) => (
                  <MotionButton
                    key={page}
                    color="inherit"
                    onClick={() => setActivePage(page)}
                    initial={activePage === page ? "active" : "inactive"}
                    animate={activePage === page ? "active" : "inactive"}
                    whileHover="hover"
                    variants={NavigationButtonVariants}
                    sx={{ mx: 1 }}
                  >
                    {page === 'hero' ? 'Hero' :
                      page === 'features' ? 'Features' :
                        page === 'how-it-works' ? 'How It Works' :
                          page === 'pricing' ? 'Pricing' :
                            page === 'faq' ? 'FAQ' : 'Get Started'}
                  </MotionButton>
                ))}
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