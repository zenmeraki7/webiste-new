import React, { useState } from 'react';
import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';

import zenmeraki from "../assets/images/zenlogo.png";

// Custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1a3c34',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4caf50',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 700,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: 'none'
        }
      }
    }
  },
});

// Logo component with image and text
const GrowioLogo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
    <Typography
      variant="h6"
      component="div"
      sx={{
        fontWeight: 700,
        color: 'primary.main',
        letterSpacing: '-0.02em',
      }}
    >
      ZEN MERAKI
    </Typography>
  </Box>
);

// Navigation items
const navigationItems = [
  { title: 'Home', hasDropdown: false, link: '/' },
  { 
    title: 'Expertise', 
    hasDropdown: true,
    link: '/expertise',
    items: [
      { name: 'Shopify App Development', link: '' },
      { name: 'Custom Shopify App Development', link: '' },
      { name: 'Custom App Development', link: '' },
      { name: 'Website Development', link: '' },
      { name: 'Digital Marketing', link: '' },
      { name: 'E-Commerce Account Management', link: '' }
    ]
  },
  { title: 'About Us', hasDropdown: false, link: '/' },
  { title: 'Apps', hasDropdown: false, link: '/' },
  { title: 'Projects', hasDropdown: false, link: '/' },
  { title: 'Careers', hasDropdown: false, link: '/' },
];

const GrowioHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEls, setAnchorEls] = useState(Array(navigationItems.length).fill(null));
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleMenuOpen = (index, event) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0} 
      sx={{ 
        bgcolor: '#EFF9F9',
        width: '100%', 
        left: 0,
        right: 0,
        margin: 0, // Ensure no margin
      }}
    >
      <Container 
        disableGutters 
        maxWidth={false} // Set to false to remove max-width constraint
        sx={{ 
          width: '100%',
          px: { xs: 2, sm: 3, md: 4 },
          margin: 0, // Ensure no margin
        }}
      >
        <Toolbar 
          disableGutters 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            width: '100%',
            margin: 0, // Ensure no margin
          }}
        >
          <GrowioLogo />

          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center', 
            flexGrow: 1
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center'
            }}>
              {navigationItems.map((item, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Button
                    color="inherit"
                    component={item.hasDropdown ? 'div' : 'a'}
                    href={!item.hasDropdown ? item.link : undefined}
                    sx={{ 
                      mx: 1.5, 
                      color: 'text.secondary',
                      textTransform: 'none',
                      fontWeight: 500,
                      textDecoration: 'none'
                    }}
                    endIcon={item.hasDropdown ? <KeyboardArrowDownIcon /> : null}
                    onClick={item.hasDropdown ? (event) => handleMenuOpen(index, event) : undefined}
                  >
                    {item.title}
                  </Button>
                  
                  {item.hasDropdown && (
                    <Menu
                      anchorEl={anchorEls[index]}
                      open={Boolean(anchorEls[index])}
                      onClose={() => handleMenuClose(index)}
                      MenuListProps={{ 'aria-labelledby': `${item.title}-button` }}
                      sx={{ mt: 1 }}
                    >
                      {item.items && item.items.map((subItem, subIndex) => (
                        <MenuItem 
                          key={subIndex} 
                          onClick={() => handleMenuClose(index)}
                          component="a"
                          href={subItem.link}
                          sx={{ minWidth: 150, textDecoration: 'none', color: 'inherit' }}
                        >
                          {subItem.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={handleMobileMenuOpen}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                textTransform: 'none', 
                px: 2,
                boxShadow: 'none'
              }}
            >
              CONTACT US
            </Button>
          </Box>

          <Menu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleMobileMenuClose}
            sx={{ 
              display: { xs: 'block', md: 'none' },
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '100%',
                left: '0 !important',
                right: '0',
                borderRadius: '0'
              }
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {navigationItems.map((item, index) => (
              <div key={index}>
                <MenuItem 
                  onClick={handleMobileMenuClose}
                  component={!item.hasDropdown ? "a" : "div"}
                  href={!item.hasDropdown ? item.link : undefined}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {item.title}
                </MenuItem>
                {item.hasDropdown && item.items && item.items.map((subItem, subIndex) => (
                  <MenuItem 
                    key={subIndex}
                    onClick={handleMobileMenuClose}
                    component="a"
                    href={subItem.link}
                    sx={{ pl: 4, fontSize: '0.95rem', textDecoration: 'none', color: 'inherit' }}
                  >
                    {subItem.name}
                  </MenuItem>
                ))}
              </div>
            ))}
            <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 1, pt: 1 }}>
              <MenuItem onClick={handleMobileMenuClose}>Log In</MenuItem>
              <MenuItem 
                onClick={handleMobileMenuClose}
                sx={{ color: 'primary.main', fontWeight: 500 }}
              >
                Get Started
              </MenuItem>
            </Box>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Main App component with theme setup
const Header = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ 
        flexGrow: 1,
        width: '100%',
        overflowX: 'hidden',
        margin: 0, // Ensure no margin
      }}>
        <GrowioHeader />
      </Box>
    </ThemeProvider>
  );
};

export default Header;