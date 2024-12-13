'use client'

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Container,
  Fade,
  CircularProgress
} from '@mui/material';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url: string;
  technologies: string[];
}

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
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
      id="projects" 
      sx={{
        minHeight: '100vh',
        py: 12,
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
              My Projects
            </Typography>

            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={project.id || index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          position: 'relative', 
                          paddingTop: '60%',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          component="img"
                          src={project.image_url}
                          alt={project.title}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            }
                          }}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography 
                          variant="h5" 
                          gutterBottom
                          sx={{
                            fontWeight: 'bold',
                            color: 'primary.main'
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {project.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <Typography
                              key={index}
                              variant="caption"
                              sx={{
                                px: 1,
                                py: 0.5,
                                borderRadius: '12px',
                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                color: 'primary.main',
                                fontWeight: 500
                              }}
                            >
                              {tech}
                            </Typography>
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          size="small" 
                          onClick={() => handleProjectClick(project)}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600
                          }}
                        >
                          Learn More
                        </Button>
                        {project.project_url && (
                          <Button 
                            size="small" 
                            href={project.project_url} 
                            target="_blank"
                            startIcon={<ExternalLink size={16} />}
                            sx={{
                              textTransform: 'none',
                              fontWeight: 600
                            }}
                          >
                            Live Demo
                          </Button>
                        )}
                        {project.github_url && (
                          <Button 
                            size="small" 
                            href={project.github_url} 
                            target="_blank"
                            startIcon={<Github size={16} />}
                            sx={{
                              textTransform: 'none',
                              fontWeight: 600
                            }}
                          >
                            GitHub
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 2
          }
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle 
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              {selectedProject.title}
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                {selectedProject.description}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                Technologies Used:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedProject.technologies.map((tech, index) => (
                  <Typography
                    key={index}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: '20px',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: 500
                    }}
                  >
                    {tech}
                  </Typography>
                ))}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button 
                onClick={handleClose}
                variant="outlined"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Close
              </Button>
              {selectedProject.project_url && (
                <Button 
                  href={selectedProject.project_url} 
                  target="_blank"
                  variant="contained"
                  startIcon={<ExternalLink size={16} />}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  View Live Demo
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ProjectsSection;

