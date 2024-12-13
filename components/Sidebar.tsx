import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, User, Clock, Briefcase, Settings, Menu } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { text: 'Home', icon: <Home size={24} />, link: '/dashboard' },
    { text: 'About Me', icon: <User size={24} />, link: '/dashboard/about' },
    { text: 'Timeline', icon: <Clock size={24} />, link: '/dashboard/timeline' },
    { text: 'Projects', icon: <Briefcase size={24} />, link: '/dashboard/projects' },
    { text: 'Settings', icon: <Settings size={24} />, link: '/dashboard/settings' },
  ];

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        className="lg:hidden"
      >
        <Menu />
      </IconButton>
      <Drawer
        variant="permanent"
        className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}
        classes={{
          paper: `${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`,
        }}
      >
        <List>
          {menuItems.map((item) => (
            <Link href={item.link} key={item.text} passHref>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={item.text} />}
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

