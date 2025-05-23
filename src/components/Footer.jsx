import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Link,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

import zenmeraki from "../assets/images/zenlogo.png";

// Styled components
const DarkGreenContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#0A2725',
    color: 'white',
    padding: theme.spacing(3, 0), // Reduced padding for mobile
    borderRadius: 20,
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5, 0), // Original padding for larger screens
    },
}));

const FooterSection = styled(Box)(({ theme }) => ({
    backgroundColor: '#FFF6F6',
    padding: theme.spacing(1, 0), // Reduced padding for mobile
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2, 0), // Original padding for larger screens
    },
}));

const ContentSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 0), // Reduced padding for mobile
    backgroundColor: 'white',
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4, 0), // Original padding for larger screens
    },
}));

const GreenButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#E0F1DE',
    color: '#0A2725',
    borderRadius: '50px',
    padding: theme.spacing(0.5, 2), // Reduced padding for mobile
    fontSize: theme.typography.body2.fontSize, // Smaller font size for mobile
    '&:hover': {
        backgroundColor: '#C5E1C1',
    },
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1, 3), // Original padding for larger screens
        fontSize: theme.typography.body1.fontSize, // Original font size
    },
}));

function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isExtraSmall = useMediaQuery('(max-width:350px)');

    const contactInfo = [
        {
            icon: 'location',
            text: isExtraSmall ? 'Thrissur' : 'Thrissur, Kerala',
            link: '#'
        },
        {
            icon: 'email',
            text: isExtraSmall ? 'Email' : 'official@zenmeraki.com',
            link: 'mailto:official@zenmeraki.com'
        },
        {
            icon: 'phone',
            text: isExtraSmall ? 'Call' : '+91 6282346108',
            link: 'tel:+916282346108'
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Hero section */}
            <DarkGreenContainer>
                <Container maxWidth="100%">
                    <Grid container spacing={2} direction="column" alignItems="center" textAlign="center">
                        <Grid item xs={12}>
                            <Typography variant={isMobile ? 'subtitle2' : 'subtitle1'} color="#4CD787" gutterBottom>
                                JOIN THE BEST
                            </Typography>
                            <Typography variant={isMobile ? 'h5' : 'h3'} gutterBottom>
                                Ready to Transform Your E-Commerce Business?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container justifyContent="center">
                            <GreenButton variant="contained" size={isMobile ? 'small' : 'large'} component={RouterLink} to="/contact">
                                Contact Us
                            </GreenButton>
                        </Grid>
                    </Grid>
                </Container>
            </DarkGreenContainer>

            {/* Main content section */}
            <ContentSection>
                <Container maxWidth="lg">
                    {/* Desktop layout - Company info on left, Contact on right */}
                    <Grid container spacing={4} justifyContent="space-between">
                        {/* Logo and description */}
                        <Grid item xs={12} md={7} lg={8}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={zenmeraki}
                                        alt="ZEN MERAKI"
                                        style={{
                                            width: isMobile ? 25 : 35,
                                            height: isMobile ? 25 : 35,
                                            marginRight: '8px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                    ZENMERAKI
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                                We specialize in transforming ideas into impactful solutions. <br />
                                From cutting-edge applications to intuitive designs,<br />
                                our work reflects a commitment to excellence and innovation in all we deliver.
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                <IconButton size="small" aria-label="Twitter" sx={{ color: '#0A2725' }}>
                                    <TwitterIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" aria-label="LinkedIn" sx={{ color: '#0A2725' }}>
                                    <LinkedInIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" aria-label="Email" sx={{ color: '#0A2725' }}>
                                    <EmailIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Grid>

                        {/* Contact Info - Right aligned on desktop */}
                        <Grid item xs={12} md={5} lg={4}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom 
                                sx={{
                                    position: 'relative',
                                    paddingBottom: 0.5,
                                    fontSize: '1rem',
                                    textAlign: isMobile ? 'left' : 'right',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        right: isMobile ? 'auto' : 0,
                                        left: isMobile ? 0 : 'auto',
                                        bottom: 0,
                                        width: 30,
                                        height: 2,
                                        backgroundColor: '#00B8A9',
                                    }
                                }}
                            >
                                Contact
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
                                {contactInfo.map((item, index) => (
                                    <Link 
                                        key={index}
                                        href={item.link} 
                                        color="inherit" 
                                        underline="hover" 
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            flexDirection: isMobile ? 'row' : 'row-reverse',
                                            mb: 1.5 
                                        }}
                                    >
                                        <Box sx={{ 
                                            color: '#00B8A9', 
                                            ml: isMobile ? 0 : 1,
                                            mr: isMobile ? 1 : 0,
                                            display: 'flex', 
                                            alignItems: 'center' 
                                        }}>
                                            {item.icon === 'location' && <LocationOnIcon fontSize="small" />}
                                            {item.icon === 'email' && <MailOutlineIcon fontSize="small" />}
                                            {item.icon === 'phone' && <PhoneIcon fontSize="small" />}
                                        </Box>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontSize: isExtraSmall ? '0.75rem' : '0.9rem',
                                                textAlign: isMobile ? 'left' : 'right'
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </ContentSection>

            {/* Footer Section */}
            <FooterSection>
                <Container maxWidth="lg">
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm="auto">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem', textAlign: isMobile ? 'center' : 'left' }}>
                                © 2025 Zenmeraki. All rights reserved.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <Stack direction="row" spacing={1} justifyContent={isMobile ? 'center' : 'flex-end'}>
                                <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover">
                                    <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>Privacy Policy</Typography>
                                </Link>
                                <Link component={RouterLink} to="/terms-of-service" color="inherit" underline="hover">
                                    <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>Terms of Service</Typography>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </FooterSection>
        </Box>
    );
}

export default Footer;