import React, { useEffect, useRef } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Container,
    Paper,
    Typography,
    ThemeProvider,
    createTheme
} from '@mui/material';
import {
    ShoppingBag,
    Code,
    Settings,
    Language,
    Wifi,
    BarChart,
    ArrowForward,
    BoltOutlined,
    AccessTime,
    Dashboard
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
            main: '#0A2725', // Deep teal color
        },
        secondary: {
            main: '#EFF9F9', // Light teal background
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
            fontSize: '3rem',
            '@media (min-width:600px)': {
                fontSize: '3.5rem',
            },
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    padding: '8px 16px',
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#0D3635',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
    },
});

const ServicesPage = () => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };

    const slideUp = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    const staggeredCards = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardAnimation = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    // Services data with icons
    const services = [
        {
            id: 1,
            title: "Shopify App Development",
            description: "Custom Shopify applications that extend your store's functionality and improve customer experience.",
            icon: <ShoppingBag sx={{ color: '#fff', fontSize: 36 }} />,
        },
        {
            id: 2,
            title: "Custom Shopify App Development",
            description: "Tailored applications built specifically for your unique business needs and workflows.",
            icon: <Code sx={{ color: '#fff', fontSize: 36 }} />,
        },
        {
            id: 3,
            title: "Custom App Development",
            description: "Powerful, scalable applications designed and built from the ground up for web, mobile or desktop.",
            icon: <Settings sx={{ color: '#fff', fontSize: 36 }} />,
        },
        {
            id: 4,
            title: "Website Development",
            description: "Responsive, user-friendly websites optimized for performance, SEO, and conversion.",
            icon: <Language sx={{ color: '#fff', fontSize: 36 }} />,
        },
        {
            id: 5,
            title: "Digital Marketing",
            description: "Strategic marketing campaigns to drive traffic, increase engagement, and boost conversions.",
            icon: <Wifi sx={{ color: '#fff', fontSize: 36 }} />,
        },
        {
            id: 6,
            title: "E-Commerce Account Management",
            description: "End-to-end management of your e-commerce operations, inventory, and customer relationships.",
            icon: <BarChart sx={{ color: '#fff', fontSize: 36 }} />,
        },
    ];

    // Why Choose Us data
    const benefits = [
        {
            id: 1,
            title: "Shopify Expertise",
            description: "Specialized knowledge and extensive experience in developing high-quality Shopify applications and stores.",
            icon: <ShoppingBag sx={{ color: '#fff', fontSize: 24 }} />,
            animation: "fade-right"
        },
        {
            id: 2,
            title: "Passion-Driven Solutions",
            description: "We approach every project with enthusiasm and dedication, ensuring creative solutions that exceed expectations.",
            icon: <BoltOutlined sx={{ color: '#fff', fontSize: 24 }} />,
            animation: "zoom"
        },
        {
            id: 3,
            title: "Growth-Oriented",
            description: "Our strategies and solutions are designed with scalability in mind, helping your business achieve sustainable growth.",
            icon: <BarChart sx={{ color: '#fff', fontSize: 24 }} />,
            animation: "fade-left"
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
                <AnimatedBackground />

                {/* Hero Section */}
                <Container
                    maxWidth="lg"
                    sx={{
                        textAlign: 'center',
                        pt: 10,
                        pb: 8,
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Chip
                            label="SMART + FAST"
                            color="primary"
                            variant="outlined"
                            sx={{
                                mb: 3,
                                px: 1.5,
                                bgcolor: 'rgba(10, 39, 37, 0.08)',
                                fontWeight: 600,
                                borderColor: 'transparent'
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Typography variant="h1" component="h1" color="text.primary" sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}>
                            Welcome to Our Services
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                mb: 6,
                                maxWidth: 550,
                                mx: 'auto',
                                fontSize: '1.125rem'
                            }}
                        >
                            Explore our expertise in web development, offering cutting-edge solutions to bring your ideas to life.            </Typography>
                    </motion.div>
                </Container>

                {/* Services Section */}
                <Container maxWidth="lg" sx={{ mb: 8, position: 'relative', zIndex: 1 }}>
                    <motion.div
                        variants={staggeredCards}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                                {services.slice(0, 3).map((service, index) => (
                                    <motion.div
                                        key={service.id}
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 80,
                                                damping: 12,
                                                delay: index * 0.2
                                            }
                                        }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        style={{ flex: '1 1 calc(33.33% - 16px)', width: '100%', display: 'flex' }}
                                    >
                                        <Card
                                            sx={{
                                                bgcolor: '#0A2725',
                                                color: 'white',
                                                minHeight: 280,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: '100%'
                                            }}
                                        >
                                            <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                                <Box sx={{ mb: 2 }}>
                                                    {service.icon}
                                                </Box>
                                                <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                                                    {service.title}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.85)' }}>
                                                    {service.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ px: 4, pb: 3 }}>
                                                <Button
                                                    endIcon={<ArrowForward />}
                                                    sx={{
                                                        color: 'white',
                                                        p: 0,
                                                        '&:hover': {
                                                            bgcolor: 'transparent',
                                                            '& .MuiSvgIcon-root': {
                                                                transform: 'translateX(4px)',
                                                            },
                                                        },
                                                        '& .MuiSvgIcon-root': {
                                                            transition: 'transform 0.2s',
                                                        },
                                                    }}
                                                >
                                                    Explore
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </motion.div>
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                                {services.slice(3, 6).map((service, index) => (
                                    <motion.div
                                        key={service.id}
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 80,
                                                damping: 12,
                                                delay: index * 0.2
                                            }
                                        }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        style={{ flex: '1 1 calc(33.33% - 16px)', width: '100%', display: 'flex' }}
                                    >
                                        <Card
                                            sx={{
                                                bgcolor: '#0A2725',
                                                color: 'white',
                                                minHeight: 280,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: '100%'
                                            }}
                                        >
                                            <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                                <Box sx={{ mb: 2 }}>
                                                    {service.icon}
                                                </Box>
                                                <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                                                    {service.title}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.85)' }}>
                                                    {service.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ px: 4, pb: 3 }}>
                                                <Button
                                                    endIcon={<ArrowForward />}
                                                    sx={{
                                                        color: 'white',
                                                        p: 0,
                                                        '&:hover': {
                                                            bgcolor: 'transparent',
                                                            '& .MuiSvgIcon-root': {
                                                                transform: 'translateX(4px)',
                                                            },
                                                        },
                                                        '& .MuiSvgIcon-root': {
                                                            transition: 'transform 0.2s',
                                                        },
                                                    }}
                                                >
                                                    Explore
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </motion.div>
                                ))}
                            </Box>
                        </Box>
                    </motion.div>
                </Container>

                {/* Why Choose Us Section */}
                <Box sx={{ bgcolor: 'white', py: 8, position: 'relative', zIndex: 1 }}>
                    <Container maxWidth="lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <Typography variant="h2" component="h2" align="center" color="text.primary" sx={{ mb: 6 }}>
                                Why Choose Us
                            </Typography>
                        </motion.div>

                        <motion.div
                            variants={staggeredCards}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={benefit.id}
                                        variants={cardAnimation}
                                        custom={index}
                                        style={{ flex: '1 1 calc(33.33% - 16px)', width: '100%', display: 'flex' }}
                                    >
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                p: 3,
                                                borderRadius: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                minHeight: 220,
                                                width: '100%'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    borderRadius: '50%',
                                                    width: 48,
                                                    height: 48,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mb: 2
                                                }}
                                            >
                                                {benefit.icon}
                                            </Box>
                                            <Typography variant="h3" component="h3" color="text.primary" gutterBottom>
                                                {benefit.title}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {benefit.description}
                                            </Typography>
                                        </Paper>
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

export default ServicesPage;