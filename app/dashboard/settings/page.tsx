'use client'

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Save } from 'lucide-react';

interface Settings {
  name: string;
  email: string;
  bio: string;
  footerText: string;
  copyrightText: string;
}

interface ApiResponse {
  success: boolean;
  error?: string;
  data?: Settings;
}

type CustomError = Error | { message: string };

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>({
    name: '',
    email: '',
    bio: '',
    footerText: '',
    copyrightText: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data: ApiResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load settings');
      }
      
      setSettings(data.data || {
        name: '',
        email: '',
        bio: '',
        footerText: '',
        copyrightText: ''
      });
    } catch (error: unknown) {
      const customError = error as CustomError;
      setSnackbar({
        open: true,
        message: customError.message || 'Failed to load settings',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      const data: ApiResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update settings');
      }

      setSnackbar({
        open: true,
        message: 'Settings updated successfully',
        severity: 'success'
      });
    } catch (error: unknown) {
      const customError = error as CustomError;
      setSnackbar({
        open: true,
        message: customError.message || 'Failed to update settings',
        severity: 'error'
      });
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Settings
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
                <TextField
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={settings.bio}
                  onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  startIcon={<Save />}
                  sx={{ mt: 2 }}
                >
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Footer Settings
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Footer Text"
                  name="footerText"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={settings.footerText}
                  onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                />
                <TextField
                  label="Copyright Text"
                  name="copyrightText"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={settings.copyrightText}
                  onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  startIcon={<Save />}
                  sx={{ mt: 2 }}
                >
                  Update Footer
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;

