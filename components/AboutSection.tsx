'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Grid,
  Paper,
  Container,
  IconButton,
  CircularProgress,
  Skeleton
} from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

interface AboutData {
  id?: number;
  name: string;
  title: string;
  description: string;
  skills: string[];
  profile_image?: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    about: AboutData;
    heroSlides: any[];
  };
  error?: string;
}

const API_URL = 'https://www.api.rizsign.com/api';
const FALLBACK_IMAGE = '/placeholder.jpg';

const AboutSection: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData>({
    name: '',
    title: '',
    description: '',
    skills: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${API_URL}/about/index.php`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        
        if (!result.success || !result.data?.about) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        const { about } = result.data;
        
        setAboutData({
          ...about,
          skills: Array.isArray(about.skills) ? about.skills : JSON.parse(about.skills || '[]')
        });
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="circular" width={280} height={280} sx={{ mx: 'auto', mb: 4 }} />
            <Skeleton variant="text" width="80%" height={60} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto', mb: 4 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={80} sx={{ mb: 4 }} />
            <Skeleton variant="text" height={200} sx={{ mb: 4 }} />
            <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
            {[1,2,3].map((_, i) => (
              <Skeleton key={i} variant="text" height={30} sx={{ mb: 2 }} />
            ))}
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        p: 4,
        textAlign: 'center'
      }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      component="section" 
      id="about" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 12,
        background: '#ffffff',  // Changed to white
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper 
                elevation={0} 
                sx={{
                  p: 8,
                  textAlign: 'center',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.9)',  // Changed to white with slight transparency
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',  // Lighter shadow
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.15)',  // Lighter hover shadow
                  }
                }}
              >
                <Box 
                  sx={{
                    position: 'relative',
                    width: 280,
                    height: 280,
                    mx: 'auto',
                    mb: 6,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-12px',
                      border: '3px solid',
                      borderColor: 'primary.main',
                      borderRadius: '50%',
                      animation: 'spin 20s linear infinite',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: '-20px',
                      border: '3px dashed',
                      borderColor: 'primary.light',
                      borderRadius: '50%',
                      animation: 'spin 30s linear infinite reverse',
                    }
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={aboutData.profile_image || FALLBACK_IMAGE} 
                      alt={aboutData.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      style={{ 
                        border: '4px solid white',
                        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)'
                      }}
                    />
                  </motion.div>
                </Box>

                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2
                  }}
                >
                  {aboutData.name}
                </Typography>

                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'text.secondary',
                    fontWeight: 500,
                    mb: 4
                  }}
                >
                  {aboutData.title}
                </Typography>

                <Button 
                  variant="contained" 
                  endIcon={<ChevronRight />}
                  onClick={handleClickOpen}
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.39)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.39)',
                    }
                  }}
                >
                  Learn More About Me
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography 
                variant="h3" 
                sx={{
                  fontWeight: 800,
                  mb: 4,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-12px',
                    left: 0,
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    borderRadius: '2px'
                  }
                }}
              >
                About Me
              </Typography>

              <Typography 
                variant="body1" 
                sx={{
                  fontSize: '1.2rem',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  mb: 4
                }}
              >
                {aboutData.description}
              </Typography>

              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3,
                  fontWeight: 700
                }}
              >
                Technical Expertise
              </Typography>

              <Box sx={{ mb: 4 }}>
                {aboutData.skills.map((skill, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" fontWeight={500}>
                        {skill}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Dialog 
          open={open} 
          onClose={handleClose} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '24px',
              p: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }
          }}
        >
          <DialogTitle 
            sx={{
              fontSize: '2.5rem',
              fontWeight: 800,
              textAlign: 'center',
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              pr: 6
            }}
          >
            More About Me
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 24,
                top: 24,
                color: 'primary.main'
              }}
            >
              <X />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Typography 
              paragraph
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                textAlign: 'justify'
              }}
            >
              {aboutData.description}
            </Typography>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AboutSection;

