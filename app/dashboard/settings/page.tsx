'use client'

import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Card, CardContent, Box, useTheme } from '@mui/material';
import { Save } from 'lucide-react';

const SettingsPage = () => {
  const theme = useTheme();
  const [profileSettings, setProfileSettings] = useState({
    name: '',
    email: '',
    bio: '',
  });
  const [footerSettings, setFooterSettings] = useState({
    footerText: '',
    copyrightText: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileSettings({
      ...profileSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFooterSettings({
      ...footerSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the profile data to your backend
    console.log('Profile Settings:', profileSettings);
  };

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the footer data to your backend
    console.log('Footer Settings:', footerSettings);
  };

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
              <form onSubmit={handleProfileSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={profileSettings.name}
                  onChange={handleProfileChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={profileSettings.email}
                  onChange={handleProfileChange}
                />
                <TextField
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={profileSettings.bio}
                  onChange={handleProfileChange}
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
              <form onSubmit={handleFooterSubmit}>
                <TextField
                  label="Footer Text"
                  name="footerText"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={footerSettings.footerText}
                  onChange={handleFooterChange}
                />
                <TextField
                  label="Copyright Text"
                  name="copyrightText"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={footerSettings.copyrightText}
                  onChange={handleFooterChange}
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
    </Box>
  );
};

export default SettingsPage;

