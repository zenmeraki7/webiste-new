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
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import zenmeraki from "../assets/images/zenlogo.png";
import { contactInfo } from './Constants/contactInfo';
import { useResponsive } from './hooks/useResponsive';

// Styled Components
const DarkGreenContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0A2725',
  color: 'white',
  padding: theme.spacing(3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 0),
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFF6F6',
  padding: theme.spacing(1, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 0),
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  backgroundColor: 'white',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 0),
  },
}));

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#E0F1DE',
  color: '#0A2725',
  borderRadius: '50px',
  padding: theme.spacing(0.5, 2),
  fontSize: theme.typography.body2.fontSize,
  '&:hover': {
    backgroundColor: '#C5E1C1',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.body1.fontSize,
  },
}));

const LogoText = styled(Typography)({
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
});

const ContactBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
  },
  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-end',
  },
}));

const ContactLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  color: 'inherit',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#00B8A9',
    textDecoration: 'underline',
  },
}));


const ContactText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  [theme.breakpoints.down('350')]: {
    fontSize: '0.875rem', 
  },
}));


const Footer = () => {
  const { isMobile, isExtraSmall } = useResponsive();
  const { location, email, phone } = contactInfo;

  const contactItems = [
    { icon: 'location', text: location, link: '#' },
    { icon: 'email', text: email, link: `mailto:${email}` },
    { icon: 'phone', text: phone, link: `tel:${phone}` },
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
          <Grid container spacing={4} justifyContent="space-between">
            {/* Logo and description */}
            <Grid item xs={12} md={7} lg={8}>
              <Box sx={{ mb: 2 }}>
                <LogoText variant="h6">
                <img
                  src={zenmeraki}
                  alt="ZEN MERAKI"
                  onError={(e) => {
                  e.target.style.display = 'none';
               }}
                  style={{
                     width: isMobile ? 25 : 35,
                     height: isMobile ? 25 : 35,
                     marginRight: '8px',
                     objectFit: 'contain',
  }}
/>
                  ZENMERAKI
                </LogoText>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                We specialize in transforming ideas into impactful solutions. <br />
                From cutting-edge applications to intuitive designs,<br />
                our work reflects a commitment to excellence and innovation in all we deliver.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <IconButton size="small"
                 aria-label="Twitter"
                 sx={{
                   color: '#0A2725',
                   transition: 'color 0.3s ease',
                   '&:hover': {
                   color: '#1DA1F2',
          },
  }} href='https://twitter.com/zenmeraki' target="_blank" rel="noopener noreferrer">
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" aria-label="LinkedIn" sx={{
                   color: '#0A2725',
                   transition: 'color 0.3s ease',
                   '&:hover': {
                   color: '#0077B5',
          },
  }} href='https://www.linkedin.com/company/zenmeraki/' target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <a href="mailto:official@zenmeraki.com">
                  <IconButton size="small" aria-label="Email" sx={{
                   color: '#0A2725',
                   transition: 'color 0.3s ease',
                   '&:hover': {
                   color: '#EA4335',
          },
  }}>
                    <EmailIcon fontSize="small" />
                  </IconButton>
                </a>
              </Stack>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5} lg={4}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
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
                  },
                }}
              >
                Contact
              </Typography>
              <ContactBox>
                {contactItems.map((item, index) => (
                  <ContactLink key={index} href={item.link} underline="hover">
                    <Box sx={{ color: '#00B8A9', mx: 1, display: 'flex', alignItems: 'center' }}>
                      {item.icon === 'location' && <LocationOnIcon fontSize="small" />}
                      {item.icon === 'email' && <MailOutlineIcon fontSize="small" />}
                      {item.icon === 'phone' && <PhoneIcon fontSize="small" />}
                    </Box>
                    <ContactText sx={{ textAlign: isMobile ? 'left' : 'right' }}>
                      {item.text}
                    </ContactText>
                  </ContactLink>
                ))}
              </ContactBox>
            </Grid>
          </Grid>
        </Container>
      </ContentSection>

      {/* Footer */}
      <FooterSection>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm="auto">
             <Typography
  variant="body2"
  color="text.secondary"
  sx={{
    fontSize: isMobile ? '0.875rem' : '0.9rem', 
    textAlign: isMobile ? 'center' : 'left'
  }}
>
  © 2025 Copyright:zenmeraki
</Typography>

            </Grid>
            <Grid item xs={12} sm="auto">
              <Stack direction="row" spacing={1} justifyContent={isMobile ? 'center' : 'flex-end'}>
                <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover">
                  <Typography
  variant="body2"
  sx={{
    position: 'relative',
    display: 'inline-block',
    fontSize: isMobile ? '0.875rem' : '0.9rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: '2px',
      bottom: 0,
      left: 0,
      backgroundColor: '#00B8A9',
      transition: 'width 0.3s',
    },
    '&:hover::after': {
      width: '100%',
    },
  }}
>
  Privacy Policy
</Typography>


                </Link>
                <Link component={RouterLink} to="/terms-of-service" color="inherit" underline="hover">
                  <Typography  variant="body2"
                   sx={{
    position: 'relative',
    display: 'inline-block',
    fontSize: isMobile ? '0.875rem' : '0.9rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: '2px',
      bottom: 0,
      left: 0,
      backgroundColor: '#00B8A9',
      transition: 'width 0.3s',
    },
    '&:hover::after': {
      width: '100%',
    },
  }}>Terms of Service</Typography>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </FooterSection>
    </Box>
  );
};

export default Footer;
