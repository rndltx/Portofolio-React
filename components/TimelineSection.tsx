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

// Add API URL and interfaces
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

      const response = await fetch(`${API_URL}/timeline`);
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
        background: '#ffffff', // Changed to solid white
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box>
            <Typography 
              variant="h2" 
              align="center" 
              sx={{
                mb: 8,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
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
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <TimelineDot 
                        sx={{
                          bgcolor: 'primary.main',
                          boxShadow: '0 0 20px rgba(25, 118, 210, 0.3)',
                          p: 2
                        }}
                      >
                        {getIcon(item.icon)}
                      </TimelineDot>
                    </motion.div>
                    {index !== timelineItems.length - 1 && (
                      <TimelineConnector 
                        sx={{
                          bgcolor: 'primary.main',
                          width: '2px'
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <Paper 
                        elevation={3} 
                        sx={{
                          p: 3,
                          borderRadius: '16px',
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                          }
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          component="h1"
                          sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            mb: 1
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
                            fontSize: '1rem'
                          }}
                        >
                          {new Date(item.date).getFullYear()}
                        </Typography>
                        <Typography 
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.7
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
    </Box>
  );
};

export default TimelineSection;

