import React, { useState } from 'react';
import {
  AppBar, Box, Button, Card, CardContent, Container, Divider,
  Grid, IconButton, Paper, Tab, Tabs, Typography, List,
  ListItem, ListItemIcon, ListItemText, Rating
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckIcon from '@mui/icons-material/Check';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import Header from '../../components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Launch Your Own Marketplace with MultiVendor
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Transform your Shopify store into a thriving marketplace where multiple vendors can sell their products, while you earn commission on every sale without handling inventory.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            {/* <MotionButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<StorefrontIcon />}
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
            >
              Install App
            </MotionButton> */}
            {/* <MotionButton
              variant="outlined"
              color="primary"
              size="large"
              whileHover={{
                borderColor: theme.palette.primary.dark,
                color: theme.palette.primary.dark,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}

            >
              Watch Demo
            </MotionButton> */}
          </Box>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={4.8} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              4.8/5 from over 500 merchants
            </Typography>
          </Box> */}
        </Grid>
      </Grid>
    </Box>
  );

  const FeatureSection = () => (
    <Box sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
       
        
        <Box sx={{ mt: 3 }}>
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
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          How MultiVendor Works
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Setting up your marketplace is simple with our guided installation process
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {[
            { icon: <StorefrontIcon fontSize="large" />, title: '1. Install the App', desc: 'Add MultiVendor to your Shopify store with our easy installation wizard' },
            { icon: <GroupIcon fontSize="large" />, title: '2. Invite Vendors', desc: 'Set up your vendor application form and start approving sellers' },
            { icon: <MonetizationOnIcon fontSize="large" />, title: '3. Start Earning', desc: 'Set commission rates and watch your marketplace grow' }
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

  
  //   <Box sx={{ py: 4 }}>
  //     <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
  //       Pricing Plans
  //     </Typography>
  //     <Typography variant="body1" paragraph sx={{ mb: 4 }}>
  //       Choose the plan that fits your marketplace needs
  //     </Typography>

  //     <Grid container spacing={3}>
  //       {[
  //         {
  //           title: "Starter",
  //           price: "$3",
  //           features: [
  //             "Up to 25 vendors",
  //             "5% commission on sales",
  //             "Basic vendor dashboard",
  //             "Manual payouts",
  //             "Email support"
  //           ]
  //         },
  //       //   {
  //       //     title: "Growth",
  //       //     price: "$99",
  //       //     features: [
  //       //       "Up to 100 vendors",
  //       //       "3% commission on sales",
  //       //       "Advanced vendor dashboard",
  //       //       "Automated weekly payouts",
  //       //       "Priority support",
  //       //       "Vendor rating system"
  //       //     ],
  //       //     highlighted: true
  //       //   },
  //       //   {
  //       //     title: "Enterprise",
  //       //     price: "$199",
  //       //     features: [
  //       //       "Unlimited vendors",
  //       //       "2% commission on sales",
  //       //       "White-labeled vendor portal",
  //       //       "Custom payout schedules",
  //       //       "Dedicated account manager",
  //       //       "API access",
  //       //       "Custom commission tiers"
  //       //     ]
  //       //   }
  //       ].map((plan, index) => (
  //         <Grid item xs={12} md={4} key={index}>
  //           <MotionCard
  //             variant="outlined"
  //             sx={{
  //               height: '100%',
  //               borderRadius: 2,
  //               position: 'relative',
  //               overflow: 'visible',
  //               borderColor: plan.highlighted ? theme.palette.primary.main : 'inherit',
  //               boxShadow: plan.highlighted ? `0px 0px 20px rgba(0, 128, 128, 0.15)` : 'none',
  //             }}
  //             whileHover={{
  //               boxShadow: '0px 10px 30px rgba(0, 128, 128, 0.2)',
  //               borderColor: theme.palette.primary.main,
  //               y: -5
  //             }}
  //             transition={{ type: "spring", stiffness: 300, damping: 15 }}
  //             animate={plan.highlighted ? {
  //               borderColor: [
  //                 theme.palette.primary.main,
  //                 theme.palette.primary.light,
  //                 theme.palette.primary.main
  //               ],
  //               boxShadow: [
  //                 `0px 0px 20px rgba(0, 128, 128, 0.15)`,
  //                 `0px 0px 20px rgba(0, 128, 128, 0.25)`,
  //                 `0px 0px 20px rgba(0, 128, 128, 0.15)`
  //               ],
  //               transition: {
  //                 duration: 5,
  //                 repeat: Infinity,
  //                 ease: "easeInOut"
  //               }
  //             } : {}}
  //           >
  //             {plan.highlighted && (
  //               <Box
  //                 sx={{
  //                   position: 'absolute',
  //                   top: -12,
  //                   left: '50%',
  //                   transform: 'translateX(-50%)',
  //                   bgcolor: theme.palette.secondary.main,
  //                   color: 'white',
  //                   py: 0.5,
  //                   px: 2,
  //                   borderRadius: 10,
  //                   fontSize: '0.75rem',
  //                   fontWeight: 'bold',
  //                   textTransform: 'uppercase',
  //                   letterSpacing: 1,
  //                 }}
  //               >
  //                 Most Popular
  //               </Box>
  //             )}
  //             <CardContent sx={{ p: 4 }}>
  //               <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
  //                 {plan.title}
  //               </Typography>

  //               <Box sx={{ my: 3 }}>
  //                 <Typography component="span" variant="h4" fontWeight="bold">
  //                   {plan.price}
  //                 </Typography>
  //                 <Typography component="span" variant="subtitle1" color="text.secondary">
  //                   /month
  //                 </Typography>
  //               </Box>

  //               <List disablePadding>
  //                 {plan.features.map((feature, idx) => (
  //                   <ListItem key={idx} disablePadding disableGutters sx={{ py: 0.5 }}>
  //                     <ListItemIcon sx={{ minWidth: 36 }}>
  //                       <motion.div
  //                         initial={{ scale: 1 }}
  //                         whileHover={{ scale: 1.2, color: theme.palette.primary.main }}
  //                       >
  //                         <CheckIcon color="success" fontSize="small" />
  //                       </motion.div>
  //                     </ListItemIcon>
  //                     <ListItemText primary={feature} />
  //                   </ListItem>
  //                 ))}
  //               </List>

  //               <MotionButton
  //                 variant={plan.highlighted ? "contained" : "outlined"}
  //                 color="primary"
  //                 fullWidth
  //                 size="large"
  //                 sx={{ mt: 4 }}
  //                 whileHover={{
  //                   scale: 1.02,
  //                   transition: { duration: 0.3 }
  //                 }}
  //                 whileTap={{ scale: 0.98 }}
  //                 animate={plan.highlighted ? {
  //                   backgroundImage: [
  //                     `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
  //                     `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  //                     `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  //                     `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
  //                   ],
  //                   transition: {
  //                     duration: 8,
  //                     repeat: Infinity,
  //                     ease: "easeInOut"
  //                   }
  //                 } : {}}
  //               >
  //                 Get Started
  //               </MotionButton>
  //             </CardContent>
  //           </MotionCard>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   </Box>
  // );

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
                backgroundColor: 'rgba(0, 128, 128, 0.03)',
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
        Ready to Launch Your Marketplace?
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }} color="white">
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
          padding: 3,
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Typography 
          variant="h6" 
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
              width: 10, 
              height: 10, 
              borderRadius: '50%', 
              backgroundColor: '#4caf50',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }} 
          />
          Coming Soon
        </Typography>
        <Typography variant="body2" color="white" align="center" sx={{ mb: 2 }}>
          Our advanced marketplace builder is in final testing
        </Typography>
        {/* <Button 
          variant="outlined" 
          sx={{ 
            borderColor: 'white', 
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Join Waitlist
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
              whileHover={{ backgroundColor: 'rgba(0, 128, 128, 0.02)' }}
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
                    <StorefrontIcon />
                  </motion.div>
                </MotionBox>
                <Typography variant="h6" component="div">
                  MultiVendor
                </Typography>
              </Box>
              {/* <MotionButton
                variant="contained"
                color="primary"
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
                    '0px 3px 5px rgba(0, 128, 128, 0.2)',
                    '0px 3px 10px rgba(0, 128, 128, 0.4)',
                    '0px 3px 5px rgba(0, 128, 128, 0.2)'
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
                {['hero', 'features', 'how-it-works', 'faq'].map((page) => (
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
                    {page === 'hero' ? 'HERO' :
                      page === 'features' ? 'Features' :
                        page === 'how-it-works' ? 'How It Works' :
                          // page === 'pricing' ? 'Pricing' :
                          
                        //   page === 'testimonials' ? 'Testimonials' :
                          page === 'faq' ? 'FAQ' : 'GET STARTED'}

                           
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
                  {/* {activePage === 'pricing' && <PricingSection />} */}
                 
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