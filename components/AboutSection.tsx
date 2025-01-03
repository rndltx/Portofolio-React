'use client'

import React, { useState, useEffect } from 'react';
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
  created_at?: string;
  updated_at?: string;
}

interface HeroSlide {
  id?: number;
  name: string;
  title: string;
  description: string;
  skills: string[];
  created_at?: string;
  updated_at?: string;
  profile_image?: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    about: AboutData;
    heroSlides: HeroSlide[];
  };
  error?: string;
}

const API_URL = 'https://www.api.rizsign.com/api';
const FALLBACK_IMAGE = 'https://www.api.rizsign.com/uploads/placeholder.jpg';

const SkillTag = ({ skill }: { skill: string }) => (
  <Box
    sx={{
      display: 'inline-block',
      m: 0.5,
      px: 3,
      py: 1,
      borderRadius: '50px',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      color: 'primary.main',
      fontWeight: 500,
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        backgroundColor: 'rgba(25, 118, 210, 0.15)',
      }
    }}
  >
    {skill}
  </Box>
);

const ProfileContainer = ({ aboutData }: { aboutData: AboutData }) => (
  <Box 
    sx={{
      position: 'relative',
      width: { xs: 220, sm: 280 },
      height: { xs: 220, sm: 280 },
      mx: 'auto',
      mb: { xs: 4, sm: 6 },
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '-12px',
        border: '3px solid',
        borderColor: 'primary.main',
        borderRadius: '50%',
        animation: 'spin 20s linear infinite',
        background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.1), rgba(66, 165, 245, 0.1))',
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
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          padding: 1,
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          border: '4px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#fff'
          }}
        >
          <motion.img
            src={aboutData.profile_image || FALLBACK_IMAGE}
            alt={aboutData.name}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Box>
    </motion.div>
  </Box>
);

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

        // Construct proper image URL
        const profileImage = about.profile_image
        
        setAboutData({
          ...about,
          profile_image: profileImage,
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

  // Get first paragraph only
  const firstParagraph = aboutData.description.split('\n')[0];

  return (
    <Box 
      component="section" 
      id="about" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, sm: 12 },
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, transparent 50%)',
          animation: 'gradientMove 15s ease infinite',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Paper 
                elevation={0} 
                sx={{
                  p: { xs: 4, sm: 6, md: 8 },
                  textAlign: 'center',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.15)',
                    borderColor: 'primary.light',
                  }
                }}
              >
                <ProfileContainer aboutData={aboutData} />

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
                    backgroundSize: '200% 200%',
                    animation: 'gradient 5s ease infinite',
                    boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.39)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.39)',
                      background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
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
                    borderRadius: '2px',
                    animation: 'pulse 2s infinite',
                  }
                }}
              >
                About Me
              </Typography>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Typography 
                  variant="body1" 
                  sx={{
                    fontSize: '1.2rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    mb: 4,
                    textAlign: 'justify'
                  }}
                >
                  {firstParagraph}
                </Typography>
              </motion.div>

              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3,
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Technical Expertise
              </Typography>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Box 
                  sx={{ 
                    mb: 4,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1
                  }}
                >
                  {aboutData.skills.map((skill, index) => (
                    <SkillTag key={index} skill={skill} />
                  ))}
                </Box>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>

        <Dialog 
          open={open} 
          onClose={handleClose} 
          maxWidth="md" 
          fullWidth
          TransitionProps={{
            timeout: {
              enter: 500,
              exit: 300
            }
          }}
          PaperProps={{
            sx: {
              borderRadius: '24px',
              p: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
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
            {aboutData.description.split('\n').map((paragraph, index) => (
              <Typography 
                key={index}
                paragraph
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  textAlign: 'justify',
                  mb: 2 // Add margin bottom between paragraphs
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </DialogContent>
        </Dialog>
      </Container>

      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gradientMove {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default AboutSection;

