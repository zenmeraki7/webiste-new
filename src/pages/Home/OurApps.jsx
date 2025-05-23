import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  IconButton,
  useMediaQuery, // Import useMediaQuery
} from '@mui/material';
import {
  BarChart,
  Share,
  Store,
  CameraAlt,
  ChatBubbleOutline,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { SearchIcon } from 'lucide-react';

// Theme and AnimatedBackground component remain unchanged...
// Create custom theme with your primary color #0A2725
const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2725',
    },
    secondary: {
      main: '#EFF9F9',
    },
    background: {
      default: '#F5F7F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0A2725',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 24px',
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: '0px 4px 12px rgba(10, 39, 37, 0.15)',
          '&:hover': {
            backgroundColor: '#0D3635',
            boxShadow: '0px 6px 16px rgba(10, 39, 37, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
        },
      },
    },
  },
});

// Animated Particles Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Make canvas full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Particle settings
    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(10, 39, 37, ${Math.random() * 0.1 + 0.05})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      // Connect particles with lines
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      const maxDistance = 150;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(10, 39, 37, ${0.05 - (distance / maxDistance) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

// New component for animated section titles
const AnimatedSectionTitle = ({ children }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

// App data - UPDATED with solid color
const apps = [
  {
    id: 1,
    name: "Metamatrix",
    description: "Advanced analytics and data visualization platform",
    icon: <BarChart sx={{ fontSize: 40 }} />,
    bgColor: '#0A2725',
    featured: true,
    link: '/metamatrix-app'

  },
  {
    id: 2,
    name: "Tap2share",
    description: "Streamline your social media management",
    icon: <Share sx={{ fontSize: 40 }} />,
    bgColor: '#0A2725',
    featured: true,
    link: 'tap2share-app'
  },
  {
    id: 3,
    name: "Multivendor",
    description: "Comprehensive marketplace solution",
    icon: <Store sx={{ fontSize: 40 }} />,
    bgColor: '#0A2725',
    featured: true,
    link: '/multivendor-app'
  },
  {
    id: 4,
    name: "Visual Search",
    description: "AI-powered image recognition and search",
    icon: <SearchIcon
     sx={{ fontSize: 40 }} />,
    bgColor: '#0A2725',
    featured: true,
    link: '/visual-search-app'
  },
  {
    id: 5,
    name: "Virtual Photoshoot",
    description: "Create professional-grade images instantly",
    icon: <CameraAlt sx={{ fontSize: 40 }} />,
    bgColor: '#0A2725',
    featured: true,
    link: ''
  },
  {
    id: 6,
    name: "Chatbot",
    description: "Intelligent conversational AI assistant",
    icon: <ChatBubbleOutline sx={{ fontSize: 40 }} />,
    bgColor: '#0A2725',
    featured: true,
    link: ''
  }
].filter(app => !app.disable);

// New component for animated cards that appear one by one
const AnimatedAppCard = ({ app, index, isCurrentCard, handleCardClick, isMobile }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    // This margin makes elements activate before they're fully in view
    margin: "0px 0px -100px 0px"
  });

  useEffect(() => {
    if (isInView) {
      // Start animation after a delay based on index
      setTimeout(() => {
        controls.start('visible');
      }, index * 200); // 200ms staggered delay between cards
    }
  }, [controls, isInView, index]);

  // Define card dimensions based on screen size
  const cardWidth = isMobile ? 240 : 280;
  const cardHeight = isMobile ? 300 : 340;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: isCurrentCard ? 1.05 : 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
            delay: index * 0.1 // Staggered animation
          }
        }
      }}
      whileHover={{
        scale: 1.1,
        y: -15,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      style={{
        flex: '0 0 auto',
        scrollSnapAlign: 'center',
        width: cardWidth, // Dynamic width
      }}
      onClick={() => handleCardClick(index)}
    >
      <Card
        sx={{
          height: cardHeight, // Dynamic height
          width: cardWidth, // Dynamic width
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: app.bgColor,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: isCurrentCard ? 2 : 1,
          position: 'relative',
          opacity: isCurrentCard ? 1 : 0.85,
          boxShadow: isCurrentCard ?
            '0 20px 40px -12px rgba(10, 39, 37, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)' :
            '0 8px 40px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Remove the white glass effect overlay */}

        <CardContent sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          position: 'relative',
          zIndex: 2
        }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.1 + 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <Box sx={{
              width: 60, // Reduced icon size on mobile
              height: 60, // Reduced icon size on mobile
              borderRadius: '50%',
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              mb: 2 // Reduced margin on mobile
            }}>
              {React.cloneElement(app.icon, { style: { fontSize: 32 } })} {/* Smaller icon */}
            </Box>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
          >
            <Typography variant={isMobile ? "h6" : "h5"} component="h3" align="center" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
              {app.name}
            </Typography>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          >
            <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? '0.9rem' : '1rem' }}>
              {app.description}
            </Typography>
          </motion.div>
        </CardContent>

        <CardActions sx={{ p: 0, justifyContent: 'center', pb: 2, position: 'relative', zIndex: 2 }}> {/* Reduced bottom padding */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
          >
            <Button
              variant="contained"
              href={app.link}
              sx={{
                bgcolor: 'rgba(8, 74, 73, 0.9)',
                color: 'white',
                borderRadius: 24, // Slightly smaller border radius
                px: 2.5, // Reduced horizontal padding
                py: 0.6, // Reduced vertical padding
                fontWeight: 600,
                fontSize: isMobile ? '0.875rem' : '1rem', // Smaller font size
                '&:hover': {
                  bgcolor: '#084A49',
                },
              }}
            >
              Explore
            </Button>
          </motion.div>
        </CardActions>


      </Card>
    </motion.div>
  );
};

