import React from 'react';
import { Container, Typography, Link, Grid, Box, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Email } from '@mui/icons-material';

const Footer = () => {
  const socialLinks = [
    { icon: <GitHub />, url: "https://github.com" },
    { icon: <LinkedIn />, url: "https://linkedin.com" },
    { icon: <Twitter />, url: "https://twitter.com" },
    { icon: <Email />, url: "mailto:your.email@example.com" },
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
        background: 'linear-gradient(to top, #1a237e, #303f9f)',
        color: 'white',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              My Portfolio
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Creating beautiful web experiences with modern technologies.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      transform: 'translateX(5px)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Typography variant="body2" paragraph>
              Email: your.email@example.com
            </Typography>
            <Typography variant="body2" paragraph>
              Location: Your City, Country
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 4,
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} My Portfolio. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <Link 
              href="#" 
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Privacy Policy
            </Link>
            {' | '}
            <Link 
              href="#" 
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
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
