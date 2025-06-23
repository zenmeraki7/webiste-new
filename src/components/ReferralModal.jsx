import React, { useState } from 'react';
import {
  Box, Button, Divider, IconButton, Modal, TextField, Alert, 
  CircularProgress, Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// Create motion components
const MotionBox = motion(Box);
const MotionPaper = motion.div;
const MotionButton = motion(Button);

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
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReferralLink = () => {
    // Generate a unique referral code based on user data
    const timestamp = Date.now();
    const nameCode = formData.name.replace(/\s+/g, '').toLowerCase();
    const randomCode = Math.random().toString(36).substring(2, 8);
    return `https://apps.shopify.com/metamatrix?ref=${nameCode}_${randomCode}_${timestamp}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate referral link
      const link = generateReferralLink();
      setGeneratedLink(link);
      setShowSuccess(true);
      
      // Reset form
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error generating referral link:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
    setShowSuccess(false);
    setGeneratedLink('');
    setIsSubmitting(false);
    onClose();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
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
                bgcolor: theme?.palette?.primary?.main || '#0e3b39',
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
              <Typography
                id="referral-modal-description"
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Fill in your details below to generate your personalized referral link for MetaMatrix.
              </Typography>

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
                    helperText={errors.name}
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
                    helperText={errors.email}
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
                    helperText={errors.phone}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                  />
                </Box>

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
                icon={<LinkIcon />}
              >
                Your referral link has been generated successfully!
              </Alert>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Your Referral Link:
              </Typography>
              
              <Box sx={{ 
                p: 2, 
                bgcolor: 'grey.50', 
                borderRadius: 1, 
                border: '1px solid',
                borderColor: 'grey.300',
                mb: 3
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    wordBreak: 'break-all',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem'
                  }}
                >
                  {generatedLink}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={copyToClipboard}
                  startIcon={<LinkIcon />}
                >
                  Copy Link
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