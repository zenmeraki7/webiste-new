import React, { useState, useMemo } from 'react';
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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import zenmeraki from "../assets/images/zenlogo.png";

// Navigation items - extracted for better maintainability
const NAVIGATION_ITEMS = [
  { title: 'Home', hasDropdown: false, link: '/' },
  {
    title: 'Expertise',
    hasDropdown: true,
    link: '/expertise',
    items: [
      { name: 'Shopify App Development', link: '/shopify-app' },
      { name: 'Custom Shopify App Development', link: '/custom-store' },
      { name: 'Custom App Development', link: '/custom-app' },
      { name: 'Website Development', link: '/website-management' },
      { name: 'Digital Marketing', link: '/digital-marketing' },
      { name: 'E-Commerce Account Management', link: '/e-commerce-management' }
    ]
  },
  { title: 'About Us', hasDropdown: false, link: '/about-us' },
  { title: 'Apps', hasDropdown: false, link: '/#apps' },
  { title: 'Projects', hasDropdown: false, link: '/#projects' },
  { title: 'Careers', hasDropdown: false, link: '/careers' },
];

// Scroll offset function for HashLink
const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -80; // Adjust based on header height
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
};

// Link styling for consistency and accessibility
const linkSx = {
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'none'
  },
  '&:focus': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: '2px'
  }
};

const ZenMerakiLogo = React.memo(() => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <Link 
      to="/" 
      style={{ 
        textDecoration: 'none', 
        display: 'flex', 
        alignItems: 'center',
        ...linkSx 
      }}
      aria-label="ZEN MERAKI Homepage"
    >
      <img
        src={logoError ? '/fallback-logo.png' : zenmeraki}
        alt="ZEN MERAKI - Web Development Company"
        onLoad={() => setLogoLoaded(true)}
        onError={() => setLogoError(true)}
        style={{
          width: 35,
          height: 35,
          marginRight: '10px',
          objectFit: 'contain',
          opacity: logoLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
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
    </Link>
  );
});

ZenMerakiLogo.displayName = 'ZenMerakiLogo';

