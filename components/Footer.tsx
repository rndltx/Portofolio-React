import React from 'react';
import { Container, Typography, Link, Grid, Box, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Instagram, Email } from '@mui/icons-material';

const Footer = () => {
  const socialLinks = [
    { icon: <GitHub />, url: "https://github.com/rndltx", label: "GitHub" },
    { icon: <LinkedIn />, url: "https://linkedin.com/khairun-rizaldy", label: "LinkedIn" },
    { icon: <Instagram />, url: "https://instagram.com/rizsign", label: "Instagram" },
    { icon: <Email />, url: "mailto:xnuxerx@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { text: "Home", url: "#" },
    { text: "About", url: "#about" },
    { text: "Projects", url: "#projects" },
    { text: "Contact", url: "#contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        color: 'white',
        py: 10,
        mt: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #42a5f5, #64b5f6, #90caf9)',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: '800',
                background: 'linear-gradient(90deg, #fff, #90caf9)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 3,
                letterSpacing: '0.5px'
              }}
            >
              Khairun Rizaldy
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.7 }}>
              Membuat Website Menjadi Lebih Indah dan Menarik Dengan Experience Luar Biasa
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    padding: '12px',
                    '&:hover': {
                      backgroundColor: '#42a5f5',
                      transform: 'translateY(-5px) rotate(8deg)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: '700',
                mb: 4,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#42a5f5',
                }
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 0.9,
                    fontSize: '1.1rem',
                    '&:hover': {
                      color: '#90caf9',
                      transform: 'translateX(10px)',
                      transition: 'all 0.3s ease',
                    },
                    '&::before': {
                      content: '"→"',
                      marginRight: '10px',
                      opacity: 0,
                      transform: 'translateX(-10px)',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover::before': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    }
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: '700',
                mb: 4,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#42a5f5',
                }
              }}
            >
              Contact
            </Typography>
            <Box sx={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              borderRadius: 3,
              p: 4,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              }
            }}>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" /> xnuxerx@gmail.com
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                📍 Jl. Sagitarius III No 15H, Banjarbaru, Kalimantan Selatan
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 8,
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Khairun Rizaldy. All rights reserved.
          </Typography>
          <Box sx={{ mt: 2 }}>
            {['Privacy Policy', 'Terms of Service'].map((text, index) => (
              <Link 
                key={index}
                href="#" 
                sx={{ 
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.8,
                  position: 'relative',
                  mx: 2,
                  '&:hover': { 
                    opacity: 1,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '1px',
                    bottom: -2,
                    left: 0,
                    backgroundColor: '#90caf9',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {text}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;