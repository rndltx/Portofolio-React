import React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Menu, ChevronLeft, ChevronRight, Home, User, Clock, Briefcase, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const drawerWidth = 240;
const closedDrawerWidth = 100;

const menuItems = [
  { text: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
  { text: 'About', icon: <User size={20} />, path: '/dashboard/about' },
  { text: 'Timeline', icon: <Clock size={20} />, path: '/dashboard/timeline' },
  { text: 'Projects', icon: <Briefcase size={20} />, path: '/dashboard/projects' },
  { text: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
];

const LogoText = () => (
  <Typography 
    variant="h6" 
    sx={{ 
      fontWeight: 700,
      background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '1px',
      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    }}
  >
    Rizsign
  </Typography>
);

interface NavSidebarProps {
  window?: () => Window;
  currentPath: string;
  onLogout: () => void;
  open: boolean;
  onToggle: () => void;
}

export default function NavSidebar({ window, currentPath, onLogout, open, onToggle }: NavSidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = (
    <Box 
      sx={{ 
        height: '100%',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0))',
        }
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          py: 3,
          px: 2,
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)',
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            transition: 'all 0.3s ease'
          }}
        >
          <Box 
            component={motion.div}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.7 }}
            sx={{ 
              borderRadius: '50%',
              width: open ? 40 : 32,
              height: open ? 40 : 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
              boxShadow: '0 0 20px rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#1976d2',
                fontWeight: 900,
                fontSize: open ? '1.5rem' : '1.2rem',
                transition: 'all 0.3s ease'
              }}
            >
              R
            </Typography>
          </Box>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <LogoText />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <IconButton 
          onClick={onToggle} 
          sx={{ 
            color: 'white',
            '&:hover': {
              background: 'rgba(255,255,255,0.1)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s'
          }}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <Divider sx={{ opacity: 0.1 }} />
      <List sx={{ px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            disablePadding 
            sx={{ 
              display: 'block', 
              mb: 1
            }}
          >
            <ListItemButton
              component={Link}
              href={item.path}
              selected={currentPath === item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                py: 1.5,
                borderRadius: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translateX(0)',
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  }
                },
                '&:hover': {
                  bgcolor: currentPath === item.path ? 'primary.dark' : 'rgba(25, 118, 210, 0.08)',
                  transform: 'translateX(8px)',
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: currentPath === item.path ? 'white' : 'primary.main',
                  transition: 'all 0.3s'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: open ? 1 : 0,
                  transition: 'all 0.3s',
                  '& .MuiTypography-root': {
                    fontWeight: currentPath === item.path ? 600 : 400,
                    fontSize: '0.95rem'
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto', opacity: 0.1 }} />
      <ListItem disablePadding sx={{ p: 2 }}>
      </ListItem>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : closedDrawerWidth}px)` },
          ml: { sm: `${open ? drawerWidth : closedDrawerWidth}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onToggle}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Dashboard
          </Typography>
          <Button 
            color="primary"
            variant="contained"
            onClick={onLogout} 
            startIcon={<LogOut size={18} />}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              py: 1,
              boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.39)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(25, 118, 210, 0.39)',
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: open ? drawerWidth : closedDrawerWidth },
          flexShrink: { sm: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={isMobile ? open : false}
          onClose={onToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: open ? drawerWidth : closedDrawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }}
          open={open}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

