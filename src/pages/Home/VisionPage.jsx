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

// Create custom theme
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
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.25rem',
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

const VisionPage = () => {
  // Core values data
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

  // Key capabilities data
  const capabilities = [
    {
      id: 1,
      title: "Technology Expertise",
      description: "Our team masters the latest technologies to build robust, scalable, and future-proof solutions.",
      icon: <Code sx={{ fontSize: 40 }} />,
    },
    {
      id: 2,
      title: "Human-Centered Design",
      description: "We create intuitive experiences that delight users by putting people at the center of every design decision.",
      icon: <Psychology sx={{ fontSize: 40 }} />,
    },
    {
      id: 3,
      title: "Collaborative Approach",
      description: "We work closely with our clients, forming partnerships that transform ideas into impactful realities.",
      icon: <People sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh', 
        position: 'relative',
        overflow: 'hidden',
      }}>
        <AnimatedBackground />
        
        {/* Hero Section */}
        <Box 
          sx={{ 
            position: 'relative',
            bgcolor: 'rgba(239, 249, 249, 0.7)',
            pt: 12,
            pb: 10,
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Typography 
                      variant="h4" 
                      component="div" 
                      sx={{ 
                        color: '#0A2725', 
                        mb: 1,
                        fontWeight: 600,
                      }}
                    >
                      Creative – Innovative – Driven
                    </Typography>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <Typography 
                      variant="h1" 
                      component="h1" 
                      sx={{ 
                        mb: 3,
                        backgroundImage: 'linear-gradient(135deg, #0A2725 0%, #245F5C 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: '#0A2725',
                      }}
                    >
                      Building the Future with Passion and Vision
                    </Typography>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <Typography 
                      variant="subtitle1" 
                      color="text.secondary" 
                      sx={{ mb: 4, maxWidth: 600 }}
                    >
                      Our startup thrives on creativity and dedication. Through innovative technology and human-centered design, we transform complex challenges into elegant solutions.
                    </Typography>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="large"
                      component={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Let's Create Together
                    </Button>
                  </motion.div>
                </Box>
              </Grid>
              
    
            </Grid>
          </Container>
        </Box>
        
        {/* Core Values Section */}
        <Container maxWidth="lg" sx={{ mt: 2, mb: 12, position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Typography variant="h2" component="h2" align="center" sx={{ mb: 2 }}>
              Our Core Values
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              align="center" 
              sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
            >
              These principles guide everything we do, from product development to client interactions.
            </Typography>
          </motion.div>
          
          <Box sx={{ display: 'flex', gap: 4, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            {coreValues.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 50,
                  damping: 10
                }}
                viewport={{ once: true, amount: 0.2 }}
                style={{ flex: '1 1 calc(33.33% - 16px)', width: '100%', display: 'flex' }}
              >
                <Card sx={{ width: '100%' }}>
                  <Box sx={{ bgcolor: value.color, p: 4 }}>
                    <Box 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      {value.icon}
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h3" component="h3" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
        
        {/* About Section */}
        <Box sx={{ 
          bgcolor: 'background.paper',
          py: 10, 
          position: 'relative',
          zIndex: 1,
        }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: '#0A2725',
                      p: 6,
                      borderRadius: 4,
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography variant="h3" component="h3" sx={{ mb: 3, position: 'relative', zIndex: 2 }}>
                      Our team of passionate experts combines cutting-edge technology with creative thinking
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, position: 'relative', zIndex: 2 }}>
                      We develop products that matter. Let's create something extraordinary together.
                    </Typography>
                    
                    {/* Abstract decoration */}
                    <Box sx={{
                      position: 'absolute',
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      bottom: -80,
                      right: -80,
                      zIndex: 1,
                    }} />
                    
                    <Box sx={{
                      position: 'absolute',
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      top: 20,
                      left: -30,
                      zIndex: 1,
                    }} />
                  </Box>
                </motion.div>
              </Grid>
              
              
            </Grid>
          </Container>
        </Box>
        
        
      </Box>
    </ThemeProvider>
  );
};

export default VisionPage;