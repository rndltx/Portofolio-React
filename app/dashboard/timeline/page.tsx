'use client'

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  IconButton, 
  Box, 
  Card, 
  CardContent, 
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Plus, Trash2, School, Briefcase, Award, Star, Calendar, Flag } from 'lucide-react';

const API_URL = 'https://www.rizsign.com/api';

interface TimelineEvent {
  id?: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const iconOptions = [
  { value: 'School', icon: <School /> },
  { value: 'Briefcase', icon: <Briefcase /> },
  { value: 'Award', icon: <Award /> },
  { value: 'Star', icon: <Star /> },
  { value: 'Calendar', icon: <Calendar /> },
  { value: 'Flag', icon: <Flag /> },
];

const TimelinePage = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    fetchTimelineEvents();
  }, []);

  const fetchTimelineEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/timeline`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch timeline');
      }

      const data: ApiResult<TimelineEvent[]> = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to load timeline');
      }

      setEvents(data.data || []);
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to load timeline',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = () => {
    const newEvent: TimelineEvent = {
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      icon: 'Calendar'
    };
    setEvents([...events, newEvent]);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/timeline`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(events)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to update timeline');
      }

      setSnackbar({
        open: true,
        message: 'Timeline updated successfully',
        severity: 'success'
      });

      fetchTimelineEvents();
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to update timeline',
        severity: 'error'
      });
    }
  };

  const handleEventChange = (index: number, field: keyof TimelineEvent, value: string) => {
    setEvents(events.map((event, i) => 
      i === index ? { ...event, [field]: value } : event
    ));
  };

  const handleDeleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = iconOptions.find(option => option.value === iconName)?.icon;
    return IconComponent || <Calendar />;
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
        Edit Timeline
      </Typography>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add New Event
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Event Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={events[events.length - 1]?.title || ''}
                  onChange={(e) => handleEventChange(events.length - 1, 'title', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Event Date"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={events[events.length - 1]?.date || ''}
                  onChange={(e) => handleEventChange(events.length - 1, 'date', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Event Description"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={events[events.length - 1]?.description || ''}
                  onChange={(e) => handleEventChange(events.length - 1, 'description', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="new-event-icon-label">Icon</InputLabel>
                  <Select
                    labelId="new-event-icon-label"
                    value={events[events.length - 1]?.icon || 'Calendar'}
                    onChange={(e) => handleEventChange(events.length - 1, 'icon', e.target.value)}
                    label="Icon"
                  >
                    {iconOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderIcon(option.value)}
                          <Typography sx={{ ml: 1 }}>{option.value}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddEvent}
                  startIcon={<Plus size={16} />}
                  size="small"
                >
                  Add Event
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Timeline Events
            </Typography>
            {events.map((event, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Event Title"
                      fullWidth
                      size="small"
                      value={event.title}
                      onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Event Date"
                      fullWidth
                      size="small"
                      value={event.date}
                      onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Event Description"
                      multiline
                      rows={3}
                      fullWidth
                      size="small"
                      value={event.description}
                      onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id={`event-icon-label-${index}`}>Icon</InputLabel>
                      <Select
                        labelId={`event-icon-label-${index}`}
                        value={event.icon}
                        onChange={(e) => handleEventChange(index, 'icon', e.target.value)}
                        label="Icon"
                      >
                        {iconOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {renderIcon(option.value)}
                              <Typography sx={{ ml: 1 }}>{option.value}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton onClick={() => handleDeleteEvent(index)} color="error" size="small">
                      <Trash2 size={16} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </CardContent>
        </Card>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" size="small">
            Save Changes
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

export default TimelinePage;

