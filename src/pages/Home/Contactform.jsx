import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography,
  styled
} from '@mui/material';

// Custom styled components with the color theme from your original code (#0A2725)
const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0A2725', // Matching your theme's primary.main color
  borderRadius: '16px',
  padding: '60px 40px',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  boxShadow: '0 8px 32px rgba(10, 39, 37, 0.2)',
  position: 'relative',
  overflow: 'hidden',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(5px)',
  borderRadius: '12px',
  padding: '40px',
  maxWidth: '800px',
  margin: '20px auto 0',
  position: 'relative',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(239, 249, 249, 0.05)', // Using your secondary.main color with opacity
    borderRadius: '8px',
    color: 'white',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: 'rgba(239, 249, 249, 0.08)',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(239, 249, 249, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(239, 249, 249, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(239, 249, 249, 0.5)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(239, 249, 249, 0.7)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(239, 249, 249, 0.9)',
  },
  '& input::placeholder, & textarea::placeholder': {
    color: 'rgba(239, 249, 249, 0.6)',
    opacity: 1,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0D3635', // Slightly lighter than primary for contrast
  color: 'white',
  padding: '12px',
  borderRadius: '8px',
  textTransform: 'uppercase',
  fontWeight: '600',
  width: '400px',
  maxWidth: '100%',
  fontSize: '16px',
  letterSpacing: '1px',
  margin: '20px auto 0',
  display: 'block',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: '#245F5C', // Using your gradient end color
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(10, 39, 37, 0.25)',
  },
}));

// Decorative line elements
const DiagonalLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '1500px',
  height: '1px',
  backgroundColor: 'rgba(239, 249, 249, 0.07)', // Using your secondary color with opacity
  transform: 'rotate(-25deg)',
}));

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form after submission
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: ''
    });
    
    setIsSubmitting(false);
    
    // Here you would normally handle the form submission to your backend
    console.log('Form submitted:', formData);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <StyledContainer>
        {/* Decorative diagonal lines */}
        <DiagonalLine sx={{ top: '10%', left: '-300px' }} />
        <DiagonalLine sx={{ bottom: '15%', right: '-300px' }} />
        
        {/* Section title */}
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            color: 'white', 
            textAlign: 'center', 
            fontWeight: 600,
            letterSpacing: '1px'
          }}
        >
          SEND US A MESSAGE
        </Typography>
        
        {/* Form container */}
        <FormContainer>
          <Box component="form" onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              variant="outlined"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: 'white' } }}
            />
            
            <StyledTextField
              fullWidth
              variant="outlined"
              id="email"
              name="email"
              placeholder="E-mail"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: 'white' } }}
            />
            
            <StyledTextField
              fullWidth
              variant="outlined"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: 'white' } }}
            />
            
            <StyledTextField
              fullWidth
              variant="outlined"
              id="message"
              name="message"
              placeholder="Your Message"
              multiline
              rows={5}
              value={formData.message}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: 'white' } }}
            />
            
            <SubmitButton 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SENDING...' : 'SEND'}
            </SubmitButton>
          </Box>
        </FormContainer>
      </StyledContainer>
    </Container>
  );
};

export default ContactFormSection;