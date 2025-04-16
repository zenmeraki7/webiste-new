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
      main: '#1a3c34', // Dark green color as in original example
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4caf50', // Light green as secondary
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
        containedPrimary: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },
});

// Logo component with image and text
const GrowioLogo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {/* Logo Image */}
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

// Modified navigation items to match the requested links
const navigationItems = [
  { title: 'Home', hasDropdown: false },
  { title: 'Expertise', hasDropdown: false },
  { title: 'About Us', hasDropdown: false },
  { title: 'Apps', hasDropdown: false },
  { title: 'Projects', hasDropdown: false },
  { title: 'Careers', hasDropdown: false },
];

const GrowioHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for dropdown menus
  const [anchorEls, setAnchorEls] = useState(Array(navigationItems.length).fill(null));
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  // Handle opening dropdown menu
  const handleMenuOpen = (index, event) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  // Handle closing dropdown menu
  const handleMenuClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  // Mobile menu handlers
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: '#EFF9F9' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <GrowioLogo />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', mx: 'auto', ml: 4 }}>
              {navigationItems.map((item, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Button
                    color="inherit"
                    sx={{ 
                      mx: 1.5, 
                      color: 'text.secondary',
                      textTransform: 'none',
                      fontWeight: 500
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
                          sx={{ minWidth: 150 }}
                        >
                          {subItem}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Mobile menu icon */}
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

          {/* Auth Buttons */}
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

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleMobileMenuClose}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {navigationItems.map((item, index) => (
              <div key={index}>
                <MenuItem onClick={handleMobileMenuClose}>
                  {item.title}
                </MenuItem>
                {item.hasDropdown && item.items && item.items.map((subItem, subIndex) => (
                  <MenuItem 
                    key={subIndex}
                    onClick={handleMobileMenuClose}
                    sx={{ pl: 4, fontSize: '0.95rem' }}
                  >
                    {subItem}
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
      <Box sx={{ flexGrow: 1 }}>
        <GrowioHeader />
        {/* Rest of your application would go here */}
      </Box>
    </ThemeProvider>
  );
};

export default Header;