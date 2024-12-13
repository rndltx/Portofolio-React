'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Box, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Add API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
}

// Add interfaces
interface ApiSlide {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
}

interface ApiResponse {
  success: boolean;
  heroSlides?: ApiSlide[];
  error?: string;
}

const HeroSlideshow: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        if (!API_URL) throw new Error('API URL not configured');

        const response = await fetch(`${API_URL}/about`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data: ApiResponse = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch slides');
        }

        if (data.heroSlides) {
          const transformedSlides = data.heroSlides.map(slide => ({
            id: slide.id,
            imageUrl: slide.image_url,
            title: slide.title,
            subtitle: slide.subtitle
          }));
          setSlides(transformedSlides);
        } else {
          throw new Error('No slides data found');
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
        setError(error instanceof Error ? error.message : 'Failed to load slides');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (!isHovered && slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length, isHovered]);

  if (isLoading) {
    return (
      <Box className="w-full h-screen flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || slides.length === 0) {
    return (
      <Box className="w-full h-screen flex items-center justify-center">
        <Typography variant="h5" color="error">
          {error || 'No slides available'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].imageUrl}
            alt={slides[currentSlide].title}
            layout="fill"
            objectFit="cover"
            priority
            className="transform scale-105"
          />
          <Box 
            className="absolute inset-0" 
            sx={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-white px-4"
            >
              <Typography 
                variant="h1" 
                sx={{
                  mb: 4,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '-1px',
                }}
              >
                {slides[currentSlide].title}
              </Typography>
              <Typography 
                variant="h4"
                sx={{
                  mb: 6,
                  fontSize: { xs: '1.2rem', md: '1.8rem' },
                  fontWeight: 400,
                  opacity: 0.9,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {slides[currentSlide].subtitle}
              </Typography>
              <Button
                variant="contained"
                href="#about"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.39)',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.39)',
                  }
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <Box sx={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: currentSlide === index ? 24 : 12,
                height: 4,
                borderRadius: 2,
                bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'white',
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Arrow Controls */}
      <IconButton
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 40 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.2)',
          }
        }}
      >
        <ChevronLeft size={32} />
      </IconButton>
      <IconButton
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 40 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.2)',
          }
        }}
      >
        <ChevronRight size={32} />
      </IconButton>
    </Box>
  );
};

export default HeroSlideshow;

