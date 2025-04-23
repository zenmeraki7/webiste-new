import React, { useState } from 'react';
import {
  AppBar, Box, Button, Card, CardContent, Container, Divider,
  Grid, IconButton, Paper, Tab, Tabs, Typography, List,
  ListItem, ListItemIcon, ListItemText, Rating
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckIcon from '@mui/icons-material/Check';
import BarChartIcon from '@mui/icons-material/BarChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Header from '../../components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';

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
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          MetaMatrix – Effortless Bulk Editing for Your Shopify Store!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          MetaMatrix is a powerful bulk editor tool designed to streamline and simplify product data management.MetaMatrix enables users to efficiently update, modify, and manage large volumes of product information with ease. Built with a user-friendly interface, it enhances productivity by offering seamless bulk editing capabilities, ensuring accuracy and efficiency for e-commerce businesses.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <MotionButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DataUsageIcon />}
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
              onClick={() => window.open('https://apps.shopify.com/metamatrix', '_blank')}
            >
              GET THE APP
            </MotionButton>
            <MotionButton
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
              onClick={() => window.open('https://youtu.be/1UMtbQG5Z1M', '_blank')}
             
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
        boxShadow: '0px 5px 15px rgba(25, 118, 210, 0.4)'
      }
    };

    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          How MetaMatrix Works
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Effortless bulk editing for a smarter Shopify store!
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {[
            { icon: <DataUsageIcon fontSize="large" />, title: '1. Connect Your Store', desc: 'Sync your Shopify store instantly for seamless product management.' },
            { icon: <InsightsIcon fontSize="large" />, title: '2. Edit in Bulk', desc: 'Modify products, variants, pricing, and inventory with powerful bulk-editing tools.' },
            { icon: <AutoGraphIcon fontSize="large" />, title: '3. Optimize & Automate', desc: 'Save time with automation, scheduled updates, and smart editing suggestions.' }
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
        Pricing Plans
      </Typography>

      <Grid container spacing={3}>
        {[
          {
            title: "Free Version",
            price: "$0",
            // description: "For small businesses",
            features: [
              "10 product edits monthly",
              "Edit as much as you want",
              "Unlimited use in dev until launch",
        
            ]
          },
          {
            title: "Basic(Monthly)",
            price: "$20",
            // description: "For growing businesses",
            features: [
              "Unlimited Product per Task",
              "60-Day Bulk Edit History",
              "Scheduled Edits",
              
            ],
            
          },
          {
            title: "Advanced(Monthly)",
            price: "$40",
            // description: "For large organizations",
            features: [
              "90-Day Bulk Edit History",
              "Scheduled exports for seamless reporting",
              "5 product rules",
              
            ]
          },
          {
            title: "Pro(Monthly)",
            price: "$50",
            // description: "For large organizations",
            features: [
              "180-Day Bulk Edit History",
              "10 inventory syncs for comprehensive",
              "Dedicated Account Manager",
              
            ]
          },
          {
            title: "Advanced(Yearly)",
            price: "$100",
            // description: "For large organizations",
            features: [
              "90-Day Bulk Edit History",
              "Scheduled exports for seamless reporting",
              "5 product rules",
              
            ]
          }
        ].map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <MotionCard
              variant="outlined"
              sx={{
                borderRadius: 2,
                position: 'relative',
                overflow: 'visible',
                mb: 4,
                height: '100%',
                borderColor: plan.highlighted ? theme.palette.primary.main : undefined,
                boxShadow: plan.highlighted ? `0px 5px 15px rgba(25, 118, 210, 0.2)` : undefined
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
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {plan.description}
                </Typography>

                <Box sx={{ my: 3 }}>
                  <Typography component="span" variant="h4" fontWeight="bold">
                    {plan.price}
                  </Typography>
                  <Typography component="span" variant="subtitle1" color="text.secondary">
                    /month
                  </Typography>
                </Box>

                <List disablePadding>
                  {plan.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} disablePadding disableGutters sx={{ py: 0.5 }}>
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
                  variant={plan.highlighted ? "contained" : "outlined"}
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 4 }}
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
                backgroundColor: 'rgba(25, 118, 210, 0.03)',
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
            Still have questions? Our data experts are here to help.
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

//   const TestimonialsSection = () => {
//     const testimonials = [
//       {
//         name: "Sarah Johnson",
//         company: "Boutique Apparel",
//         quote: "MetaMatrix transformed how we understand our business. We identified underperforming product lines and optimized our inventory, increasing our profit margin by 22% in just three months.",
//         rating: 5
//       },
//       {
//         name: "Michael Chen",
//         company: "Tech Gadgets Direct",
//         quote: "The predictive analytics feature has been a game-changer for our seasonal planning. We can now accurately forecast demand and adjust our marketing spend accordingly.",
//         rating: 5
//       },
//       {
//         name: "Jessica Williams",
//         company: "Organic Home Goods",
//         quote: "I was intimidated by data analytics before, but MetaMatrix makes it so simple. The visualizations help me understand trends at a glance, and the AI recommendations have directly improved our conversion rates.",
//         rating: 4.5
//       }
//     ];

//     return (
//       <Box sx={{ py: 4 }}>
//         <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
//           What Our Customers Say
//         </Typography>

//         <Grid container spacing={3}>
//           {testimonials.map((testimonial, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <MotionCard
//                 variant="outlined"
//                 sx={{ height: '100%', borderRadius: 2, p: 2 }}
//                 whileHover={{
//                   boxShadow: '0px 5px 15px rgba(25, 118, 210, 0.2)',
//                   y: -5
//                 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 15 }}
//               >
//                 <CardContent>
//                   <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 2 }}>
//                     "{testimonial.quote}"
//                   </Typography>
//                   <Box sx={{ mt: 'auto' }}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       {testimonial.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       {testimonial.company}
//                     </Typography>
//                     <Rating value={testimonial.rating} precision={0.5} readOnly />
//                   </Box>
//                 </CardContent>
//               </MotionCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     );
//   };

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
              Ready to Transform Your Data into Insights?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="white">
              Join thousands of successful businesses using MetaMatrix to unlock the full potential of their data. Start your free 14-day trial today.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                // startIcon={<BarChartIcon />}
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
              whileHover={{ backgroundColor: 'rgba(25, 118, 210, 0.02)' }}
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
                    <BarChartIcon />
                  </motion.div>
                </MotionBox>
                <Typography variant="h6" component="div">
                  MetaMatrix
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
                    '0px 3px 5px rgba(25, 118, 210, 0.2)',
                    '0px 3px 10px rgba(25, 118, 210, 0.4)',
                    '0px 3px 5px rgba(25, 118, 210, 0.2)'
                  ],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
               GET THE APP
              </MotionButton> */}
            </MotionBox>

            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {['hero', 'features', 'how-it-works', 'pricing', 'faq'].map((page) => (
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
                    {page === 'hero' ? 'Overview' :
                      page === 'features' ? 'Features' :
                        page === 'how-it-works' ? 'How It Works' :
                          page === 'pricing' ? 'Pricing' :
                          page === 'faq' ? 'FAQ' : 'Overview'}
                            
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
                  {/* {activePage === 'testimonials' && <TestimonialsSection />} */}
                  {activePage === 'faq' && <FAQSection />}
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

export default MetaMatrixApp;