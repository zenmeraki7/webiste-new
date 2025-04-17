import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  Grid,
  Divider
} from '@mui/material';
import {
  Lightbulb,
  Rocket,
  TrendingUp,
  Code,
  Psychology,
  People
} from '@mui/icons-material';
import { motion } from 'framer-motion';

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
        this.color = `rgba(230, 255, 223, ${Math.random() * 0.1 + 0.05})`;
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
            ctx.strokeStyle = `rgba(230, 255, 223, ${0.05 - (distance / maxDistance) * 0.05})`;
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

// Create custom theme - dark design to match image
const theme = createTheme({
  palette: {
    primary: {
      main: '#00332D', // Dark teal
    },
    secondary: {
      main: '#E6FFDF', // Light mint green
    },
    background: {
      default: '#00332D', // Dark teal background
      paper: '#023B34', // Slightly lighter teal for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E6FFDF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.8rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.2rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          padding: '8px 20px',
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: '#014A42',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#015D53',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#023B34',
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});

// Animation variants for elements
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Staggered icon animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// Card container animation
const cardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70
    }
  }
};

const VisionPage = () => {
  // Core values data - keeping original content
  const coreValues = [
    {
      id: 1,
      title: "Creative",
      description: "We approach every challenge with fresh perspectives and innovative thinking, constantly pushing boundaries to create unique solutions.",
      icon: <Lightbulb sx={{ color: '#fff', fontSize: 36 }} />,
      color: "#0A2725"
    },
    {
      id: 2,
      title: "Innovative",
      description: "Our team leverages cutting-edge technology and forward-thinking approaches to develop solutions that are ahead of the curve.",
      icon: <Rocket sx={{ color: '#fff', fontSize: 36 }} />,
      color: "#153F3D"
    },
    {
      id: 3,
      title: "Driven",
      description: "We're passionate about results and committed to excellence, constantly striving to exceed expectations and deliver exceptional value.",
      icon: <TrendingUp sx={{ color: '#fff', fontSize: 36 }} />,
      color: "#0D302E"
    },
  ];



  // Sample icons for the main feature card
  const integrationIcons = Array(7).fill(null).map((_, index) => ({
    id: index,
    icon: ['⚛️', '💻', '🚀', '🔍', '📊', '🌐', '📈'][index] || '✨'
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        bgcolor: 'background.default',
        height:'900px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <AnimatedBackground />

        {/* Hero Section - with animations */}
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'transparent',
            pt: 8,
            pb: 6,
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            {/* Title Section - sequentially animated */}
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.7 }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontSize: '0.8rem',
                    mb: 1
                  }}
                >
                  # Creative – Innovative – Driven
                </Typography>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    mb: 2,
                    color: '#FFFFFF',
                  }}
                >
                  Building the Future with Passion and Vision
                </Typography>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    maxWidth: 800,
                    mx: 'auto',
                    fontSize: '1rem'
                  }}
                >
                  Our startup thrives on creativity and dedication. Through innovative technology and human-centered design, we transform complex challenges into elegant solutions.
                </Typography>
              </motion.div>
            </Box>

            {/* Main Feature Card - with animation */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Card sx={{
                bgcolor: 'rgba(230, 255, 223, 0.9)', // Light mint green with opacity
                color: '#000',
                p: 4,
                mb: 5,
                border: 'none'
              }}>
                <Typography variant="h3" component="h3" sx={{ color: '#00332D', mb: 1 }}>
                  Our Core Values
                </Typography>
                <Typography variant="body1" sx={{ color: '#00332D', fontSize: '0.95rem', mb: 3 }}>
                  These principles guide everything we do, from product development to client interactions.
                </Typography>

                {/* Integration icons with staggered animation */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    {integrationIcons.map((icon) => (
                      <motion.div key={icon.id} variants={itemVariants}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1.5,
                            bgcolor: 'white',
                            borderRadius: 2,
                            width: 40,
                            height: 40
                          }}
                        >
                          <Typography sx={{ fontSize: '18px' }}>
                            {icon.icon}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: '#00332D',
                      borderColor: '#00332D',
                      borderRadius: 10,
                      px: 2,
                      py: 0.5,
                      fontSize: '0.85rem'
                    }}
                  >
                    Let's Create Together
                  </Button>
                </motion.div>
              </Card>
            </motion.div>

            {/* Three core values in a single row - with staggered animation */}
            <motion.div
              variants={cardsContainerVariants}
              initial="hidden"
              animate="visible"
              style={{ width: '100%' }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' }, 
                  gap: 3, 
                  mt: 2 
                }}
              >
                {coreValues.map((value, index) => (
                  <motion.div 
                    key={value.id} 
                    variants={cardVariants} 
                    custom={index}
                    style={{ flex: '1 1 0', minWidth: '30%' }}
                  >
                    <Card sx={{ 
                      height: '100%',
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 1,
                          bgcolor: 'rgba(255, 255, 255, 0.06)',
                          borderRadius: 2,
                          width: 40,
                          height: 40,
                          mb: 2
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Typography variant="h4" component="h4" sx={{ mb: 1, fontWeight: 500 }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                        {value.description}
                      </Typography>
                    </Card>
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

export default VisionPage;