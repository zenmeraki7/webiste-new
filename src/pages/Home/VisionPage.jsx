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
  useMediaQuery
} from '@mui/material';
import {
  Lightbulb,
  Rocket,
  TrendingUp
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';

// Animated Particles Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

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
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
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
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
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

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#00332D',
    },
    secondary: {
      main: '#E6FFDF',
    },
    background: {
      default: '#00332D',
      paper: '#023B34',
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
      '@media (max-width:600px)': {
        fontSize: '2.2rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.7rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.3rem',
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.2rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    subtitle1: {
      fontSize: '1.1rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
        lineHeight: 1.4,
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '0.85rem',
        lineHeight: 1.5,
      },
    },
    subtitle2: {
      fontSize: '0.8rem',
      lineHeight: 1.5,
      letterSpacing: 1,
      textTransform: 'uppercase',
      '@media (max-width:600px)': {
        fontSize: '0.7rem',
      },
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
          '@media (max-width:600px)': {
            padding: '6px 16px',
            fontSize: '0.9rem',
          },
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
          '@media (max-width:600px)': {
            padding: 16,
            marginBottom: 24,
            borderRadius: 12,
          },
        },
      },
    },
  },
});

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

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
      type: 'spring',
      stiffness: 100
    }
  }
};

// AnimatedSection component
const AnimatedSection = ({ children, variants, threshold = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: threshold, margin: '-100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const VisionPage = () => {
  // Detect mobile screen using useMediaQuery
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Refs for scroll animations
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featureCardRef = useRef(null);

  // Check if elements are in viewport
  const subtitleInView = useInView(subtitleRef, { once: false, amount: 0.5 });
  const titleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const descriptionInView = useInView(descriptionRef, { once: false, amount: 0.5 });
  const featureCardInView = useInView(featureCardRef, { once: false, amount: 0.3 });

  // Integration icons
  const integrationIcons = Array(7).fill(null).map((_, index) => ({
    id: index,
    icon: ['⚛️', '💻', '🚀', '🔍', '📊', '🌐', '📈'][index] || '✨'
  }));

  // Additional sections
  const additionalSections = [
    {
      id: 1,
      title: 'Creative',
      description: 'We approach every challenge with fresh perspectives and innovative thinking, constantly pushing boundaries to create unique solutions.',
      icon: <Lightbulb sx={{ color: '#fff', fontSize: isMobile ? 28 : 36 }} />,
    },
    {
      id: 2,
      title: 'Innovative',
      description: 'Our team leverages cutting-edge technology and forward-thinking approaches to develop solutions that are ahead of the curve.',
      icon: <Rocket sx={{ color: '#fff', fontSize: isMobile ? 28 : 36 }} />,
    },
    {
      id: 3,
      title: 'Driven',
      description: 'We’re passionate about results and committed to excellence, constantly striving to exceed expectations and deliver exceptional value.',
      icon: <TrendingUp sx={{ color: '#fff', fontSize: isMobile ? 28 : 36 }} />,
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

        <Box
          sx={{
            position: 'relative',
            bgcolor: 'transparent',
            pt: isMobile ? 6 : 8,
            pb: isMobile ? 4 : 6,
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', mb: isMobile ? 3 : 5 }}>
              <motion.div
                ref={subtitleRef}
                initial="hidden"
                animate={subtitleInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
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
                ref={titleRef}
                initial="hidden"
                animate={titleInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
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
                ref={descriptionRef}
                initial="hidden"
                animate={descriptionInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    maxWidth: 800,
                    mx: 'auto',
                  }}
                >
                  Our startup thrives on creativity and dedication. Through innovative technology and human-centered design, we transform complex challenges into elegant solutions.
                </Typography>
              </motion.div>
            </Box>

            {/* Main Feature Card */}
            <motion.div
              ref={featureCardRef}
              initial="hidden"
              animate={featureCardInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <Card sx={{
                bgcolor: 'rgba(230, 255, 223, 0.9)',
                color: '#000',
                p: isMobile ? 3 : 4,
                mb: isMobile ? 3 : 5,
                border: 'none'
              }}>
                <Typography variant="h3" component="h3" sx={{ color: '#00332D', mb: 1 }}>
                  Our Core Values
                </Typography>
                <Typography variant="body1" sx={{ color: '#00332D', fontSize: '0.95rem', mb: 3 }}>
                  These principles guide everything we do, from product development to client interactions.
                </Typography>

                <AnimatedSection variants={containerVariants} threshold={0.6}>
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
                            width: isMobile ? 32 : 40,
                            height: isMobile ? 32 : 40
                          }}
                        >
                          <Typography sx={{ fontSize: isMobile ? '16px' : '18px' }}>
                            {icon.icon}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </AnimatedSection>

                <AnimatedSection variants={fadeInUp} delay={0.3} threshold={0.6}>
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
                     onClick={() => window.location.href = '/contact'}
                  >
                    Let's Create Together
                  </Button>
                </AnimatedSection>
              </Card>
            </motion.div>

            {/* Additional Sections (Conditionally Rendered) */}
            <Box sx={{ mt: 2, mb: isMobile ? 4 : 8 }}>
              <Box sx={{ mt: 6 }}>
                {!isMobile && additionalSections.map((section, index) => (
                  <AnimatedSection key={section.id} variants={fadeInUp} threshold={0.3}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        mb: 8,
                        gap: 4
                      }}
                    >{index % 2 === 0 ? (
                      <>
                        <Box sx={{ flex: 1 }}>
                          <Card sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
                                  mr: 2
                                }}
                              >
                                {section.icon}
                              </Box>
                              <Typography variant="h3">{section.title}</Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary">
                              {section.description}
                            </Typography>
                          </Card>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                          <Card
                            sx={{
                              width: 280,
                              height: 280,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'rgba(255, 255, 255, 0.03)'
                            }}
                          >
                            <Typography variant="h1" sx={{ opacity: 0.6, fontSize: '4rem' }}>
                              {index + 1}
                            </Typography>
                          </Card>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                          <Card
                            sx={{
                              width: 280,
                              height: 280,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'rgba(255, 255, 255, 0.03)'
                            }}
                          >
                            <Typography variant="h1" sx={{ opacity: 0.6, fontSize: '4rem' }}>
                              {index + 1}
                            </Typography>
                          </Card>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Card sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
                                  mr: 2
                                }}
                              >
                                {section.icon}
                              </Box>
                              <Typography variant="h3">{section.title}</Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary">
                              {section.description}
                            </Typography>
                          </Card>
                        </Box>
                      </>
                    )}
                  </Box>
                </AnimatedSection>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  </ThemeProvider>
);
};

export default VisionPage;