import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  ThemeProvider, 
  createTheme,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowForward,
  ArrowBackIos,
  ArrowForwardIos,
  PlayArrow,
  PauseCircle
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
// Import videos correctly - these are the direct imports
import emailassis from "../../assets/images/emailassis.mp4";
import meta from "../../assets/images/meta.mp4";
import multi from "../../assets/images/multi.mp4";

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
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
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
  },
});

// Project data - FIXED to use direct video references
const projects = [
  {
    id: 1,
    title: "MULTI-VENDOR",
    videoSrc: multi, // Direct reference to the imported video
    description: "Our multi-vendor solution enables businesses to create their own marketplace with multiple sellers."
  },
  {
    id: 2,
    title: "METAMATRIX-BULK EDITOR",
    videoSrc: meta, // Direct reference to the imported video
    description: "A powerful bulk editing tool designed for efficient data management and updates."
  },
  {
    id: 3,
    title: "E-MAIL ASSISTANT",
    videoSrc: emailassis, // Direct reference to the imported video
    description: "Streamline your email workflow with our intelligent assistant for better communication."
  }
];

const ProjectsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, projects.length);
  }, []);

  const nextSlide = () => {
    // Pause current video
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].pause();
    }
    
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
    
    // Reset playing state for all videos
    setIsPlaying({});
  };
  
  const prevSlide = () => {
    // Pause current video
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].pause();
    }
    
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
    
    // Reset playing state for all videos
    setIsPlaying({});
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const handlePlayVideo = (index) => {
    if (videoRefs.current[index]) {
      if (isPlaying[index]) {
        videoRefs.current[index].pause();
        setIsPlaying(prev => ({...prev, [index]: false}));
      } else {
        videoRefs.current[index].play();
        setIsPlaying(prev => ({...prev, [index]: true}));
      }
    }
  };

  // Handle storing references to videos
  const setVideoRef = (element, index) => {
    videoRefs.current[index] = element;
  };

  // Indicators with active state
  const Indicators = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      {projects.map((_, index) => (
        <Box
          key={index}
          component="button"
          onClick={() => {
            // Pause current video
            if (videoRefs.current[currentIndex]) {
              videoRefs.current[currentIndex].pause();
            }
            
            setDirection(index > currentIndex ? 1 : -1);
            setCurrentIndex(index);
            
            // Reset playing state
            setIsPlaying({});
          }}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            mx: 0.5,
            border: 'none',
            backgroundColor: index === currentIndex ? 'primary.main' : 'rgba(10, 39, 37, 0.2)',
            transition: 'all 0.3s',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: index === currentIndex ? 'primary.main' : 'rgba(10, 39, 37, 0.4)',
            }
          }}
        />
      ))}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <AnimatedBackground />
        
        {/* Hero Section */}
        <Box 
          sx={{ 
            position: 'relative',
            bgcolor: 'rgba(239, 249, 249, 0.7)',
            pt: 12,
            pb: 8,
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography 
                variant="h1" 
                component="h1" 
                align="center"
                sx={{ 
                  mb: 2,
                  backgroundImage: 'linear-gradient(135deg, #0A2725 0%, #245F5C 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: '#0A2725',
                }}
              >
                Our Projects
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                align="center" 
                sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}
              >
                Explore our portfolio of innovative solutions that we've developed for our clients.
                Each project showcases our expertise in creating impactful digital experiences.
              </Typography>
            </motion.div>
          </Container>
        </Box>
        
        {/* Project Carousel */}
        <Container 
          maxWidth={isMobile ? "sm" : "lg"} 
          sx={{ 
            mt: 8, 
            mb: 12, 
            position: 'relative', 
            zIndex: 1 ,
            
          }}
        >
          <Box 
            sx={{ 
              position: 'relative',
              height: {xs: 500, md: 600},
              overflow: 'hidden',
              borderRadius: 4,
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12)',
              bgcolor: '#000',
            }}
          >
            {/* Navigation Arrows */}
            <IconButton 
              onClick={prevSlide}
              sx={{ 
                position: 'absolute', 
                left: 20, 
                top: '50%', 
                transform: 'translateY(-50%)',
                zIndex: 10,
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                }
              }}
              aria-label="previous project"
            >
              <ArrowBackIos />
            </IconButton>
            
            <IconButton 
              onClick={nextSlide}
              sx={{ 
                position: 'absolute', 
                right: 20, 
                top: '50%', 
                transform: 'translateY(-50%)',
                zIndex: 10,
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                }
              }}
              aria-label="next project"
            >
              <ArrowForwardIos />
            </IconButton>
            
            {/* Carousel Slides */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '600px',
                }}
              >
                {/* Video Background */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    bgcolor: '#000',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)',
                      zIndex: 1
                    }
                  }}
                >
                  {/* Proper video element */}
                  <Box
                    component="video"
                    ref={(el) => setVideoRef(el, currentIndex)}
                    src={projects[currentIndex].videoSrc}
                    poster="" // You can add poster image if needed
                    loop
                    muted
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Play/Pause Button */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      cursor: 'pointer',
                      opacity: isPlaying[currentIndex] ? 0 : 1,
                      transition: 'opacity 0.3s',
                      '&:hover': {
                        opacity: 1
                      }
                    }}
                    onClick={() => handlePlayVideo(currentIndex)}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'rgba(10, 39, 37, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s',
                        '&:hover': {
                          bgcolor: 'rgba(10, 39, 37, 0.9)',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      {isPlaying[currentIndex] ? (
                        <PauseCircle sx={{ color: 'white', fontSize: 40 }} />
                      ) : (
                        <PlayArrow sx={{ color: 'white', fontSize: 40 }} />
                      )}
                    </Box>
                  </Box>
                </Box>
                
                {/* Caption */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    zIndex: 2,
                    p: 4,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)'
                  }}
                >
                  <Typography 
                    variant="h2" 
                    component="h2"
                    sx={{ 
                      mb: 2,
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    {projects[currentIndex].title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      maxWidth: 700,
                      mx: 'auto',
                      opacity: 0.9
                    }}
                  >
                    {projects[currentIndex].description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 3,
                      py: 1.2,
                      bgcolor: 'rgba(10, 39, 37, 0.9)',
                      '&:hover': {
                        bgcolor: 'rgba(10, 39, 37, 1)'
                      }
                    }}
                  >
                    View Project
                  </Button>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
          
          {/* Indicators */}
          <Indicators />
         
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ProjectsPage;