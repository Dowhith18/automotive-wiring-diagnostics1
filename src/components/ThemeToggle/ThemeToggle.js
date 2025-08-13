// src/components/ThemeToggle/ThemeToggle.js - Professional Theme Toggle Component
import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
} from '@mui/material';
import {
  LightMode,
  DarkMode,
  SettingsBrightness,
  Palette,
  Contrast,
  Schedule,
  Computer,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import './ThemeToggle.css';

// Styled Components
const ThemeToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const FordSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.46 10a3.462 3.462 0 01-3.46 3.46A3.462 3.462 0 016.54 10a3.462 3.462 0 013.46-3.46zM1.667 9.305v1.39h2.083v-1.39H1.667zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const ThemeStatusChip = styled(Chip)(({ theme, variant }) => ({
  fontSize: '0.7rem',
  height: 24,
  fontWeight: 600,
  backgroundColor: variant === 'auto' 
    ? theme.palette.success.light 
    : variant === 'dark' 
      ? theme.palette.primary.dark 
      : theme.palette.grey[200],
  color: variant === 'auto' 
    ? theme.palette.success.contrastText 
    : variant === 'dark' 
      ? theme.palette.primary.contrastText 
      : theme.palette.text.primary,
  '& .MuiChip-icon': {
    fontSize: '0.9rem',
  },
}));

const ThemeToggle = ({ 
  theme, 
  onThemeChange, 
  themeMode = 'manual', 
  onThemeModeChange,
  showAdvancedOptions = true 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    // Animate icon when theme changes
    setAnimateIcon(true);
    const timer = setTimeout(() => setAnimateIcon(false), 600);
    return () => clearTimeout(timer);
  }, [theme]);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    onThemeChange(newTheme);
    
    // Set to manual mode when toggling
    if (themeMode === 'auto') {
      onThemeModeChange('manual');
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeModeChange = (newMode) => {
    onThemeModeChange(newMode);
    
    // If switching to auto, set theme based on system preference
    if (newMode === 'auto') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      onThemeChange(systemTheme);
    }
    
    handleMenuClose();
  };

  const getCurrentThemeIcon = () => {
    if (themeMode === 'auto') {
      return <Computer />;
    }
    return theme === 'dark' ? <DarkMode /> : <LightMode />;
  };

  const getThemeStatusText = () => {
    if (themeMode === 'auto') return 'Auto';
    return theme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <ThemeToggleContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quick Toggle Switch */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title={theme === 'light' ? 'Light Mode' : 'Dark Mode'}>
          <motion.div
            animate={animateIcon ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <IconButton
              size="small"
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              {getCurrentThemeIcon()}
            </IconButton>
          </motion.div>
        </Tooltip>

        <FordSwitch
          checked={theme === 'dark'}
          onChange={handleToggleTheme}
          size="small"
        />

        {/* Theme Status */}
        <AnimatePresence>
          {(isHovered || showAdvancedOptions) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ThemeStatusChip
                icon={themeMode === 'auto' ? <SettingsBrightness /> : null}
                label={getThemeStatusText()}
                size="small"
                variant={themeMode}
                onClick={handleMenuOpen}
                sx={{ cursor: 'pointer' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced Options Button */}
        {showAdvancedOptions && (
          <Tooltip title="Theme Settings">
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{ 
                color: 'white',
                opacity: 0.7,
                '&:hover': {
                  opacity: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              <Palette fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Advanced Theme Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 8,
          sx: {
            mt: 1,
            minWidth: 250,
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Theme Preferences
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            Choose how the interface appears
          </Typography>
        </Box>
        
        <Divider />

        {/* Theme Mode Options */}
        <MenuItem
          onClick={() => handleThemeModeChange('manual')}
          selected={themeMode === 'manual'}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <LightMode fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Light Mode"
            secondary="Always use light theme"
            secondaryTypographyProps={{ fontSize: '0.75rem' }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleThemeModeChange('manual')}
          selected={themeMode === 'manual' && theme === 'dark'}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Dark Mode"
            secondary="Always use dark theme"
            secondaryTypographyProps={{ fontSize: '0.75rem' }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleThemeModeChange('auto')}
          selected={themeMode === 'auto'}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <Computer fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Auto Mode"
            secondary="Follow system preference"
            secondaryTypographyProps={{ fontSize: '0.75rem' }}
          />
          {themeMode === 'auto' && (
            <Chip
              label="Active"
              size="small"
              color="success"
              sx={{ ml: 1, fontSize: '0.7rem', height: 20 }}
            />
          )}
        </MenuItem>

        <Divider />

        {/* Additional Options */}
        <MenuItem sx={{ py: 1.5 }} disabled>
          <ListItemIcon>
            <Contrast fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="High Contrast"
            secondary="Coming soon"
            secondaryTypographyProps={{ fontSize: '0.75rem' }}
          />
        </MenuItem>

        <MenuItem sx={{ py: 1.5 }} disabled>
          <ListItemIcon>
            <Schedule fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Scheduled Theme"
            secondary="Set time-based themes"
            secondaryTypographyProps={{ fontSize: '0.75rem' }}
          />
        </MenuItem>

        <Divider />

        {/* Current Status */}
        <Box sx={{ p: 2, pt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Current: {theme === 'dark' ? 'Dark' : 'Light'} Mode
            {themeMode === 'auto' && ' (Auto)'}
          </Typography>
        </Box>
      </Menu>
    </ThemeToggleContainer>
  );
};

// Compact version for sidebar or mobile
export const CompactThemeToggle = ({ theme, onThemeChange }) => {
  const [animateIcon, setAnimateIcon] = useState(false);

  useEffect(() => {
    setAnimateIcon(true);
    const timer = setTimeout(() => setAnimateIcon(false), 600);
    return () => clearTimeout(timer);
  }, [theme]);

  const handleToggle = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}>
      <IconButton
        onClick={handleToggle}
        sx={{
          borderRadius: 2,
          backgroundColor: 'action.hover',
          '&:hover': {
            backgroundColor: 'action.selected',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <motion.div
          animate={animateIcon ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {theme === 'dark' ? (
            <LightMode sx={{ color: 'warning.main' }} />
          ) : (
            <DarkMode sx={{ color: 'primary.main' }} />
          )}
        </motion.div>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;