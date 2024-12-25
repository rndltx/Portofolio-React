'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Grid, Box, Card, CardContent, CardHeader, CircularProgress, useTheme } from '@mui/material';
import { User, Clock, Briefcase, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = 'https://www.api.rizsign.com/api'

const DashboardHome = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth status
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/check/index.php`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          router.push('/login');
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const cards = [
    { 
      title: 'About Section', 
      icon: <User />, 
      description: 'Manage your personal information and skills.',
      href: '/dashboard/about'
    },
    { 
      title: 'Timeline', 
      icon: <Clock />, 
      description: 'Update your professional journey and milestones.',
      href: '/dashboard/timeline'
    },
    { 
      title: 'Projects', 
      icon: <Briefcase />, 
      description: 'Add, edit, or remove your portfolio projects.',
      href: '/dashboard/projects'
    },
    { 
      title: 'Settings', 
      icon: <Settings />, 
      description: 'Manage your account and website settings.',
      href: '/dashboard/settings'
    },
  ];

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ 
        flexGrow: 1, 
        width: '100%',
        p: 4,
        background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)'
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4,
          fontWeight: 700,
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Welcome to Your Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              component={motion.div}
              whileHover={{ 
                y: -10,
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              sx={{
                height: '100%',
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.02)',
                }
              }}
              onClick={() => window.location.href = card.href}
            >
              <CardHeader
                avatar={
                  <Box 
                    sx={{ 
                      background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                      color: 'white',
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.39)',
                    }}
                  >
                    {React.cloneElement(card.icon, { size: 24 })}
                  </Box>
                }
                title={card.title}
                titleTypographyProps={{ 
                  variant: 'h6', 
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: theme.palette.primary.main
                }}
              />
              <CardContent>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardHome;

