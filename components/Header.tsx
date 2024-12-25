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
        bgcolor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
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
          height: '3px',
          bgcolor: 'transparent',
          '& .MuiLinearProgress-bar': {
            bgcolor: 'primary.main',
            backgroundImage: 'linear-gradient(45deg, #1976d2, #42a5f5)',
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
            flexGrow: { xs: 1, md: 0 },
            '&:hover': {
              '& svg': {
                transform: 'rotate(360deg)',
              },
              '& .logo-text': {
                backgroundPosition: 'right center',
              }
            }
          }}>
            <Code size={32} color={theme.palette.primary.main} style={{ transition: 'transform 0.6s ease' }} />
            <Typography 
              variant="h5" 
              className="logo-text"
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(to right, #1976d2, #42a5f5, #1976d2)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                transition: 'background-position 0.6s ease',
              }}
            >
              RIZSIGN.
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 2,
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
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    bgcolor: 'primary.main',
                    transition: 'transform 0.3s ease-in-out',
                    transform: activeSection === id ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left'
                  },
                  '&:hover': {
                    '&::before': {
                      transform: 'scaleX(1)',
                    }
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
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                backdropFilter: 'blur(4px)',
                '&:hover': { 
                  transform: 'rotate(180deg)',
                  bgcolor: 'rgba(25, 118, 210, 0.2)',
                },
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
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
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundSize: '200% auto',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  backgroundPosition: 'right center',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
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