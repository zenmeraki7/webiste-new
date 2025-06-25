import React, { useEffect, useRef, useState } from 'react';
import { 
    Box, 
    Button, 
    Container, 
    Typography, 
    ThemeProvider, 
    createTheme,
    IconButton,
    useMediaQuery as useMediaQueryOriginal
} from '@mui/material';
import { 
    ArrowForward,
    ArrowBackIos,
    ArrowForwardIos,
    PlayArrow,
    PauseCircle
} from '@mui/icons-material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
// Placeholder for video imports
import emailassis from "../../assets/images/emailassis.mp4";
import meta from "../../assets/images/meta.mp4";
import multi from "../../assets/images/multi.mp4";


// Create custom theme
const createCustomTheme = () => createTheme({
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
            fontSize: { xs: '2.5rem', md: '3.5rem' }, // Reduced on mobile
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 700,
            fontSize: { xs: '1.2rem', sm: '1.6rem', md: '2rem' }, // Reduced on mobile
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: { xs: '1rem', md: '1.4rem' }, // Reduced on mobile
            lineHeight: 1.4,
        },
        subtitle1: {
            fontSize: { xs: '1rem', md: '1.25rem' }, // Reduced on mobile
            lineHeight: 1.5,
        },
        body1: {
            fontSize: { xs: '0.8rem', md: '0.9rem' }, // Reduced on mobile
            lineHeight: 1.6,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    padding: { xs: '6px 12px', md: '8px 16px' }, // Reduced padding on mobile
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', md: '0.875rem' }, // Reduced font size on mobile
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

        // Particle settings (optimize for mobile)
        const isMobile = window.innerWidth <= 600;
        const numberOfParticles = isMobile ? 30 : 100; // Reduced particles on mobile
        const particleSize = isMobile ? 2 : 3;
        const particleSpeed = isMobile ? 0.3 : 0.5;

        const particlesArray = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * particleSize + 1;
                this.speedX = Math.random() * particleSpeed - (particleSpeed / 2);
                this.speedY = Math.random() * particleSpeed - (particleSpeed / 2);
                this.color = `rgba(10, 39, 37, ${Math.random() * 0.1 + 0.05})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

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

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            if (!isMobile) {
                connectParticles();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const connectParticles = () => {
            const maxDistance = isMobile ? 100 : 150; // Reduced connection distance on mobile
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



// Project data
const projects = [
    {
        id: 1,
        title: "MULTI-VENDOR",
        videoSrc: multi,
        description: "Our multi-vendor solution enables businesses to create their own marketplace with multiple sellers.",
        link: '/multivendor'
    },
    {
        id: 2,
        title: "METAMATRIX-BULK EDITOR",
        videoSrc: meta,
        description: "A powerful bulk editing tool designed for efficient data management and updates.",
        link: '/meta-matrix'
    },
    {
        id: 3,
        title: "E-MAIL ASSISTANT",
        videoSrc: emailassis,
        description: "Streamline your email workflow with our intelligent assistant for better communication.",
        link: '/email-assitant'
    }
];

// Animated section component
const AnimatedSection = ({ children, variants, delay = 0, threshold = 0.1 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        once: false, 
        amount: threshold,
        margin: "-100px 0px"
    });
    
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
};

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
};

const ProjectsPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPlaying, setIsPlaying] = useState({});
    const videoRefs = useRef([]);
    const theme = createCustomTheme(); // Initialize theme here

    // Use a more robust media query check
    const isMobile = useMediaQueryOriginal('(max-width:960px)');
    
    // Initialize video refs
    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, projects.length);
    }, []);

    const nextSlide = () => {
        if (videoRefs.current[currentIndex]) {
            videoRefs.current[currentIndex].pause();
        }
        
        setDirection(1);
        setCurrentIndex((prevIndex) => 
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
        
        setIsPlaying({});
    };
    
    const prevSlide = () => {
        if (videoRefs.current[currentIndex]) {
            videoRefs.current[currentIndex].pause();
        }
        
        setDirection(-1);
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
        
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

      const setVideoRef = (element, index) => {
        videoRefs.current[index] = element;
    };

    const Indicators = () => (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: { xs: 1, md: 2 } // Reduced margin-top on mobile
        }}>
            {projects.map((_, index) => (
                <Box
                    key={index}
                    component="button"
                    onClick={() => {
                        if (videoRefs.current[currentIndex]) {
                            videoRefs.current[currentIndex].pause();
                        }
                        
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                        
                        setIsPlaying({});
                    }}
                    sx={{
                        width: { xs: 8, md: 10 }, // Reduced size on mobile
                        height: { xs: 8, md: 10 },
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
                        bgcolor: 'rgb(255, 255, 255)',
                        paddingTop: { xs: 0, md: 1 }, // Reduced padding
                        paddingBottom: { xs: 0, md: 1 },
                        zIndex: 1,
                    }}
                >
                    <Container maxWidth={isMobile ? 'sm' : 'lg'}>
                        <AnimatedSection variants={fadeIn}>
                            <Typography 
                                variant="h1" 
                                component="h1" 
                                align="center"
                                sx={{ 
                                    marginBottom: { xs: 0.5, md:1  }, // Reduced margin
                                    paddingTop: { xs: 3, md: 2 },
                                    paddingBottom: {xs: 0.5, md: 1},
                                    backgroundImage: 'linear-gradient(135deg, #0A2725 0%, #245F5C 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: '#0A2725',
                                    fontSize: isMobile ? '2.5rem' : '3.5rem'
                                }}
                            >
                                Explore Our Projects
                            </Typography>
                        </AnimatedSection>
                        
                        <AnimatedSection variants={fadeInUp} delay={0.2}>
                            <Typography 
                                variant="subtitle1" 
                                color="text.secondary" 
                                align="center" 
                                sx={{ 
                                    marginBottom: { xs: 1, md: 2 }, // Reduced margin
                                    maxWidth: { xs: '90%', md: 700 }, // Adjusted max-width for mobile
                                    mx: 'auto',
                                    fontSize: isMobile? '0.9rem' : '1rem'
                                }}
                            >
                                Explore our portfolio of innovative solutions that we've developed for our clients.
                                Each project showcases our expertise in creating impactful digital experiences.
                            </Typography>
                        </AnimatedSection>
                    </Container>
                </Box>
                
                {/* Project Carousel */}
                <Container 
                    maxWidth={isMobile ? "sm" : "lg"} 
                    sx={{ 
                        marginTop: { xs: 2, md: 4 }, // Reduced margin-top
                        marginBottom: { xs: 4, md: 8 }, // Reduced margin-bottom
                        position: 'relative', 
                        zIndex: 1,
                    }}
                >
                    <AnimatedSection variants={fadeIn} threshold={0.3}>
                        <Box 
                            sx={{ 
                                position: 'relative',
                                height: { xs: '300px', sm: '400px', md: '500px' }, // Reduced height on mobile
                                overflow: 'hidden',
                                borderRadius: 4,
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)', // Reduced shadow
                                bgcolor: '#000',
                            }}
                        >
                            {/* Navigation Arrows */}
                            <IconButton 
                                onClick={prevSlide}
                                sx={{ 
                                    position: 'absolute', 
                                    left: { xs: 5, md: 10 }, // Reduced left position
                                    top: '50%', 
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
                                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                                    color: 'white',
                                    fontSize: { xs: '0.8rem', md: '1rem' }, // Reduced font size
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.25)',
                                    }
                                }}
                                aria-label="previous project"
                            >
                                <ArrowBackIos fontSize="inherit" />
                            </IconButton>
                            
                            <IconButton 
                                onClick={nextSlide}
                                sx={{ 
                                    position: 'absolute', 
                                    right: { xs: 5, md: 10 }, // Reduced right position
                                    top: '50%', 
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
                                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                                    color: 'white',
                                    fontSize: { xs: '0.8rem', md: '1rem' }, // Reduced font size
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.25)',
                                    }
                                }}
                                aria-label="next project"
                            >
                                <ArrowForwardIos fontSize="inherit" />
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
                                        height: '100%',
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
                                        <Box
                                            component="video"
                                            ref={(el) => setVideoRef(el, currentIndex)}
                                            src={projects[currentIndex].videoSrc}
                                            poster=""
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
                                                    width: { xs: 40, md: 60 }, // Reduced size on mobile
                                                    height: { xs: 40, md: 60 },
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
                                                    <PauseCircle sx={{ color: 'white', fontSize: { xs: 20, md: 30 } }} /> // Reduced size
                                                ) : (
                                                    <PlayArrow sx={{ color: 'white', fontSize: { xs: 20, md: 30 } }} />
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
                                            padding: { xs: 1, md: 2 }, // Reduced padding
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)'
                                        }}
                                    >
                                        <Typography 
                                            variant="h2" 
                                            component="h2"
                                            sx={{ 
                                                marginBottom: { xs: 0.5, md: 1 }, // Reduced margin
                                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                                fontSize: { xs: '1.2rem', sm: '1.6rem', md: '2rem' } // Reduced font size
                                            }}
                                        >
                                            {projects[currentIndex].title}
                                        </Typography>
                                        
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                marginBottom: { xs: 1, md: 2 }, // Reduced margin
                                                maxWidth: { xs: '90%', sm: '90%', md: 700 }, // Adjusted max-width
                                                mx: 'auto',
                                                opacity: 0.9,
                                                fontSize: { xs: '0.7rem', md: '0.8rem' } // Reduced font size
                                            }}
                                        >
                                            {projects[currentIndex].description}
                                        </Typography>
                                        
                                        <Button
                                            variant="contained"
                                            href={projects[currentIndex].link}
                                            color="primary"
                                            endIcon={<ArrowForward />}
                                            sx={{
                                                paddingX: { xs: 1.5, md: 2 }, // Reduced horizontal padding
                                                paddingY: { xs: 0.5, md: 0.8 }, // Reduced vertical padding
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
                        
                        <Indicators />
                    </AnimatedSection>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ProjectsPage;

