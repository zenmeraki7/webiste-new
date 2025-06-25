import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { useTheme } from '@mui/material/styles';

const ShopifyStoreModal = ({ open, handleClose, referralCode,isMobile }) => {
  const [storeName, setStoreName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

 
 
  useEffect(() => {
    if (!open) {
      setStoreName('');
      setIsValid(false);
      setTouched(false);
    }
  }, [open]);

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setStoreName(value);
    setTouched(true);
    const isShopifyDomain = /^([a-zA-Z0-9-]+)\.myshopify\.com$/.test(value);
    setIsValid(isShopifyDomain);
  };

  const handleInstall = () => {
  const storeUrl = storeName.trim(); // assuming storeName is valid like 'your-store.myshopify.com'
  const redirectUrl = `https://metamatrix-new-c6adf9244e93.herokuapp.com/api/auth?shop=${storeUrl}&ref=${referralCode || ''}`;
  window.location.href = redirectUrl;
  handleClose();
  }


  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          m: isMobile ? 1 : 2,
          borderRadius: isMobile ? 2 : 3,
          width: '100%',
          maxWidth: isMobile ? '95vw' : 400,
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: isMobile ? 2 : 4,
          py: isMobile ? 1.5 : 2.5,
          fontSize: isMobile ? '1.1rem' : '1.25rem',
        }}
      >
        Enter Your Shopify Store
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: isMobile ? 2 : 4,
          pt: isMobile ? 1 : 2,
          pb: 0,
        }}
      >
        <Typography
          variant="body1"
          sx={{ mb: 2, fontSize: isMobile ? '0.95rem' : '1rem' }}
        >
          Please enter your Shopify store URL to proceed with the installation. The URL should be in
          the format: <strong>your-store.myshopify.com</strong>.
        </Typography>

        {referralCode && (
          <Typography
            variant="body2"
            sx={{ mb: 2, color: 'primary.main', fontSize: isMobile ? '0.9rem' : '1rem' }}
          >
            You're installing via referral code: <strong>{referralCode}</strong>
          </Typography>
        )}

        <TextField
          fullWidth
          autoFocus
          label="Shopify Store URL"
          placeholder="your-store.myshopify.com"
          value={storeName}
          onChange={handleInputChange}
          margin="normal"
          size={isMobile ? 'small' : 'medium'}
          sx={{
            fontSize: isMobile ? '0.95rem' : '1rem',
            '& .MuiInputBase-input': {
              fontSize: isMobile ? '0.95rem' : '1rem',
            },
          }}
        />

        {touched && !isValid && (
          <Typography variant="caption" color="error" sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
            Please enter a valid Shopify store URL.
          </Typography>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: isMobile ? 2 : 4,
          pb: isMobile ? 2 : 3,
        }}
      >
        <Button
          onClick={handleInstall}
          disabled={!isValid}
          variant="contained"
          fullWidth
          sx={{
            py: isMobile ? 1 : 1.5,
            fontSize: isMobile ? '1rem' : '1.1rem',
          }}
        >
          Install
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShopifyStoreModal;
