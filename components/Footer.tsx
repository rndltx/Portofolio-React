import React from 'react';
import { Container, Typography, Link, Grid, Box, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Instagram, Email, LocationOn } from '@mui/icons-material';

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
        background: '#111827',
        color: 'white',
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#fff',
                mb: 2,
                letterSpacing: '0.02em'
              }}
            >
              Khairun Rizaldy
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 3, 
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7 
              }}
            >
              Membuat Website Menjadi Lebih Indah dan Menarik Dengan Experience Luar Biasa
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    padding: '8px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      color: '#fff',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                mb: 3,
                color: '#fff'
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#fff',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                mb: 3,
                color: '#fff'
              }}
            >
              Contact
            </Typography>
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: 'rgba(255,255,255,0.7)'
                }}
              >
                <Email fontSize="small" /> xnuxerx@gmail.com
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  color: 'rgba(255,255,255,0.7)'
                }}
              >
                <LocationOn fontSize="small" sx={{ mt: 0.5 }} />
                Jl. Sagitarius III No 15H, Banjarbaru, Kalimantan Selatan
              </Typography>
              <Box sx={{ mt: 2, borderRadius: 1, overflow: 'hidden', height: 150 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.1674454054417!2d114.8301093!3d-3.4570799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de681a35566b6a3%3A0x4e4d58fff46b92db!2sJl.%20Sagitarius%20III%20No.15H%2C%20Komet%2C%20Kec.%20Banjarbaru%20Utara%2C%20Kota%20Banjar%20Baru%2C%20Kalimantan%20Selatan%2070714!5e0!3m2!1sid!2sid!4v1647827174281!5m2!1sid!2sid"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 6,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255,255,255,0.5)'
            }}
          >
            © {new Date().getFullYear()} Khairun Rizaldy. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;