'use client'

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import NavSidebar from '../../components/admin/NavSidebar';

const drawerWidth = 10;
const closedDrawerWidth = 10;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.05)',
    '0px 8px 16px rgba(0,0,0,0.1)',
    '0px 16px 24px rgba(0,0,0,0.1)',
    '0px 24px 32px rgba(0,0,0,0.1)',
    '0px 32px 40px rgba(0,0,0,0.1)',
    '0px 40px 48px rgba(0,0,0,0.1)',
    '0px 48px 56px rgba(0,0,0,0.1)',
    '0px 56px 64px rgba(0,0,0,0.1)',
    '0px 64px 72px rgba(0,0,0,0.1)',
    '0px 72px 80px rgba(0,0,0,0.1)',
    '0px 80px 88px rgba(0,0,0,0.1)',
    '0px 88px 96px rgba(0,0,0,0.1)',
    '0px 96px 104px rgba(0,0,0,0.1)',
    '0px 104px 112px rgba(0,0,0,0.1)',
    '0px 112px 120px rgba(0,0,0,0.1)',
    '0px 120px 128px rgba(0,0,0,0.1)',
    '0px 128px 136px rgba(0,0,0,0.1)',
    '0px 136px 144px rgba(0,0,0,0.1)',
    '0px 144px 152px rgba(0,0,0,0.1)',
    '0px 152px 160px rgba(0,0,0,0.1)',
    '0px 160px 168px rgba(0,0,0,0.1)',
    '0px 168px 176px rgba(0,0,0,0.1)',
    '0px 176px 184px rgba(0,0,0,0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 8px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    router.push('/');
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f8f9fa, #ffffff)',
      }}>
        <CssBaseline />
        <NavSidebar 
          currentPath={pathname}
          onLogout={handleLogout}
          open={open}
          onToggle={handleToggle}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            width: { sm: `calc(100% - ${open ? drawerWidth : closedDrawerWidth}px)` },
            ml: { sm: `${open ? drawerWidth : closedDrawerWidth}px` },
            mt: ['48px', '56px', '64px'],
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 0 20px rgba(0,0,0,0.05)',
              minHeight: 'calc(100vh - 100px)',
              p: { xs: 2, sm: 3 },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

