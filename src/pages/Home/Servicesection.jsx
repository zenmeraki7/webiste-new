
import React, { useEffect, useRef } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
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
    ArrowForward
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
        const numberOfParticles = window.innerWidth < 600 ? 50 : 100; // Fewer particles on mobile

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * (window.innerWidth < 600 ? 2 : 3) + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(10, 39, 37, ${Math.random() * 0.1 + 0.05})`;
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
            const maxDistance = window.innerWidth < 600 ? 100 : 150;
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

// Create custom theme with responsive typography
const theme = createTheme({
    palette: {
        primary: { main: '#38B2AC' },
        secondary: { main: '#EFF9F9' },
        text: { primary: '#2D3748', secondary: '#4A5568' },
        background: { default: '#f5f7fa', paper: '#ffffff' }
    },
    typography: {
        fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        h1: {
            fontWeight: 600,
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
            color: '#2D3748'
        },
        h2: {
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
            color: '#2D3748'
        },
        h3: {
            fontWeight: 600,
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.3rem' },
            color: '#2D3748',
            lineHeight: 1.3
        },
        body1: {
            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
            color: '#4A5568'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden'
                }
            }
        }
    }
});

// Animation component with unique effects
const AnimatedCard = ({ children, delay, animationType, duration = 0.7 }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const animations = {
        fadeUp: {
            hidden: { y: 50, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: { duration, delay, ease: "easeOut" }
            }
        },
        slideRight: {
            hidden: { x: -70, opacity: 0 },
            visible: {
                x: 0,
                opacity: 1,
                transition: { duration, delay, type: "spring", stiffness: 100, damping: 12 }
            }
        },
        slideLeft: {
            hidden: { x: 70, opacity: 0 },
            visible: {
                x: 0,
                opacity: 1,
                transition: { duration, delay, type: "spring", stiffness: 100, damping: 12 }
            }
        },
        zoomIn: {
            hidden: { scale: 0.8, opacity: 0 },
            visible: {
                scale: 1,
                opacity: 1,
                transition: { duration, delay, type: "spring", stiffness: 200 }
            }
        },
        flip: {
            hidden: { rotateY: 90, opacity: 0 },
            visible: {
                rotateY: 0,
                opacity: 1,
                transition: { duration, delay }
            }
        },
        rise: {
            hidden: { y: 100, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: { duration, delay, type: "spring", stiffness: 50, damping: 15 }
            }
        }
    };

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animations[animationType]}
            style={{ height: '100%', display: 'flex' }}
        >
            {children}
        </motion.div>
    );
};

const ServicesPage = () => {
    const services = [
        {
            id: 1,
            title: "Shopify App Development",
            description: "Custom Shopify applications that extend your store's functionality and improve customer experience.",
            icon: <ShoppingBag sx={{ color: '#fff', fontSize: 36 }} />,
            image: "https://www.strivemindz.com/images/offerings/mobile/shopify-app-development.jpg",
            animation: "fadeUp"
        },
        {
            id: 2,
            title: "Custom Shopify App Development",
            description: "Tailored applications built specifically for your unique business needs and workflows.",
            icon: <Code sx={{ color: '#fff', fontSize: 36 }} />,
            image: "https://ecommerce.folio3.com/blog/wp-content/uploads/2023/05/Shopify-Custom-Apps-vs-Private-Apps.jpg",
            animation: "slideRight"
        },
        {
            id: 3,
            title: "Custom App Development",
            description: "Powerful, scalable applications designed and built from the ground up for web, mobile or desktop.",
            icon: <Settings sx={{ color: '#fff', fontSize: 36 }} />,
            image: "https://www.growingprotechnologies.com/wp-content/uploads/2024/11/Elevate-Your-Business-with-Custom-App-Development-Services.webp",
            animation: "zoomIn"
        },
        {
            id: 4,
            title: "Website Development",
            description: "Responsive, user-friendly websites optimized for performance, SEO, and conversion.",
            icon: <Language sx={{ color: '#fff', fontSize: 36 }} />,
            image: "https://cdn.prod.website-files.com/678a08d17a6b88bae4e2d8ee/67931a0a99bf4f590dda2519_66b0929089fba41bd4d247e5_Different-Approaches-to-Website-Development-Costs.png",
            animation: "flip"
        },
        {
            id: 5,
            title: "Digital Marketing",
            description: "Strategic marketing campaigns to drive traffic, increase engagement, and boost conversions.",
            icon: <Wifi sx={{ color: '#fff', fontSize: 36 }} />,
            image: "https://hetic.in/wp-content/uploads/2019/10/Digital-Marketing-1.jpg",
            animation: "slideLeft"
        },
        {
            id: 6,
            title: "E-Commerce Account Management",
            description: "End-to-end management of your e-commerce operations, inventory, and customer relationships.",
            icon: <BarChart sx={{ color: '#fff', fontSize: 36 }} />,
            image: "https://www.gonukkad.com/wp-content/uploads/2023/12/Ecommerce-Account-Management-Services.webp",
            animation: "rise"
        }
    ];

    const headerControls = useAnimation();
    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (headerInView) {
            headerControls.start("visible");
        }
    }, [headerControls, headerInView]);

    const headerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const headerItemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                bgcolor: 'background.default',
                minHeight: '100vh',
                position: 'relative',
                pt: { xs: 4, sm: 6, md: 8 },
                pb: { xs: 6, sm: 8, md: 12 }
            }}>
                <AnimatedBackground />

                <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
                    {/* Header Section */}
                    <motion.div
                        ref={headerRef}
                        initial="hidden"
                        animate={headerControls}
                        variants={headerVariants}
                        style={{ marginBottom: { xs: '1.5rem', md: '3rem' }, textAlign: 'center' }}
                    >
                        <motion.div variants={headerItemVariants}>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{
                                    color: '#38B2AC',
                                    fontWeight: 600,
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        width: { xs: 10, md: 16 },
                                        height: { xs: 10, md: 16 },
                                        bgcolor: '#38B2AC',
                                        borderRadius: '50%',
                                        mr: 1,
                                        display: 'inline-block'
                                    }}
                                />
                                SMART + FAST
                            </Typography>
                        </motion.div>

                        <motion.div variants={headerItemVariants}>
                            <Typography variant="h1" component="h1" sx={{ mb: 1, fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' } }}>
                                Welcome to Our Services
                            </Typography>
                        </motion.div>

                        <motion.div variants={headerItemVariants}>
                            <Typography variant="body1" sx={{ color: '#718096', maxWidth: { xs: 300, sm: 600 }, mx: 'auto', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                Explore our expertise in web development, offering cutting-edge solutions to bring your ideas to life.
                            </Typography>
                        </motion.div>
                    </motion.div>

                    {/* Services Cards Grid */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
                            gridTemplateRows: { xs: 'auto', md: 'auto auto' },
                            gap: { xs: 1.5, md: 3 },
                            mb: { xs: 3, md: 6 }
                        }}
                    >
                        {/* First Row - Left side large card */}
                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' }, gridRow: { xs: 'auto', md: 'span 2' } }}>
                            <AnimatedCard delay={0.3} animationType={services[0].animation}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ height: { xs: 180, sm: 220, md: 320 }, objectFit: 'cover' }}
                                        image={services[0].image}
                                        alt={services[0].title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                                        <Typography
                                            variant="h3"
                                            component="h2"
                                            sx={{ mb: 1, fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' } }}
                                        >
                                            {services[0].title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                        >
                                            {services[0].description}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                                        <Button
                                            size="small"
                                            color="primary"
                                            endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                                            sx={{
                                                fontWeight: 500,
                                                color: '#38B2AC',
                                                fontSize: '0.875rem',
                                                padding: 0,
                                                '&:hover': {
                                                    background: 'transparent',
                                                    color: '#2C7A7B'
                                                }
                                            }}
                                        >
                                            Read more
                                        </Button>
                                    </CardActions> */}
                                </Card>
                            </AnimatedCard>
                        </Box>

                        {/* First Row - Right side small card */}
                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' }, gridRow: { xs: 'auto', md: 'span 1' } }}>
                            <AnimatedCard delay={0.6} animationType={services[1].animation}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: { xs: '100%', sm: '60%' },
                                        p: { xs: 2, md: 3 }
                                    }}>
                                        <CardContent sx={{ flexGrow: 1, p: 0, pb: 1.5 }}>
                                            <Typography
                                                variant="h3"
                                                component="h2"
                                                sx={{ mb: 1, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}
                                            >
                                                {services[1].title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ mb: 1.5, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                                            >
                                                {services[1].description.split('.')[0] + '.'}
                                            </Typography>
                                        </CardContent>
                                        {/* <CardActions sx={{ p: 0 }}>
                                            <Button
                                                size="small"
                                                color="primary"
                                                endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                                                sx={{
                                                    fontWeight: 500,
                                                    color: '#38B2AC',
                                                    fontSize: '0.875rem',
                                                    padding: 0,
                                                    '&:hover': {
                                                        background: 'transparent',
                                                        color: '#2C7A7B'
                                                    }
                                                }}
                                            >
                                                Read more
                                            </Button>
                                        </CardActions> */}
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: '100%', sm: '40%' },
                                            height: { xs: 120, sm: 'auto' },
                                            objectFit: 'cover'
                                        }}
                                        image={services[1].image}
                                        alt={services[1].title}
                                    />
                                </Card>
                            </AnimatedCard>
                        </Box>

                        {/* Second Row - Right side small cards */}
                        <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 1/2', md: 'span 3' }, gridRow: { xs: 'auto', md: 'span 1' } }}>
                            <AnimatedCard delay={0.9} animationType={services[2].animation}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ height: { xs: 100, sm: 120 }, objectFit: 'cover' }}
                                        image={services[2].image}
                                        alt={services[2].title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                                        <Typography
                                            variant="h3"
                                            component="h2"
                                            sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.1rem' } }}
                                        >
                                            {services[2].title}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                                        <Button
                                            size="small"
                                            color="primary"
                                            endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                                            sx={{
                                                fontWeight: 500,
                                                color: '#38B2AC',
                                                fontSize: '0.875rem',
                                                padding: 0,
                                                '&:hover': {
                                                    background: 'transparent',
                                                    color: '#2C7A7B'
                                                }
                                            }}
                                        >
                                            Read more
                                        </Button>
                                    </CardActions> */}
                                </Card>
                            </AnimatedCard>
                        </Box>

                        <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 1/2', md: 'span 3' }, gridRow: { xs: 'auto', md: 'span 1' } }}>
                            <AnimatedCard delay={1.2} animationType={services[3].animation}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ height: { xs: 100, sm: 120 }, objectFit: 'cover' }}
                                        image={services[3].image}
                                        alt={services[3].title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                                        <Typography
                                            variant="h3"
                                            component="h2"
                                            sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.1rem' } }}
                                        >
                                            {services[3].title}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                                        <Button
                                            size="small"
                                            color="primary"
                                            endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                                            sx={{
                                                fontWeight: 500,
                                                color: '#38B2AC',
                                                fontSize: '0.875rem',
                                                padding: 0,
                                                '&:hover': {
                                                    background: 'transparent',
                                                    color: '#2C7A7B'
                                                }
                                            }}
                                        >
                                            Read more
                                        </Button>
                                    </CardActions> */}
                                </Card>
                            </AnimatedCard>
                        </Box>
                    </Box>

                    {/* Additional Row for 2 More Cards */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
                            gap: { xs: 1.5, md: 3 }
                        }}
                    >
                        {/* Left side card - Horizontal layout */}
                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' } }}>
                            <AnimatedCard delay={1.5} animationType={services[4].animation}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: { xs: '100%', sm: '60%' },
                                        p: { xs: 2, md: 3 }
                                    }}>
                                        <CardContent sx={{ flexGrow: 1, p: 0, pb: 1.5 }}>
                                            <Typography
                                                variant="h3"
                                                component="h2"
                                                sx={{ mb: 1, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}
                                            >
                                                {services[4].title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ mb: 1.5, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                                            >
                                                {services[4].description.split('.')[0] + '.'}
                                            </Typography>
                                        </CardContent>
                                        {/* <CardActions sx={{ p: 0 }}>
                                            <Button
                                                size="small"
                                                color="primary"
                                                endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                                                sx={{
                                                    fontWeight: 500,
                                                    color: '#38B2AC',
                                                    fontSize: '0.875rem',
                                                    padding: 0,
                                                    '&:hover': {
                                                        background: 'transparent',
                                                        color: '#2C7A7B'
                                                    }
                                                }}
                                            >
                                                Read more
                                            </Button>
                                        </CardActions> */}
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: '100%', sm: '40%' },
                                            height: { xs: 120, sm: 'auto' },
                                            objectFit: 'cover'
                                        }}
                                        image={services[4].image}
                                        alt={services[4].title}
                                    />
                                </Card>
                            </AnimatedCard>
                        </Box>

                        {/* Right side card - Horizontal layout */}
                        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 6' } }}>
                            <AnimatedCard delay={1.8} animationType={services[5].animation}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: { xs: '100%', sm: '60%' },
                                        p: { xs: 2, md: 3 }
                                    }}>
                                        <CardContent sx={{ flexGrow: 1, p: 0, pb: 1.5 }}>
                                            <Typography
                                                variant="h3"
                                                component="h2"
                                                sx={{ mb: 1, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}
                                            >
                                                {services[5].title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ mb: 1.5, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                                            >
                                                {services[5].description.split('.')[0] + '.'}
                                            </Typography>
                                        </CardContent>
                                        {/* <CardActions sx={{ p: 0 }}>
                                            <Button
                                                size="small"
                                                color="primary"
                                                endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                                                sx={{
                                                    fontWeight: 500,
                                                    color: '#38B2AC',
                                                    fontSize: '0.875rem',
                                                    padding: 0,
                                                    '&:hover': {
                                                        background: 'transparent',
                                                        color: '#2C7A7B'
                                                    }
                                                }}
                                            >
                                                Read more
                                            </Button>
                                        </CardActions> */}
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: '100%', sm: '40%' },
                                            height: { xs: 120, sm: 'auto' },
                                            objectFit: 'cover'
                                        }}
                                        image={services[5].image}
                                        alt={services[5].title}
                                    />
                                </Card>
                            </AnimatedCard>
                        </Box>
                    </Box>
                </Container>

            </Box>
        </ThemeProvider>
    );
};

export default ServicesPage;
