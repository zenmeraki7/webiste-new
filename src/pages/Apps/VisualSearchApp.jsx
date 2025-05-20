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
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CollectionsIcon from '@mui/icons-material/Collections';
import SearchIcon from '@mui/icons-material/Search';



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

const VisualSearchApp = () => {
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
            title: 'Visual Search Technology',
            description: 'Find products by simply uploading an image. Our AI-powered search engine identifies similar items across all vendors in our marketplace.',
            benefits: [
                'Instant visual product matching',
                'Cross-vendor product discovery',
                'Increasing conversion rates by 35%',
                'Easy implementation for all vendors'
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
                    Discover Products with Visual Search
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: isMobile ? 2 : 4 }}
                >
                    Transform your marketplace with cutting-edge visual search technology. Let customers find products by simply uploading an image, enhancing discovery across all your vendors.
                </Typography>
                
                {/* Pure Image Banner */}
                <MotionBox
                    sx={{
                        mb: isMobile ? 3 : 4,
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        height: isMobile ? 180 : 240,
                        width: '100%',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {/* Full image placeholder */}
                    <Box 
                        component="img"
                        src="https://cdn1.vectorstock.com/i/1000x1000/79/65/special-offer-50-off-banner-design-vector-22827965.jpg"
                        alt="Visual Search Technology"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    
                    {/* Visual search indicator animations */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }}
                    >
                        {/* Animated search indicators */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    top: `${15 + (i * 15)}%`,
                                    left: `${10 + (i * 18)}%`,
                                    width: isMobile ? 30 : 50,
                                    height: isMobile ? 30 : 50,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255, 255, 255, 0.8)',
                                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
                                    zIndex: 5
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 1, 0.7],
                                    boxShadow: [
                                        '0 0 5px rgba(255, 255, 255, 0.3)',
                                        '0 0 15px rgba(255, 255, 255, 0.7)',
                                        '0 0 5px rgba(255, 255, 255, 0.3)'
                                    ]
                                }}
                                transition={{
                                    duration: 2 + (i * 0.5),
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.4
                                }}
                            >
                                {/* Inner circle */}
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: isMobile ? 8 : 12,
                                        height: isMobile ? 8 : 12,
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    }}
                                    animate={{
                                        scale: [0.8, 1.5, 0.8],
                                    }}
                                    transition={{
                                        duration: 1.5 + (i * 0.3),
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.4 + 0.2
                                    }}
                                />
                            </motion.div>
                        ))}
                    </Box>
                </MotionBox>
                
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
                    How Visual Search Works
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{ mb: isMobile ? 2 : 4 }}
                >
                    Our advanced AI technology makes finding products as easy as taking a picture
                </Typography>

                <Grid container spacing={isMobile ? 3 : 6} justifyContent="center">
                    {[
                        { icon: <PhotoCameraIcon fontSize={isMobile ? "medium" : "large"} />, title: 'Capture or Upload', desc: 'Take a photo or upload an image of a product you like' },
                        { icon: <SearchIcon fontSize={isMobile ? "medium" : "large"} />, title: '2. Visual Analysis', desc: 'Our AI analyzes the image for patterns, colors, and shapes' },
                        { icon: <StorefrontIcon fontSize={isMobile ? "medium" : "large"} />, title: '3. Find Matches', desc: 'Discover visually similar products from all marketplace vendors' }
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
                question: "How accurate is the visual search technology?",
                answer: "Our visual search achieves over 90% accuracy in matching similar products. The AI analyzes thousands of visual attributes from color and pattern to shape and texture for precise matching."
            },
            {
                question: "Can customers search from mobile devices?",
                answer: "Yes! The visual search is fully optimized for mobile. Customers can take photos directly with their phone camera or upload images from their gallery for instant product matching."
            },
            {
                question: "How does this benefit marketplace vendors?",
                answer: "Visual search significantly increases product discovery across vendors. Products that might not appear in text searches can be found through visual similarity, leading to higher visibility and conversion rates."
            },
            {
                question: "Is visual search available for all product categories?",
                answer: "Yes, our technology works with all physical product categories from fashion and home decor to electronics and more. The AI is trained on diverse product datasets to ensure accurate matching across categories."
            },
            {
                question: "How do we implement this for our marketplace?",
                answer: "Implementation is seamless with our MultiVendor platform. The visual search module integrates directly with your existing marketplace with minimal setup required. Our team provides full onboarding support."
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
                            Ready to Transform Product Discovery?
                        </Typography>
                        <Typography
                            variant={isMobile ? "body2" : "body1"}
                            sx={{ mb: isMobile ? 2 : 3 }}
                            color="white"
                        >
                            Enhance user experience and drive conversions with cutting-edge Visual Search technology. Seamless integration with your eCommerce or marketplace platform.
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
                               Our powerful Visual Search App is in the final stages of testing 
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
                                        <SearchIcon fontSize={isMobile ? "small" : "medium"} />
                                    </motion.div>
                                </MotionBox>
                                <Typography
                                    variant={isMobile ? "subtitle1" : "h6"}
                                    component="div"
                                    sx={{ fontSize: isMobile ? '1rem' : undefined }}
                                >
                                    Visual Search
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

export default VisualSearchApp;