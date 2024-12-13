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
  CardActions,
  LinearProgress,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Plus, Trash2, Upload, Edit2 } from 'lucide-react';

interface Project {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url: string;
  technologies: string[];
  // UI states
  imageFile?: File | null;
  imagePreview?: string;
  uploadProgress?: number;
}

// Add API types
interface ProjectApiData {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url: string;
  technologies: string[];
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProject, setNewProject] = useState<Project>({
    title: '',
    description: '',
    image_url: '/placeholder.svg?height=200&width=300',
    project_url: '',
    github_url: '',
    technologies: [],
    imageFile: null,
    imagePreview: '/placeholder.svg?height=200&width=300',
    uploadProgress: 0
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      const transformedData = data.map(project => ({
        ...project,
        imagePreview: project.image_url,
        uploadProgress: 0
      }));
      
      setProjects(transformedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error fetching projects', 
        severity: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = () => {
    if (newProject.title) {
      if (editingId) {
        setProjects(projects.map(p => p.id === editingId ? { ...newProject, id: editingId } : p));
        setEditingId(null);
      } else {
        setProjects([...projects, { ...newProject, id: Date.now() }]);
      }
      setNewProject({ 
        title: '', 
        description: '', 
        image_url: '/placeholder.svg?height=200&width=300',
        project_url: '',
        github_url: '',
        technologies: [],
        imageFile: null, 
        imagePreview: '/placeholder.svg?height=200&width=300',
        uploadProgress: 0
      });
    }
  };

  const handleRemoveProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleEditProject = (project: Project) => {
    setNewProject(project);
    setEditingId(project.id);
  };

  const handleImageUpload = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePreview = e.target?.result as string;
      if (id === 0) {
        setNewProject({ ...newProject, imageFile: file, imagePreview, uploadProgress: 0 });
      } else {
        setProjects(projects.map(project =>
          project.id === id ? { ...project, imageFile: file, imagePreview, uploadProgress: 0 } : project
        ));
      }
      simulateUpload(id);
    };
    reader.readAsDataURL(file);
  };

  const simulateUpload = (id: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (id === 0) {
        setNewProject(prev => ({ ...prev, uploadProgress: progress }));
      } else {
        setProjects(prev => prev.map(project =>
          project.id === id ? { ...project, uploadProgress: progress } : project
        ));
      }
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  // Update handleSubmit to properly use UI states
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectsToSubmit: ProjectApiData[] = await Promise.all(
        projects.map(async (project) => {
          let finalImageUrl = project.image_url;

          if (project.imageFile) {
            const formData = new FormData();
            formData.append('file', project.imageFile);
            
            setProjects(prev => prev.map(p => 
              p.id === project.id ? { ...p, uploadProgress: 0 } : p
            ));

            const uploadResponse = await fetch('/api/upload', {
              method: 'POST',
              body: formData
            });
            
            if (!uploadResponse.ok) {
              throw new Error('Failed to upload image');
            }

            const { imageUrl } = await uploadResponse.json();
            finalImageUrl = imageUrl;

            setProjects(prev => prev.map(p => 
              p.id === project.id ? { 
                ...p, 
                uploadProgress: 100,
                imagePreview: imageUrl,
                image_url: imageUrl
              } : p
            ));
          }

          // Return only API data
          return {
            id: project.id,
            title: project.title,
            description: project.description,
            image_url: finalImageUrl,
            project_url: project.project_url,
            github_url: project.github_url,
            technologies: project.technologies
          };
        })
      );

      const response = await fetch('/api/projects', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectsToSubmit)
      });

      const data = await response.json();

      if (data.success) {
        setSnackbar({ 
          open: true, 
          message: 'Projects updated successfully', 
          severity: 'success' 
        });
        fetchProjects();
      } else {
        throw new Error(data.error || 'Error updating projects');
      }
    } catch (error) {
      console.error('Error saving projects:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error saving projects', 
        severity: 'error' 
      });
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Manage Projects
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card elevation={2} sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {editingId ? 'Edit Project' : 'Add New Project'}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project URL"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={newProject.project_url}
                  onChange={(e) => setNewProject({ ...newProject, project_url: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Project Description"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                        if (file) {
                          handleImageUpload(newProject.id!, file);
                        }
                      }}
                    />
                  </Button>
                  <Typography variant="caption">
                    {newProject.imageFile ? newProject.imageFile.name : 'No file chosen'}
                  </Typography>
                </Box>
                {newProject.uploadProgress! > 0 && newProject.uploadProgress! < 100 && (
                  <Box sx={{ width: '100%', mt: 1 }}>
                    <LinearProgress variant="determinate" value={newProject.uploadProgress} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddProject}
                  startIcon={editingId ? <Edit2 size={16} /> : <Plus size={16} />}
                  size="small"
                >
                  {editingId ? 'Update Project' : 'Add Project'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card>
                <CardContent>
                  <Box sx={{ position: 'relative', paddingTop: '60%', mb: 2 }}>
                    <Box
                      component="img"
                      src={project.imagePreview}
                      alt={project.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    URL: {project.project_url}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<Edit2 size={16} />} onClick={() => handleEditProject(project)}>Edit</Button>
                  <Button size="small" color="error" startIcon={<Trash2 size={16} />} onClick={() => handleRemoveProject(project.id!)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" type="submit" size="small">
            Save All Changes
          </Button>
        </Box>
      </form>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectsPage;
