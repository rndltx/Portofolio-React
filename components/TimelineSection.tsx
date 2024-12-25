'use client'

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Container,
  Fade,
  CircularProgress
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { School, Briefcase, Code, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

// Update API URL for proper domain
const API_URL = 'https://www.api.rizsign.com/api';

interface ApiResponse {
  success: boolean;
  data?: TimelineEvent[];
  error?: string;
}

interface TimelineEvent {
  id?: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

const TimelineSection: React.FC = () => {
  const [timelineItems, setTimelineItems] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTimeline();
  }, []);

  // Update fetch function
  const fetchTimeline = async () => {
    try {
      if (!API_URL) throw new Error('API URL not configured');

      const response = await fetch(`${API_URL}/timeline/index.php`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch timeline');
      }

      setTimelineItems(data.data || []);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setError(error instanceof Error ? error.message : 'Failed to load timeline');
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'School': return <School />;
      case 'Briefcase': return <Briefcase />;
      case 'Code': return <Code />;
      case 'Rocket': return <Rocket />;
      default: return <School />;
    }
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CircularProgress />
    </Box>;
  }

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Typography color="error">{error}</Typography>
    </Box>;
  }

  return (
    <Box 
      component="section" 
      id="timeline" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 16,
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.03) 0%, transparent 50%)',
          animation: 'gradientMove 15s ease infinite',
        }
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box>
            <Typography 
              variant="h2" 
              align="center" 
              sx={{
                mb: 10,
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  borderRadius: '2px'
                }
              }}
            >
              My Journey
            </Typography>

            <Timeline position="alternate">
              {timelineItems.map((item, index) => (
                <TimelineItem key={item.id || index}>
                  <TimelineSeparator>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 260,
                        damping: 20 
                      }}
                    >
                      <TimelineDot 
                        sx={{
                          bgcolor: 'white',
                          border: '2px solid',
                          borderColor: 'primary.main',
                          boxShadow: '0 0 20px rgba(25, 118, 210, 0.2)',
                          p: 2,
                          color: 'primary.main',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        {getIcon(item.icon)}
                      </TimelineDot>
                    </motion.div>
                    {index !== timelineItems.length - 1 && (
                      <TimelineConnector 
                        sx={{
                          background: 'linear-gradient(180deg, #1976d2 0%, #42a5f5 100%)',
                          width: '2px',
                          opacity: 0.3
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: 3 }}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100 
                      }}
                    >
                      <Paper 
                        elevation={0} 
                        sx={{
                          p: 3,
                          borderRadius: '16px',
                          border: '1px solid rgba(25, 118, 210, 0.1)',
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 30px rgba(25, 118, 210, 0.1)',
                            border: '1px solid rgba(25, 118, 210, 0.2)',
                          }
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          component="h1"
                          sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 1,
                            letterSpacing: '-0.5px'
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{
                            display: 'block',
                            mb: 2,
                            color: 'text.secondary',
                            fontSize: '0.95rem',
                            fontWeight: 500
                          }}
                        >
                          {new Date(item.date).getFullYear()}
                        </Typography>
                        <Typography 
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            fontSize: '0.95rem'
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </Fade>
      </Container>
      <style jsx global>{`
        @keyframes gradientMove {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default TimelineSection;

