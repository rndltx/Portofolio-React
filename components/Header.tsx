'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box,
  useTheme,
  LinearProgress
} from '@mui/material';
import { MenuIcon, Moon, Sun, Code } from 'lucide-react';

const Header = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const navItems = React.useMemo(() => [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'projects', label: 'Projects' }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Update header background
      setScrolled(window.scrollY > 20);

      // Update active section
      const currentSection = navItems.find(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

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
      <LinearProgress 
        variant="determinate" 
        value={scrollProgress}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          bgcolor: 'transparent',
          '& .MuiLinearProgress-bar': {
            bgcolor: 'primary.main',
          }
        }}
      />
      
      <Container maxWidth="lg">
        <Toolbar sx={{ 
          my: 1,
          borderRadius: '16px',
          transition: 'all 0.3s ease-in-out',
          gap: 2
        }}>
          {/* Logo Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            flexGrow: { xs: 1, md: 0 }
          }}>
            <Code size={32} color={theme.palette.primary.main} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}
            >
              RIZSIGN.
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1,
            mx: 'auto'
          }}>
            {navItems.map(({ id, label }) => (
              <Button 
                key={id}
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{ 
                  px: 2,
                  py: 1,
                  color: activeSection === id ? 'primary.main' : 'text.primary',
                  position: 'relative',
                  fontWeight: activeSection === id ? 700 : 500,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: activeSection === id ? '100%' : '0%',
                    height: '2px',
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease-in-out'
                  }
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton 
              onClick={() => setIsDark(!isDark)}
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { transform: 'rotate(180deg)' },
                transition: 'transform 0.3s ease'
              }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>

            <Button 
              variant="contained"
              component={Link}
              href="/login"
              sx={{
                display: { xs: 'none', md: 'flex' },
                px: 3,
                py: 1,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.39)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(25, 118, 210, 0.39)',
                }
              }}
            >
              Login
            </Button>

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { md: 'none' } }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile Menu Items */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                '& .MuiList-root': {
                  p: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {navItems.map(({ id, label }) => (
              <MenuItem
                key={id}
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  setAnchorEl(null);
                }}
                sx={{
                  borderRadius: 1,
                  my: 0.5,
                  color: activeSection === id ? 'primary.main' : 'inherit',
                  fontWeight: activeSection === id ? 600 : 400,
                }}
              >
                {label}
              </MenuItem>
            ))}
            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                href="/login"
                sx={{ textTransform: 'none', borderRadius: 1 }}
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