const OurAppsPage = () => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const autoScrollIntervalRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's mobile

  // Calculate scroll amount based on container width
  const scrollAmount = () => {
    if (containerRef.current) {
      // Return approximately one card width plus gap
      return containerRef.current.offsetWidth / (isMobile ? 1.5 : 3); // Adjust for mobile
    }
    return isMobile ? 260 : 300; // Default fallback for mobile
  };

  const getCardWidth = () => {
    return isMobile ? 240 : 280;
  };

  const scrollToCard = (index) => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      const gap = 12; // Approximate gap between cards
      const scrollPosition = index * (cardWidth + gap);

      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      setCurrentCardIndex(index);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(0, currentCardIndex - 1);
      scrollToCard(newIndex);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const newIndex = Math.min(apps.length - 1, currentCardIndex + 1);
      scrollToCard(newIndex);
    }
  };

  // Handle card click
  const handleCardClick = (index) => {
    scrollToCard(index);
  };

  // Handle auto scrolling
  useEffect(() => {
    if (autoScroll) {
      autoScrollIntervalRef.current = setInterval(() => {
        const nextIndex = (currentCardIndex + 1) % apps.length;
        scrollToCard(nextIndex);
      }, 3000); // Scroll every 3 seconds
    } else {
      clearInterval(autoScrollIntervalRef.current);
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [autoScroll, currentCardIndex]);

  // Reset auto-scroll when user manually scrolls
  const handleManualScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = getCardWidth();
      const gap = 12;

      // Find the closest card to the current scroll position
      const estimatedIndex = Math.round(scrollPosition / (cardWidth + gap));
      const boundedIndex = Math.max(0, Math.min(estimatedIndex, apps.length - 1));

      if (boundedIndex !== currentCardIndex) {
        setCurrentCardIndex(boundedIndex);

        // Reset auto-scroll timer when user manually changes cards
        if (autoScroll) {
          clearInterval(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = setInterval(() => {
            setCurrentCardIndex(prevIndex => (prevIndex + 1) % apps.length);
            scrollToCard((currentCardIndex + 1) % apps.length);
          }, 3000);
        }
      }
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleManualScroll);
      return () => scrollContainer.removeEventListener('scroll', handleManualScroll);
    }
  }, [currentCardIndex]);

  // Center first card on initial load
  useEffect(() => {
    if (scrollRef.current) {
      // Start with the first card
      scrollToCard(0);
    }
  }, []);

  // Toggle auto scroll
  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  // Create variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        bgcolor: '#F5F7F9', // Light background color
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        color: '#0A2725'
      }}>
        {/* Add animated background with proper color */}
        <AnimatedBackground />

        {/* Hero Section with improved animations */}
        <Box
          sx={{
            position: 'relative',
            background: '#0A2725',
            pt: { xs: 8, sm: 12 }, // Reduce top padding on extra-small screens
            pb: { xs: 2, sm: 4 },  // Reduce bottom padding on extra-small screens
            zIndex: 1,
            color: 'white'
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 100
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                align="center"
                sx={{
                  mb: { xs: 0.5, sm: 1 }, // Reduce margin-bottom on extra-small screens
                  fontSize: { xs: '1.9rem', sm: '1.8rem', md: '3.4rem' } ,
                  // fontSize: { xs: '2.5rem', sm: '3.5rem' }, // Smaller font size on extra-small screens
                  lineHeight: 1.1, // Adjust line height for smaller text
                  color: 'white',
                }}
              >
                Explore Our Apps
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
            >
              <Typography
                variant="subtitle1"
                color="rgba(255,255,255,0.8)"
                align="center"
                sx={{
                  mb: { xs: 2, sm: 4 }, // Reduce margin-bottom on extra-small screens
                  fontSize: { xs: '1rem', sm: '1.25rem' }, // Smaller font size on extra-small screens
                  lineHeight: 1.4, // Adjust line height for smaller text
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                Discover our suite of innovative applications designed to enhance your experience with cutting-edge AI technology.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 2, sm: 4 } }}> {/* Reduce margin-bottom on extra-small screens */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#0A2725',
                      fontSize: { xs: '0.9rem', sm: '1rem' }, // Smaller font size on extra-small screens
                      padding: { xs: '8px 16px', sm: '10px 24px' }, // Smaller padding on extra-small screens
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      }
                    }}
                    // need to route to contact us page
                    onClick={() => window.location.href = '/contact'}

                  >
                    Contact Us
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Apps Gallery with LIGHT background and improved scroll animations */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(180deg, #EFF9F9 0%, #F5F7F9 100%)', // Light gradient background
            borderTop: '1px solid rgba(10, 39, 37, 0.05)'
          }}
          ref={containerRef}
        >
          <Container maxWidth="xl" sx={{ position: 'relative' }}>


            {/* Navigation buttons */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              width: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              px: { xs: 1, sm: 2, md: 4 },
              pointerEvents: 'none'
            }}>
              <IconButton
                onClick={scrollLeft}
                sx={{
                  bgcolor: 'rgba(10, 39, 37, 0.1)',
                  color: '#0A2725',
                  pointerEvents: 'auto',
                  '&:hover': {
                    bgcolor: 'rgba(10, 39, 37, 0.2)',
                  }
                }}
              >
                <NavigateBefore />
              </IconButton>
              <IconButton
                onClick={scrollRight}
                sx={{
                  bgcolor: 'rgba(10, 39, 37, 0.1)',
                  color: '#0A2725',
                  pointerEvents: 'auto',
                  '&:hover': {
                    bgcolor: 'rgba(10, 39, 37, 0.2)',
                  }
                }}
              >
                <NavigateNext />
              </IconButton>
            </Box>

            {/* Scrolling Cards with staggered animations */}
            <Box
              ref={scrollRef}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 3,
                py: 4,
                px: { xs: 4, sm: 6, md: 8 },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                scrollSnapType: 'x mandatory',
                // Ensure proper centering
                justifyContent: 'flex-start',
                alignItems: 'center',
                minHeight: 360, // Adjusted minHeight for mobile
                '&::after': {
                  content: '""',
                  flexShrink: 0,
                  width: { xs: 16, sm: 24, md: 32 }
                },
                '&::before': {
                  content: '""',
                  flexShrink: 0,
                  width: { xs: 16, sm: 24, md: 32 }
                }
              }}
            >
              {apps.map((app, index) => (
                <AnimatedAppCard
                  key={app.id}
                  app={app}
                  index={index}
                  isCurrentCard={currentCardIndex === index}
                  handleCardClick={handleCardClick}
                  isMobile={isMobile} // Pass isMobile prop
                />
              ))}
            </Box>

            {/* Pagination indicators with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                gap: 1
              }}>
                {apps.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.3
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Box
                      onClick={() => scrollToCard(index)}
                      sx={{
                        width: 8, // Slightly smaller pagination dots on mobile
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: currentCardIndex === index ? '#0A2725' : 'rgba(10, 39, 37, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: currentCardIndex === index ? '#0A2725' : 'rgba(10, 39, 37, 0.4)',
                        }
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>


          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default OurAppsPage;