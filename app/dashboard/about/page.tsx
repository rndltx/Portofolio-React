'use client'

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Grid,  
  Box, 
  Card, 
  CardContent, 
  Snackbar,
  Alert,
  LinearProgress 
} from '@mui/material';
import { Upload, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Update API URL for proper domain
const API_URL = 'https://www.api.rizsign.com/api';

// Add image preview component
const ImagePreview = ({ src, alt }: { src: string; alt: string }) => (
  <Box
    component="img"
    src={src}
    alt={alt}
    sx={{
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      mb: 2
    }}
  />
);

// Update ProfileImagePreview component
const ProfileImagePreview = ({ src, alt }: { src: string; alt: string }) => (
  <Box
    sx={{
      width: 100,
      height: 100,
      borderRadius: '50%',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
      border: '3px solid white'
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  </Box>
);

// Update interfaces 
interface Slide {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  uploadProgress: number;
  imageFile?: File;
  imagePreview?: string;
  created_at?: string;
  updated_at?: string;
}

// Update interfaces to match database schema
interface AboutData {
  id?: number;
  name: string;
  title: string;
  description: string;
  skills: string[];
  heroSlides: HeroSlide[];
  created_at?: string;
  updated_at?: string;
  profile_image?: string;
}

interface HeroSlide {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  created_at?: string;
  updated_at?: string;
  uploadProgress?: number;
  imageFile?: File;
  imagePreview?: string;
}

const AboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    name: '',
    title: '',
    description: '',
    skills: [],
    heroSlides: [], 
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Update fetchAboutData function
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

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch data');
      }

      // Transform data to match component state
      const transformedData: AboutData = {
        ...result.data.about,
        // Fix profile image URL construction
        profile_image: result.data.about.profile_image || '/placeholder.jpg',
        skills: Array.isArray(result.data.about.skills) 
          ? result.data.about.skills 
          : JSON.parse(result.data.about.skills || '[]'),
        heroSlides: result.data.heroSlides.map((slide: HeroSlide) => ({
          ...slide,
          uploadProgress: 0,
          imagePreview: slide.image_url
        }))
      };

      setAboutData(transformedData);
    } catch (error) {
      console.error('Fetch error:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to fetch data',
        severity: 'error'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsInput = e.target.value.trim();
    const skills = skillsInput ? skillsInput.split(',').map(skill => skill.trim()) : [];
    setAboutData(prev => ({ ...prev, skills }));
  };

  const handleSlideChange = (id: number, field: keyof Slide, value: string) => {
    setAboutData(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map(slide =>
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    }));
  };

  // Update image upload handler
  const handleImageUpload = (slideId: number | undefined, file: File) => {
    if (typeof slideId === 'undefined') {
      console.error('Slide ID is required');
      setSnackbar({
        open: true,
        message: 'Error uploading image: Invalid slide',
        severity: 'error'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePreview = e.target?.result as string;
      setAboutData(prev => ({
        ...prev,
        heroSlides: prev.heroSlides.map(slide =>
          slide.id === slideId ? { ...slide, imageFile: file, imagePreview, uploadProgress: 0 } : slide
        )
      }));
      simulateUpload(slideId);
    };
    reader.readAsDataURL(file);
  };

  const simulateUpload = (id: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAboutData(prev => ({
        ...prev,
        heroSlides: prev.heroSlides.map(slide =>
          slide.id === id ? { ...slide, uploadProgress: progress } : slide
        )
      }));
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  // Add handler for new slides
  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now(),
      title: '',
      subtitle: '',
      image_url: '/placeholder.jpg',
      uploadProgress: 0,
      imagePreview: '/placeholder.jpg'
    };
    setAboutData(prev => ({
      ...prev,
      heroSlides: [...prev.heroSlides, newSlide]
    }));
  };

  const handleDeleteSlide = (id: number) => {
    setAboutData(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.filter(slide => slide.id !== id)
    }));
  };

  // Update fetch calls with credentials
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Handle profile image upload if it's a data URL
      let profileImageUrl = aboutData.profile_image;
      if (aboutData.profile_image && aboutData.profile_image.startsWith('data:')) {
        const formData = new FormData();
        const file = dataURLtoFile(aboutData.profile_image, 'profile.jpg');
        formData.append('image', file);
        formData.append('type', 'profile');
        
        const uploadResp = await fetch(`${API_URL}/upload.php`, {
          method: 'POST',
          credentials: 'include',
          body: formData
        });

        if (!uploadResp.ok) {
          throw new Error('Failed to upload profile image');
        }

        const uploadResult = await uploadResp.json();
        profileImageUrl = uploadResult.url;
      } else if (profileImageUrl && profileImageUrl.startsWith(API_URL)) {
        // If it's a full URL, extract just the filename
        profileImageUrl = profileImageUrl.split('/').pop() || '';
      }

      // Handle image uploads for hero slides
      const uploadPromises = aboutData.heroSlides
        .filter(slide => slide.imageFile)
        .map(async (slide) => {
          const formData = new FormData();
          formData.append('image', slide.imageFile as File);
          formData.append('slideId', slide.id.toString());
          
          const response = await fetch(`${API_URL}/upload.php`, {
            method: 'POST',
            credentials: 'include',
            body: formData
          });

          if (!response.ok) {
            throw new Error(`Failed to upload image for slide ${slide.id}`);
          }

          const result = await response.json();
          return { ...slide, image_url: result.url };
        });

      const updatedSlides = await Promise.all(uploadPromises);

      // Update about data with new image URLs
      const response = await fetch(`${API_URL}/about/index.php`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          about: {
            name: aboutData.name,
            title: aboutData.title,
            description: aboutData.description,
            skills: aboutData.skills,
            profile_image: profileImageUrl
          },
          heroSlides: aboutData.heroSlides.map(slide => {
            const updatedSlide = updatedSlides.find(us => us.id === slide.id);
            return {
              id: slide.id,
              image_url: updatedSlide ? updatedSlide.image_url : (slide.image_url.split('/').pop() || ''),
              title: slide.title,
              subtitle: slide.subtitle
            };
          })
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update data');
      }

      setSnackbar({
        open: true,
        message: 'Data updated successfully',
        severity: 'success'
      });

      fetchAboutData();
    } catch (error) {
      console.error('Submit error:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to update data',
        severity: 'error'
      });
    }
  };

  // Add helper function to convert Data URL to File
  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Update upload handler
  const handleProfileImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePreview = e.target?.result as string;
      setAboutData(prev => ({
        ...prev,
        profile_image: imagePreview
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        flexGrow: 1, 
        width: '100%',
        p: 3 
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
        Edit About Page
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card 
          elevation={0} 
          sx={{ 
            mb: 4,
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            '&:hover': {
              boxShadow: '0 6px 30px rgba(0,0,0,0.1)',
            },
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                mb: 3,
                fontWeight: 600,
                color: 'primary.main'
              }}
            >
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  name="name"
                  value={aboutData.name}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Title"
                  fullWidth
                  name="title"
                  value={aboutData.title}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  value={aboutData.description}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Skills (comma-separated)"
                  fullWidth
                  name="skills"
                  value={aboutData.skills?.join(', ') || ''} 
                  onChange={handleSkillsChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<Upload size={16} />}
                  >
                    Upload Profile Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleProfileImageUpload(file);
                        }
                      }}
                    />
                  </Button>
                  {aboutData.profile_image && (
                    <ProfileImagePreview 
                      src={aboutData.profile_image} 
                      alt={aboutData.name || 'Profile Preview'} 
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card 
          elevation={0} 
          sx={{ 
            mb: 4,
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            '&:hover': {
              boxShadow: '0 6px 30px rgba(0,0,0,0.1)',
            },
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Hero Slideshow
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSlide}
                startIcon={<Plus size={16} />}
                size="small"
              >
                Add New Slide
              </Button>
            </Box>
            {(aboutData.heroSlides || []).map((slide, index) => (
              <Box 
                key={slide.id} 
                sx={{ 
                  mb: 3,
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Slide {index + 1}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ImagePreview 
                      src={slide.imagePreview || slide.image_url} 
                      alt={slide.title} 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<Upload size={16} />}
                        size="small"
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && slide.id) {
                              handleImageUpload(slide.id, file);
                            }
                          }}
                        />
                      </Button>
                      <Typography variant="caption">
                        {slide.imageFile ? slide.imageFile.name : 'No file chosen'}
                      </Typography>
                    </Box>
                    {typeof slide.uploadProgress === 'number' && 
                      slide.uploadProgress > 0 && 
                      slide.uploadProgress < 100 && (
                      <Box sx={{ width: '100%', mt: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={slide.uploadProgress} 
                        />
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Title"
                      fullWidth
                      size="small"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Subtitle"
                      fullWidth
                      size="small"
                      value={slide.subtitle}
                      onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    color="error"
                    onClick={() => handleDeleteSlide(slide.id)}
                    startIcon={<Trash2 size={16} />}
                    size="small"
                  >
                    Delete Slide
                  </Button>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>

        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          size="large"
          sx={{
            borderRadius: '12px',
            py: 1.5,
            px: 4,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.39)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(25, 118, 210, 0.39)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          Save Changes
        </Button>
      </form>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AboutPage;

