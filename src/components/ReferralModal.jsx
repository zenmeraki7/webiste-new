import React, { useState } from 'react';
import {
  Box, Button, Divider, IconButton, Modal, TextField, Alert, 
  CircularProgress, Typography, Chip, Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Create motion components
const MotionBox = motion(Box);
const MotionPaper = motion.div;
const MotionButton = motion(Button);

// API Configuration
const API_CONFIG = {
  baseURL:"https://metamatrix-new-c6adf9244e93.herokuapp.com",
  endpoints: {
    generateReferral: "/referral/getreferrallink",
    // validateUser: '/api/users/validate'
  }
};

// API Service
const apiService = {
  async generateReferralLink(userData) {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.generateReferral}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate referral link');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // async validateUserExists(email) {
  //   try {
  //     const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.validateUser}?email=${encodeURIComponent(email)}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
      
  //     if (response.ok) {
  //       const data = await response.json();
  //       return data.exists;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error('User validation error:', error);
  //     return false;
  //   }
  // }
};

const ReferralModal = ({ open, onClose, theme, isMobile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    // Clear API error
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

   // Phone validation
const phoneRegex = /^\d{10}$/;
if (!formData.phone.trim()) {
  newErrors.phone = 'Phone number is required';
} else if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
  newErrors.phone = 'Please enter a valid 10-digit phone number';
}


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError('');

    try {
      // Call the API to generate referral link
      const response = await apiService.generateReferralLink({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      });
      console.log(response);
      
      // Set the response data
     setGeneratedLink(response?.data?.referralLink || response?.data?.link || '');
      setReferralCode(response?.data?.referralCode || response?.data?.code || '');
      setShowSuccess(true);
      
      // Reset form
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error generating referral link:', error);
      setApiError(error.message || 'Failed to generate referral link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
    setShowSuccess(false);
    setGeneratedLink('');
    setReferralCode('');
    setIsSubmitting(false);
    setApiError('');
    setCopied(false);
    onClose();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="referral-modal-title"
      aria-describedby="referral-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1300,
      }}
    >
      <MotionPaper
        style={{
          width: isMobile ? '90%' : '500px',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
          padding: 0,
          outline: 'none',
        }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 3,
          pb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MotionBox
              sx={{
                bgcolor: theme?.palette?.primary?.main || '#8B5CF6',
                color: 'white',
                p: 1,
                borderRadius: 1,
                display: 'flex',
                mr: 2
              }}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <LinkIcon />
            </MotionBox>
            <Typography
              id="referral-modal-title"
              variant={isMobile ? "h6" : "h5"}
              component="h2"
              fontWeight="bold"
            >
              Generate Referral Link
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ 
              color: 'text.secondary',
              '&:hover': { 
                bgcolor: 'error.light',
                color: 'error.main' 
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {!showSuccess ? (
            <>
              {/* Benefits Section */}
              <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  🎉 Earn Rewards with Every Referral!
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {/* <Chip 
                    icon={<MonetizationOnIcon />} 
                    label="30% Commission" 
                    size="small" 
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'inherit' }}
                  /> */}
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="Lifetime Earnings" 
                    size="small" 
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'inherit' }}
                  />
                </Box>
              </Paper>

              {/* <Typography
                id="referral-modal-description"
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Join our referral program and start earning! Fill in your details below to generate your personalized referral link for MetaMatrix. Share it with friends and earn 30% commission on every successful signup.
              </Typography> */}

              {/* API Error Alert */}
              {apiError && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setApiError('')}>
                  {apiError}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Full Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    error={!!errors.name}
                    helperText={errors.name || "Enter your full name as it appears on official documents"}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={!!errors.email}
                    helperText={errors.email || "We'll use this email to send you referral updates and commission details"}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    error={!!errors.phone}
                    // helperText={errors.phone || "Include country code (e.g., +1 234 567 8900)"}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                  />
                </Box>

                {/* <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  By generating a referral link, you agree to our Terms of Service and Privacy Policy. 
                  Your information will be kept secure and used only for referral tracking purposes.
                </Typography> */}

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    sx={{ minWidth: '100px' }}
                  >
                    Cancel
                  </Button>
                  <MotionButton
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ 
                      minWidth: '120px',
                      position: 'relative'
                    }}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                        Generating...
                      </>
                    ) : (
                      'Generate Link'
                    )}
                  </MotionButton>
                </Box>
              </Box>
            </>
          ) : (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert 
                severity="success" 
                sx={{ mb: 3 }}
                icon={<CheckCircleIcon />}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  Success! Your referral link is ready to use.
                </Typography>
                <Typography variant="caption">
                  Start sharing and earning commissions immediately!
                </Typography>
              </Alert>

              Referral Stats
              <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  📊 Your Referral Details
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Referral Code:</Typography>
                  <Typography variant="caption" fontWeight="bold">{referralCode}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                     We’ve sent a email to your registered email address.
                  </Typography>
                  
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Status:</Typography>
                  <Chip label="Active" size="small" color="success" sx={{ height: 16, fontSize: '0.6rem' }} />
                </Box>
              </Paper>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Your Referral Link:
              </Typography>
              
              <Box
  sx={{
    p: 2,
    bgcolor: 'grey.50',
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'grey.300',
    mb: 3,
    position: 'relative'
  }}
>
  <Typography
    variant="body2"
    sx={{
      wordBreak: 'break-all',
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      pr: 1
    }}
  >
    {generatedLink || 'Referral link will appear here after generation'}
  </Typography>
</Box>

{/* 
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  💡 <strong>Pro Tips:</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 1, pl: 2 }}>
                  • Share on social media for maximum reach<br/>
                  • Include a personal message explaining MetaMatrix benefits<br/>
                  • Track your earnings in the referral dashboard<br/>
                  • Payouts are processed monthly on the 1st
                </Typography>
              </Box> */}

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={copyToClipboard}
                  startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                  color={copied ? "success" : "primary"}
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  color="primary"
                >
                  Done
                </Button>
              </Box>
            </MotionBox>
          )}
        </Box>
      </MotionPaper>
    </Modal>
  );
};

export default ReferralModal;