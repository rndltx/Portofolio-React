'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { MenuIcon } from 'lucide-react';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Update active section based on scroll position
      const sections = ['home', 'about', 'timeline', 'projects'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      elevation={scrolled ? 4 : 0}
      sx={{
        transition: 'all 0.3s ease-in-out',
        bgcolor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          sx={{ 
            my: 1,
            borderRadius: '16px', 
            bgcolor: scrolled ? 'transparent' : 'background.paper',
            boxShadow: scrolled ? 'none' : '0 4px 30px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center',
              gap: 1
            }}
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}
            >
              Hai;
            </Typography>
          </Box>

          <nav className="hidden md:flex items-center gap-2">
            {['home', 'about', 'timeline', 'projects'].map((item) => (
              <Button 
                key={item}
                onClick={() => scrollToSection(item)}
                sx={{ 
                  mx: 0.5,
                  px: 2,
                  py: 1,
                  color: activeSection === item ? 'primary.main' : 'text.primary',
                  position: 'relative',
                  textTransform: 'capitalize',
                  fontWeight: activeSection === item ? 700 : 500,
                  '&:hover': {
                    bgcolor: 'transparent',
                    '&::after': {
                      width: '100%',
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: activeSection === item ? '100%' : '0%',
                    height: '2px',
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease-in-out'
                  }
                }}
              >
                {item}
              </Button>
            ))}
            <Button 
              variant="contained" 
              color="primary"
              component={Link}
              href="/login"
              sx={{ 
                ml: 2,
                px: 3,
                py: 1,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.39)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(25, 118, 210, 0.39)',
                }
              }}
            >
              Login
            </Button>
          </nav>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ 
              display: { md: 'none' },
              color: 'primary.main'
            }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 2,
                borderRadius: '12px',
                minWidth: '200px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }
            }}
          >
            {['home', 'about', 'timeline', 'projects'].map((item) => (
              <MenuItem 
                key={item} 
                onClick={() => scrollToSection(item)}
                sx={{
                  py: 1.5,
                  px: 3,
                  textTransform: 'capitalize',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    color: 'primary.main',
                  }
                }}
              >
                {item}
              </MenuItem>
            ))}
            <Box sx={{ px: 2, py: 1 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component={Link}
                href="/login"
                sx={{
                  textTransform: 'none',
                  borderRadius: '8px',
                  py: 1,
                }}
              >
                Login
              </Button>
            </Box>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

