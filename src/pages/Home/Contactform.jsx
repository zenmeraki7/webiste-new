import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Container, 
    TextField, 
    Typography,
    styled,
    useTheme,
    useMediaQuery
} from '@mui/material';

// Custom styled components with the color theme from your original code (#0A2725)
const StyledContainer = styled(Box)(({ theme }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return ({
        backgroundColor: '#0A2725',
        borderRadius: isMobile ? '12px' : '16px',
        padding: isMobile ? '40px 20px' : '60px 40px',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(10, 39, 37, 0.2)',
        position: 'relative',
        overflow: 'hidden',
    });
});

const FormContainer = styled(Box)(({ theme }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return ({
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(5px)',
        borderRadius: '12px',
        padding: isMobile ? '20px' : '40px',
        maxWidth: '800px',
        margin: '20px auto 0',
        position: 'relative',
    });
});

const StyledTextField = styled(TextField)(({ theme }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return ({
        marginBottom: '20px',
        '& .MuiInputBase-root': {
            backgroundColor: 'rgba(239, 249, 249, 0.05)',
            borderRadius: '8px',
            color: 'white',
            transition: 'all 0.3s',
            fontSize: isMobile? '0.8rem' : '1rem',
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
            fontSize: isMobile? '0.8rem' : '1rem',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'rgba(239, 249, 249, 0.9)',
            fontSize: isMobile? '0.8rem' : '1rem',
        },
        '& input::placeholder, & textarea::placeholder': {
            color: 'rgba(239, 249, 249, 0.6)',
            opacity: 1,
            fontSize: isMobile? '0.8rem' : '1rem',
        },
    });
});

const SubmitButton = styled(Button)(({ theme }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return({
        backgroundColor: '#0D3635',
        color: 'white',
        padding: isMobile ? '10px 16px' : '12px',
        borderRadius: '8px',
        textTransform: 'uppercase',
        fontWeight: '600',
        width: isMobile ? '100%' : '400px',
        maxWidth: '100%',
        fontSize: isMobile ? '14px' : '16px',
        letterSpacing: '1px',
        margin: '20px auto 0',
        display: 'block',
        transition: 'all 0.3s',
        '&:hover': {
            backgroundColor: '#245F5C',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(10, 39, 37, 0.25)',
        },
    });
});

// Decorative line elements
const DiagonalLine = styled(Box)(({ theme }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return({
        position: 'absolute',
        width: isMobile? '1200px' : '1500px',
        height: '1px',
        backgroundColor: 'rgba(239, 249, 249, 0.07)',
        transform: 'rotate(-25deg)',
    });
});

const ContactFormSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

    try {
        const response = await fetch("https://getform.io/f/bmddevga", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log('Form submitted:', formData);
            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                message: ''
            });
            alert('Your message has been sent successfully!');
        } else {
            alert('There was an error submitting the form. Please try again.');
        }
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert('Network error. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
};


    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <StyledContainer>
                {/* Decorative diagonal lines */}
                <DiagonalLine sx={{ top: '10%', left: '-300px' }} />
                <DiagonalLine sx={{ bottom: '15%', right: '-300px' }} />
                
                {/* Section title */}
                <Typography 
                    variant={isMobile ? 'h5' : 'h4'}
                    component="h2" 
                    sx={{ 
                        color: 'white', 
                        textAlign: 'center', 
                        fontWeight: 600,
                        letterSpacing: '1px',
                        fontSize: isMobile ? '1.5rem' : '2.25rem'
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
                            rows={isMobile ? 3 : 5}
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
