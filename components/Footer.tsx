import React from 'react';
import { Container, Typography, Link, Grid, Box, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Instagram, Email } from '@mui/icons-material';

const Footer = () => {
  const socialLinks = [
    { icon: <GitHub />, url: "https://github.com/rndltx" },
    { icon: <LinkedIn />, url: "https://linkedin.com/khairun-rizaldy" },
    { icon: <Instagram />, url: "https://instagram.com/rizsign" },
    { icon: <Email />, url: "mailto:xnuxerx@gmail.com" },
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
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        py: 8,
        mt: 8,
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: '700',
                background: 'linear-gradient(90deg, #fff, #e0e0e0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 3
              }}
            >
              Khairun Rizaldy
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Membuat Website Menjadi Lebih Indah dan Menarik Dengan Experience Luar Biasa
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-5px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                mb: 3
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
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateX(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    '&::before': {
                      content: '"→"',
                      marginRight: '8px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    },
                    '&:hover::before': {
                      opacity: 1
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
                mb: 3
              }}
            >
              Contact
            </Typography>
            <Box sx={{ 
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              p: 3,
              backdropFilter: 'blur(10px)'
            }}>
              <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
                Email: xnuxerx@gmail.com
              </Typography>
              <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
                Location: Jl. Sagitarius III No 15H, Banjarbaru, Kalimantan Selatan
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 6,
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Khairun Rizaldy. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link 
              href="#" 
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                opacity: 0.8,
                '&:hover': { 
                  opacity: 1,
                  textDecoration: 'underline'
                },
                mx: 2
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                opacity: 0.8,
                '&:hover': { 
                  opacity: 1,
                  textDecoration: 'underline'
                },
                mx: 2
              }}
            >
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;