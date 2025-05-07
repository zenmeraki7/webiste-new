import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    Stack,
    Typography
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
    padding: theme.spacing(5, 0),
    borderRadius: 20,
}));

const FooterSection = styled(Box)(({ theme }) => ({
    backgroundColor: '#FFF6F6',
    padding: theme.spacing(2, 0),
}));

const ContentSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4, 0),
    backgroundColor: 'white',
}));

const GreenButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#E0F1DE',
    color: '#0A2725',
    borderRadius: '50px',
    padding: theme.spacing(1, 3),
    '&:hover': {
        backgroundColor: '#C5E1C1',
    },
}));

function Footer() {
    const navigationItems = [
        { label: 'About Us', link: '/about-us' },
        { label: 'Careers', link: '/careers' },
        { label: 'Contact Us', link: '/contact' },
    ];

    const servicesItems = [
        { label: 'Shopify App Development', link: '/shopify-app' },
        { label: 'Custom Shopify Development', link: '/custom-store' },
        { label: 'Website Development', link: '/website-management' },
        { label: 'Digital Marketing', link: '/digital-marketing' },
        { label: 'E-commerce Management', link: '/e-commerce-management' },
    ];

    const contactInfo = [
        {
            icon: 'location',
            text: 'Thrissur, Kerala India',
            link: '#'
        },
        {
            icon: 'email',
            text: 'official@zenmeraki.com',
            link: 'mailto:official@zenmeraki.com'
        },
        {
            icon: 'phone',
            text: '+91 6282346108',
            link: 'tel:+916282346108'
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Hero section */}
            <DarkGreenContainer>
                <Container maxWidth="100%">
                    <Grid container spacing={4} direction="column" alignItems="center" textAlign="center">
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" color="#4CD787" gutterBottom>
                                JOIN THE BEST
                            </Typography>
                            <Typography variant="h3" gutterBottom>
                                Ready to Transform Your E-Commerce Business?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container justifyContent="center">
                            <GreenButton variant="contained" size="large" component={RouterLink} to="/contact">
                                Contact Us
                            </GreenButton>
                        </Grid>
                    </Grid>
                </Container>
            </DarkGreenContainer>

            {/* Main content section */}
            <ContentSection>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* Logo and description */}
                        <Grid item xs={12} md={3}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={zenmeraki}
                                        alt="ZEN MERAKI"
                                        style={{
                                            width: 35,
                                            height: 35,
                                            marginRight: '10px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                    ZENMERAKI
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                We specialize in transforming ideas into impactful solutions. <br />
                                From cutting-edge applications to intuitive designs,<br />
                                our work reflects a commitment to excellence and innovation in all we deliver.
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
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

                        {/* Navigation */}
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{
                                position: 'relative',
                                paddingBottom: 1,
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: 40,
                                    height: 3,
                                    backgroundColor: '#00B8A9',
                                }
                            }}>
                                Navigation
                            </Typography>
                            <List dense disablePadding>
                                {navigationItems.map((item) => (
                                    <ListItem key={item.label} disablePadding sx={{ py: 0.5 }}>
                                        <Link component={RouterLink} to={item.link} color="inherit" underline="hover">
                                            <Typography variant="body2">{item.label}</Typography>
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        {/* Services */}
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{
                                position: 'relative',
                                paddingBottom: 1,
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: 40,
                                    height: 3,
                                    backgroundColor: '#00B8A9',
                                }
                            }}>
                                Services
                            </Typography>
                            <List dense disablePadding>
                                {servicesItems.map((item) => (
                                    <ListItem key={item.label} disablePadding sx={{ py: 0.5 }}>
                                        <Link component={RouterLink} to={item.link} color="inherit" underline="hover">
                                            <Typography variant="body2">{item.label}</Typography>
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        {/* Contact Info */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{
                                position: 'relative',
                                paddingBottom: 1,
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: 40,
                                    height: 3,
                                    backgroundColor: '#00B8A9',
                                }
                            }}>
                                Contact
                            </Typography>
                            <List dense disablePadding>
                                {contactInfo.map((item, index) => (
                                    <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                        <Box sx={{ color: '#00B8A9', mr: 1, display: 'flex', alignItems: 'center' }}>
                                            {item.icon === 'location' && <LocationOnIcon fontSize="small" />}
                                            {item.icon === 'email' && <MailOutlineIcon fontSize="small" />}
                                            {item.icon === 'phone' && <PhoneIcon fontSize="small" />}
                                        </Box>
                                        <Link href={item.link} color="inherit" underline="hover">
                                            <Typography variant="body2">{item.text}</Typography>
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </ContentSection>

            {/* Footer Section */}
            <FooterSection>
                <Container maxWidth="lg">
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body2" color="text.secondary">
                                © 2025 Zenmeraki. All rights reserved.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Stack direction="row" spacing={2}>
                                <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover">
                                    <Typography variant="body2">Privacy Policy</Typography>
                                </Link>
                                <Link component={RouterLink} to="/terms-of-service" color="inherit" underline="hover">
                                    <Typography variant="body2">Terms of Service</Typography>
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
