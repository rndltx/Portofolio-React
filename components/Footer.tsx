import React from 'react';
import { Container, Typography, Link, Grid, Box, IconButton, Paper } from '@mui/material';
import { GitHub, LinkedIn, Instagram, Email, LocationOn } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Footer = () => {
  const coordinates = {
    lat: -3.4427, // Replace with your actual coordinates
    lng: 114.8432 // Replace with your actual coordinates
  };

  const mapContainerStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '8px',
    marginTop: '16px'
  };

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
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        py: 8,
        mt: 8,
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #00ff87, #60efff)',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00ff87, #60efff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 3
              }}
            >
              Khairun Rizaldy
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.8 }}>
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
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-5px) scale(1.1)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Middle Column */}
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
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateX(10px)',
                      color: '#00ff87',
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

          {/* Right Column */}
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
            <Paper elevation={0} sx={{ 
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              p: 3,
              backdropFilter: 'blur(10px)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 2, color: '#00ff87' }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  xnuxerx@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
                <LocationOn sx={{ mr: 2, color: '#00ff87' }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Jl. Sagitarius III No 15H, Banjarbaru, Kalimantan Selatan
                </Typography>
              </Box>
              
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={coordinates}
                  zoom={15}
                  options={{
                    styles: [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }],
                    scrollwheel: false
                  }}
                >
                  <Marker position={coordinates} />
                </GoogleMap>
              </LoadScript>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
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
            {['Privacy Policy', 'Terms of Service'].map((text, index) => (
              <Link 
                key={index}
                href="#" 
                sx={{ 
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    opacity: 1,
                    color: '#00ff87',
                    textDecoration: 'underline'
                  },
                  mx: 2
                }}
              >
                {text}
              </Link>
            ))}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;