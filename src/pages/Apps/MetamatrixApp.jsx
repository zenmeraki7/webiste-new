import React, { useState } from 'react';
import {
  AppBar, Box, Button, Card, CardContent, Container, Divider,
  Grid, IconButton, Paper, Tab, Tabs, Typography, List,
  ListItem, ListItemIcon, ListItemText, Rating, useMediaQuery,
  Modal, TextField, Alert, CircularProgress,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckIcon from '@mui/icons-material/Check';
import BarChartIcon from '@mui/icons-material/BarChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReferralModal from '../../components/ReferralModal'; // Import the separated ReferralModal
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import ShopifyStoreModal from '../../components/ShopifyStoreModal';
import { useLocation } from 'react-router-dom';

// Create a custom theme with blue as the primary color
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


const MetaMatrixApp = () => {

   // Extract ?ref=... from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get('ref'); // null if not present
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState('hero');
  const [hoverStates, setHoverStates] = useState({});
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [open, setOpen] = useState(referralCode ? true : false); // Open modal if referral code is present
  

  // Use MUI's useMediaQuery hook to detect mobile view
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleHover = (id, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [id]: isHovering
    }));
  };

  const handleReferralModalOpen = () => {
    setReferralModalOpen(true);
  };

  const handleReferralModalClose = () => {
    setReferralModalOpen(false);
  };

  

  const tabContents = {
    0: {
      title: 'Effortless Bulk Editing for Your Shopify Store',
      description: 'Transform your Shopify store management with seamless bulk editing and automation.',
      benefits: [
        'Bulk edit products, variants, and collections with ease',
        'Streamlined inventory and pricing updates in just a few clicks',
        'User-friendly interface with advanced filtering options',
        'Automate repetitive tasks to save time and reduce errors'
      ]
    },
    1: {
      title: 'AI-Powered Analytics',
      description: 'Let our machine learning algorithms do the heavy lifting to uncover trends and anomalies in your data.',
      benefits: [
        'Predictive analytics forecasting',
        'Anomaly detection and alerting',
        'Pattern recognition across datasets',
        'Natural language query processing'
      ]
    },
    2: {
      title: 'Reporting & Exports',
      description: 'Create beautiful, informative reports that can be scheduled and shared with stakeholders.',
      benefits: [
        'One-click report generation',
        'Multiple export formats (PDF, CSV, Excel)',
        'Scheduled report delivery',
        'White-label reporting options'
      ]
    },
    3: {
      title: 'Data Connectivity',
      description: 'Connect to virtually any data source with our extensive library of pre-built integrations.',
      benefits: [
        'Shopify data connector',
        'SQL database integration',
        'API connections to popular services',
        'Custom data source options'
      ]
    }
  };

  const HeroSection = () => (
    <Box sx={{ py: { xs: 1, md: 4 } }}> {/* Reduced vertical padding on mobile */}
      <Grid container spacing={isMobile ? 2 : 4}> {/* Reduced spacing on mobile */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant={isMobile ? "h5" : "h3"} /* Smaller heading on mobile */
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem', md: '3.4rem' } }} /* Custom font size scaling */
          >
            MetaMatrix – Effortless Bulk Editing for Your Shopify Store!
          </Typography>
          <Typography 
            variant={isMobile ? "body2" : "body1"} /* Smaller body text on mobile */
            color="text.secondary"
            paragraph
            sx={{ 
              mb: { xs: 1.5, md: 4 }, /* Less margin on mobile */
              fontSize: { xs: '0.875rem', md: '1rem' } /* Custom font size scaling */
            }}
          >
            MetaMatrix is a powerful bulk editor tool designed to streamline and simplify product data management. MetaMatrix enables users to efficiently update, modify, and manage large volumes of product information with ease. Built with a user-friendly interface, it enhances productivity by offering seamless bulk editing capabilities, ensuring accuracy and efficiency for e-commerce businesses.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, md: 2 }, /* Smaller gap on mobile */
            mb: { xs: 1.5, md: 4 } /* Less margin on mobile */
          }}>
            <MotionButton
              variant="contained"
              color="primary"
              size={isMobile ? "medium" : "large"} /* Smaller button on mobile */
              fullWidth={isMobile}
              startIcon={<DataUsageIcon fontSize={isMobile ? "small" : "medium"} />} /* Smaller icon on mobile */
              whileHover={{
                scale: isMobile ? 1.03 : 1.05, /* Subtler hover effect on mobile */
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
                  : undefined,
                padding: isMobile ? '6px 16px' : undefined /* Custom padding for mobile */
              }}
             onClick={() => setOpen(true)}
              sx={{
                fontSize: { xs: '0.8rem', md: '0.875rem' }, /* Smaller font on mobile */
                height: { xs: '36px', md: '48px' } /* Reduced height on mobile */
              }}
            >
              GET THE APP
            </MotionButton>
            <MotionButton
              variant="outlined"
              color="primary"
              size={isMobile ? "medium" : "large"} /* Smaller button on mobile */
              fullWidth={isMobile}
              startIcon={<LinkIcon fontSize={isMobile ? "small" : "medium"} />}
              whileHover={{
                borderColor: theme.palette.primary.dark,
                color: theme.palette.primary.dark,
                scale: isMobile ? 1.03 : 1.05, /* Subtler hover effect on mobile */
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReferralModalOpen}
              sx={{
                fontSize: { xs: '0.8rem', md: '0.875rem' }, /* Smaller font on mobile */
                height: { xs: '36px', md: '48px' }, /* Reduced height on mobile */
                mt: { xs: 0.5, sm: 0 } /* Small margin top only on extra small screens */
              }}
            >
             Generate Referral Link
            </MotionButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const FeatureSection = () => (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
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
              <ListItemText 
                primary={benefit} 
                primaryTypographyProps={{ 
                  fontSize: isMobile ? '0.9rem' : 'inherit' 
                }}
              />
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
        boxShadow: '0px 5px 15px rgba(25, 118, 210, 0.4)'
      }
    };

    return (
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h2" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ mb: 3 }}
        >
          How MetaMatrix Works
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Effortless bulk editing for a smarter Shopify store!
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {[
            { icon: <DataUsageIcon fontSize={isMobile ? "medium" : "large"} />, title: '1. Connect Your Store', desc: 'Sync your Shopify store instantly for seamless product management.' },
            { icon: <InsightsIcon fontSize={isMobile ? "medium" : "large"} />, title: '2. Edit in Bulk', desc: 'Modify products, variants, pricing, and inventory with powerful bulk-editing tools.' },
            { icon: <AutoGraphIcon fontSize={isMobile ? "medium" : "large"} />, title: '3. Optimize & Automate', desc: 'Save time with automation, scheduled updates, and smart editing suggestions.' }
          ].map((item, index) => (
            <Grid key={index} item xs={12} md={4} sx={{ textAlign: 'center' }}>
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
                    `rgba(35, 190, 130, 0.8)`,
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

  const PricingSection = () => (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ mb: 1, mt: 2 }}
      >
        Pricing Plans
      </Typography>
  
      <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {[
          {
            title: "Free Version",
            price: "$0",
            features: [
              "10 product edits monthly",
              "Edit as much as you want",
              "Unlimited use in dev until launch",
            ]
          },
          {
            title: "Basic(Monthly)",
            price: "$20",
            features: [
              "Unlimited Product per Task",
              "60-Day Bulk Edit History",
              "Scheduled Edits",
            ],
          },
          {
            title: "Advanced(Monthly)",
            price: "$50",
            features: [
              "90-Day Bulk Edit History",
              "Scheduled exports for seamless reporting",
              "5 product rules",
            ]
          },
          {
            title: "Pro(Monthly)",
            price: "$100",
            features: [
              "180-Day Bulk Edit History",
              "10 inventory syncs for comprehensive",
              "Dedicated Account Manager",
            ]
          },
          
        ].map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <MotionCard
              variant="outlined"
              sx={{
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden', // Ensure content doesn't overflow if height is fixed
                mb: 4,
                minHeight: '400px', // Adjust this value to your desired fixed height
                display: 'flex',
                flexDirection: 'column',
                borderColor: plan.highlighted ? theme.palette.primary.main : undefined,
                boxShadow: plan.highlighted ? `0px 5px 15px rgba(25, 118, 210, 0.2)` : undefined,
                flexGrow: 1,
              }}
              whileHover={{
                boxShadow: '0px 10px 30px rgba(25, 118, 210, 0.2)',
                borderColor: theme.palette.primary.main,
                y: -5
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              animate={plan.highlighted ? {
                borderColor: [
                  theme.palette.primary.main,
                  theme.palette.primary.light,
                  theme.palette.primary.main
                ],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : {}}
            >
              {plan.highlighted && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 20,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}
                >
                  Most Popular
                </Box>
              )}
              <CardContent sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  component="div"
                  fontWeight="bold"
                  gutterBottom
                >
                  {plan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {plan.description}
                </Typography>
  
                <Box sx={{ my: 3 }}>
                  <Typography
                    component="span"
                    variant={isMobile ? "h5" : "h4"}
                    fontWeight="bold"
                  >
                    {plan.price}
                  </Typography>
                  <Typography component="span" variant="subtitle1" color="text.secondary">
                    /month
                  </Typography>
                </Box>
  
                <List disablePadding sx={{ flexGrow: 1 }}>
                  {plan.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} disablePadding disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.2, color: theme.palette.primary.main }}
                        >
                          <CheckIcon sx={{ color: theme.palette.primary.main }} fontSize={isMobile ? "small" : "medium"} />
                        </motion.div>
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          fontSize: isMobile ? '0.85rem' : 'inherit'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
  
                <MotionButton
                  variant={plan.highlighted ? "contained" : "outlined"}
                  color="primary"
                  fullWidth
                  size={isMobile ? "medium" : "large"}
                  sx={{ mt: 'auto' }} // Push the button to the bottom
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={plan.highlighted ? {
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
                  } : {}}
                >
                  {plan.title === "Enterprise" ? "Contact Sales" : "GET THE APP"}
                </MotionButton>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const FAQSection = () => {
    const faqs = [
      {
        question: "How easy is it to connect my Shopify store?",
        answer: "MetaMatrix offers a one-click integration with Shopify. Once connected, we automatically import your store data and begin generating insights immediately. No technical knowledge required."
      },
      {
        question: "Can I connect data from sources other than Shopify?",
        answer: "Absolutely! MetaMatrix supports connections to numerous data sources including Google Analytics, Facebook Ads, Instagram, SQL databases, CSV uploads, and many more. Our team is constantly adding new integrations."
      },
      {
        question: "Do I need technical skills to use MetaMatrix?",
        answer: "Not at all. MetaMatrix is designed with a user-friendly interface that requires no coding or technical expertise. Our drag-and-drop dashboard builder and visualization tools make it easy for anyone to create professional analytics dashboards."
      },
      {
        question: "How long does it take to set up?",
        answer: "Most customers are up and running within 15 minutes. After connecting your data sources, our system automatically generates starter dashboards based on your business type, which you can then customize to your needs."
      },
      {
        question: "Can I export the reports and visualizations?",
        answer: "Yes, all reports and visualizations can be exported in multiple formats including PDF, CSV, Excel, and image files. You can also schedule automated exports to be delivered to your email or shared with team members."
      }
    ];

    return (
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h2" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ mb: 3 }}
        >
          Frequently Asked Questions
        </Typography>

        <Box>
          {faqs.map((faq, index) => (
            <MotionBox
              key={index}
              sx={{ 
                mb: 3,
                px: isMobile ? 1 : 2 
              }}
              initial={{ opacity: 0.9 }}
              whileHover={{
                backgroundColor: 'rgba(25, 118, 210, 0.03)',
                borderRadius: '8px',
                padding: isMobile ? '8px' : '16px',
                marginLeft: isMobile ? '-8px' : '-16px',
                marginRight: isMobile ? '-8px' : '-16px',
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
                variant={isMobile ? "body2" : "body1"} 
                color="text.secondary"
              >
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
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 3 },
        borderRadius: 2,
        mb: 4,
        bgcolor: theme.palette.primary.main,
        position: 'relative'
      }}
    >
      <Container maxWidth={isMobile ? "xs" : "lg"}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h2" 
              fontWeight="bold" 
              gutterBottom 
              color="white"
            >
              Ready to Transform Your Data into Insights?
            </Typography>
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              sx={{ mb: 3 }} 
              color="white"
            >
              Join thousands of successful businesses using MetaMatrix to unlock the full potential of their data. Start your free 14-day trial today.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ 
            display: 'flex', 
            justifyContent: { xs: 'center', md: 'flex-end' } 
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2,
              width: { xs: '100%', sm: 'auto' }
            }}>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                fullWidth={isMobile}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  }
                }}
                onClick={() => window.open('https://youtu.be/1UMtbQG5Z1M', '_blank')}
              >
                WATCH DEMO
              </Button>
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
    <Container 
      sx={{ 
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 3 }
      }}
      maxWidth={isMobile ? "xs" : "lg"}
    >
      <MotionPaper
        sx={{ p: 0, overflow: 'hidden' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 2.5 },
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                color: 'white',
                p: isMobile ? 0.5 : 1,
                borderRadius: 1,
                display: 'flex',
                mr: { xs: 1, md: 2 }
              }}
            >
              <Avatar 
                variant='rounded' 
                src='https://cdn.shopify.com/app-store/listing_images/0d2faed5eadc2b3043d4da7d9dc6e290/icon/CL_ziN7d8YkDEAE=.png'
                sx={{
                  width: isMobile ? 24 : 32,
                  height: isMobile ? 24 : 32
                }}
              />
            </Box>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              component="div"
              sx={{ 
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              MetaMatrix
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {/* Navigation tabs - improved scrollable navigation */}
          <Box sx={{ 
            position: 'relative',
            mb: 4,
            width: '100%'
          }}>
            {/* Fade indicator for horizontal scroll on small screens */}
            {isMobile && (
              <>
                <Box 
                  sx={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '20px',
                    background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '20px',
                    background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                />
              </>
            )}
            
            {/* Scrollable container with visual indicator */}
            <Box 
              sx={{ 
                display: 'flex',
                width: '100%',
                justifyContent: { xs: 'flex-start', md: 'center' },
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': { 
                  height: '4px'
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  borderRadius: '10px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'primary.light',
                  borderRadius: '10px'
                }
              }}
            >
              <Box sx={{ 
                display: 'flex',
                px: { xs: 2, md: 0 },
                minWidth: 'fit-content'
              }}>
                {['hero', 'features', 'how-it-works', 'pricing', 'faq'].map((page) => (
                  <MotionButton
                    key={page}
                    color="inherit"
                    onClick={() => setActivePage(page)}
                    variant="text"
                    sx={{ 
                      mx: 0.5,
                      py: 1,
                      px: 2,
                      textTransform: 'capitalize',
                      fontWeight: activePage === page ? 600 : 400,
                      minWidth: 'auto',
                      whiteSpace: 'nowrap',
                      color: activePage === page ? 'primary.main' : 'text.secondary',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                    variants={NavigationButtonVariants}
                    initial="inactive"
                    animate={activePage === page ? "active" : "inactive"}
                    whileHover="hover"
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </MotionButton>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Conditional rendering of sections based on active page */}
          <AnimatePresence mode="wait">
            <MotionBox
              key={activePage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activePage === 'hero' && <HeroSection />}
              {activePage === 'features' && <FeatureSection />}
              {activePage === 'how-it-works' && <HowItWorksSection />}
              {activePage === 'pricing' && <PricingSection />}
              {activePage === 'faq' && <FAQSection />}
            </MotionBox>
          </AnimatePresence>

          {/* Call to action section that's always visible */}
          <CallToActionSection />
        </Box>
      </MotionPaper>
       <ShopifyStoreModal
        open={open}
        handleClose={() => setOpen(false)}
        referralCode={referralCode}
        isMobile={isMobile}/>

      {/* Referral Modal */}
      <ReferralModal
        open={referralModalOpen}
        onClose={handleReferralModalClose}
        theme={theme}
        isMobile={isMobile}
      />
    </Container>
    <Footer />
  </Box>
</ThemeProvider>
  );
};

export default MetaMatrixApp;