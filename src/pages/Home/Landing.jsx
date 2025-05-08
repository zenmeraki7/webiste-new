import React, { useEffect, useRef } from 'react';
import {
    AppBar, Toolbar, Typography, Button, Container, Box,
    useTheme
} from '@mui/material';
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

        // Particle settings (reduce particles for mobile)
        const isMobile = window.innerWidth <= 600;
        const numberOfParticles = isMobile ? 50 : 100; // Fewer particles on mobile

        const particlesArray = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(150, 120, 110, ${Math.random() * 0.1 + 0.05})`;
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

            // Optional: Connect particles with lines (skip on mobile for performance)
            if (!isMobile) {
                connectParticles();
            }

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
                        ctx.strokeStyle = `rgba(150, 120, 110, ${0.05 - (distance / maxDistance) * 0.05})`;
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

const Landing = () => {
    const theme = useTheme();

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };

    const slideUp = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <Box sx={{
            minHeight: { xs: '100vh', md: '600px' }, // Full height on mobile, fixed on desktop
            bgcolor: '#EFF9F9',
            color: '#0A2725',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Hero Section */}
            <Container
                component={motion.div}
                initial="hidden"
                animate="visible"
                maxWidth="lg"
                sx={{
                    my: { xs: 4, md: 8 }, // Reduced margin on mobile
                    px: { xs: 2, md: 3 }, // Responsive padding
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {/* Tag Line */}
                <Box component={motion.div} variants={fadeIn} sx={{ mb: 2 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            fontSize: { xs: '0.7rem', md: '0.875rem' },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Box component="span" sx={{ mr: 1 }}>◆</Box> INNOVATIVE AND TRANSFORMATIVE
                    </Typography>
                </Box>

                {/* Main Heading */}
                <Box component={motion.div} variants={slideUp} sx={{ mb: 4 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            lineHeight: 1.2,
                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } // Responsive font size
                        }}
                    >
                        Innovating Beyond<br />Boundaries
                    </Typography>
                </Box>

                {/* Description */}
                <Box component={motion.div} variants={slideUp} sx={{ mb: 1, maxWidth: 'md' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'normal',
                            fontSize: { xs: '1rem', md: '1.25rem' } // Smaller font on mobile
                        }}
                    >
                        We specialize in transforming ideas into impactful solutions.
                        From cutting-edge applications to intuitive designs, our work reflects a commitment to excellence and a passion for innovation.
                        Every project we undertake is a testament to our expertise and dedication to empowering businesses for success.
                    </Typography>
                </Box>
                <Box component={motion.div} variants={slideUp} sx={{ mb: 4, maxWidth: 'md' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'normal',
                            fontSize: { xs: '1rem', md: '1.25rem' }
                        }}
                    >
                        Explore our portfolio and discover how we can bring your vision to life.
                    </Typography>
                </Box>

                {/* CTA buttons */}
                <Box
                    component={motion.div}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                        width: '100%',
                        maxWidth: '600px', // Add a max width if needed
                        margin: '0 auto'
                    }}
                >
                    <Button
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variant="contained"
                        sx={{
                            bgcolor: '#0A2725',
                            color: 'white',
                            borderRadius: 5,
                            px: { xs: 2, md: 3 },
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 'medium',
                            boxShadow: '0px 4px 12px rgba(10, 39, 37, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&:hover': {
                                bgcolor: '#0D302E',
                            },
                            flex: '1', // Allow buttons to take up equal space
                            minWidth: '150px' // Ensure buttons have a minimum width

                        }}
                        onClick={() => window.location.href = '/about-us'}
                    >
                        Learn More
                    </Button>
                    <Button
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variant="contained"
                        sx={{
                            bgcolor: '#0A2725',
                            color: 'white',
                            borderRadius: 5,
                            px: { xs: 2, md: 3 },
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 'medium',
                            boxShadow: '0px 4px 12px rgba(10, 39, 37, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&:hover': {
                                bgcolor: '#0D302E',
                            },
                            flex: '1',
                            minWidth: '150px'
                        }}
                        onClick={() => window.scrollTo({ top: document.getElementById('projects').offsetTop, behavior: 'smooth' })}
                    >
                        Our Projects
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Landing;