const Header = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // Memoize navigation items for performance
  const navigationMemo = useMemo(() => NAVIGATION_ITEMS, []);

  // Desktop dropdown state
  const [anchorEls, setAnchorEls] = useState(() => 
    new Array(navigationMemo.length).fill(null)
  );

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);

  // Desktop dropdown handlers
  const handleMenuOpen = (index, event) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
    
    // Return focus to trigger button for accessibility
    document.getElementById(`nav-button-${index}`)?.focus();
  };

  // Mobile menu handlers
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close expertise dropdown when main menu closes
    if (mobileMenuOpen) setMobileExpertiseOpen(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
    setMobileExpertiseOpen(false);
  };

  const handleMobileExpertiseToggle = () => {
    setMobileExpertiseOpen(!mobileExpertiseOpen);
  };

  const getLinkComponent = (link) => {
    return link.includes('#') ? HashLink : Link;
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        bgcolor: '#EFF9F9', // Your desired header background
        borderBottom: '1px solid',
        borderBottomColor: 'divider'
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ px: { xs: 2, sm: 3, md: 4 } }} // Custom padding for brand consistency
      >
        <Toolbar 
          disableGutters // Disabled to use Container's custom padding instead
          sx={{ 
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto', // Logo, nav, button
            alignItems: 'center',
            gap: 2,
            minHeight: { xs: 56, sm: 64 }
          }}
        >
          <ZenMerakiLogo />

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation">
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: 'center',
              gap: 1
            }}>
              {navigationMemo.map((item, index) => {
                const LinkComponent = getLinkComponent(item.link);
                return (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <Button
                      id={`nav-button-${index}`}
                      color="inherit"
                      component={item.hasDropdown ? 'button' : LinkComponent}
                      to={!item.hasDropdown ? item.link : undefined}
                      {...(LinkComponent === HashLink && !item.hasDropdown ? { scroll: scrollWithOffset } : {})}
                      sx={{
                        mx: 1,
                        color: 'text.secondary',
                        textTransform: 'none',
                        fontWeight: 500,
                        ...linkSx
                      }}
                      endIcon={item.hasDropdown ? (
                        <KeyboardArrowDownIcon 
                          sx={{ 
                            transform: Boolean(anchorEls[index]) ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease-in-out'
                          }} 
                        />
                      ) : null}
                      onClick={item.hasDropdown ? (event) => handleMenuOpen(index, event) : undefined}
                      aria-haspopup={item.hasDropdown ? "true" : undefined}
                      aria-expanded={item.hasDropdown ? Boolean(anchorEls[index]) : undefined}
                      aria-controls={anchorEls[index] ? `${item.title}-menu` : undefined}
                      data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}
                    >
                      {item.title}
                    </Button>

                    {item.hasDropdown && (
                      <Menu
                        id={`${item.title}-menu`}
                        anchorEl={anchorEls[index]}
                        open={Boolean(anchorEls[index])}
                        onClose={() => handleMenuClose(index)}
                        MenuListProps={{ 
                          'aria-labelledby': `nav-button-${index}`,
                          role: 'menu'
                        }}
                        sx={{ mt: 1 }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        {item.items && item.items.map((subItem, subIndex) => (
                          <MenuItem
                            key={subIndex}
                            onClick={() => handleMenuClose(index)}
                            component={Link}
                            to={subItem.link}
                            sx={{ 
                              minWidth: 200, 
                              ...linkSx,
                              py: 1.5
                            }}
                            role="menuitem"
                          >
                            {subItem.name}
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </Box>
                );
              })}
            </Box>
          </nav>

          {/* Desktop Contact Button */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/contact"
              sx={{
                textTransform: 'none',
                px: 3,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 1
                }
              }}
            >
              CONTACT US
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              edge="end"
              onClick={handleMobileMenuToggle}
              sx={{ justifySelf: 'end' }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={handleMobileMenuToggle}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: '80%',
                maxWidth: 300,
                pt: 2,
                backgroundColor: 'background.default',
              },
            }}
          >
            <Toolbar sx={{ 
              justifyContent: 'flex-end', 
              minHeight: { xs: '56px', sm: '64px' }
            }}>
              <IconButton 
                onClick={handleMobileMenuToggle} 
                aria-label="close navigation menu"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            
            <List component="nav" aria-label="Mobile navigation">
              {navigationMemo.map((item, index) => {
                const LinkComponent = getLinkComponent(item.link);
                
                if (item.hasDropdown) {
                  return (
                    <React.Fragment key={index}>
                      <ListItemButton 
                        onClick={handleMobileExpertiseToggle}
                        aria-expanded={mobileExpertiseOpen}
                        aria-controls="mobile-expertise-submenu"
                      >
                        <ListItemText primary={item.title} />
                        {mobileExpertiseOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse 
                        in={mobileExpertiseOpen} 
                        timeout="auto" 
                        unmountOnExit
                        id="mobile-expertise-submenu"
                      >
                        <List component="div" disablePadding>
                          {item.items && item.items.map((subItem, subIndex) => (
                            <ListItem 
                              key={subIndex} 
                              component={Link} 
                              to={subItem.link} 
                              onClick={handleMobileMenuClose}
                              sx={linkSx}
                            >
                              <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText 
                                  primary={subItem.name} 
                                  primaryTypographyProps={{ fontSize: '0.95rem' }}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <ListItem 
                      key={index} 
                      component={LinkComponent} 
                      to={item.link} 
                      onClick={handleMobileMenuClose}
                      {...(LinkComponent === HashLink ? { scroll: scrollWithOffset } : {})}
                      sx={linkSx}
                    >
                      <ListItemButton>
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    </ListItem>
                  );
                }
              })}
              
              {/* Mobile Contact Button */}
              <ListItem sx={{ mt: 2, px: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/contact"
                  onClick={handleMobileMenuClose}
                  sx={{ 
                    textTransform: 'none', 
                    width: '100%',
                    boxShadow: 'none'
                  }}
                >
                  CONTACT US
                </Button>
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;