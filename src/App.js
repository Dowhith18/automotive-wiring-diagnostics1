// src/App.js - Main Application Component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/App.css';

// Components
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import VehicleInfo from './components/VehicleInfo/VehicleInfo';
import LiveData from './components/LiveData/LiveData';
import Diagnostics from './components/Diagnostics/Diagnostics';
import MLPredictions from './components/MLPredictions/MLPredictions';
import WiringManual from './components/WiringManual/WiringManual';
import Reports from './components/Reports/Reports';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

// Services
import { DiagnosticService } from './services/DiagnosticService';
import { MLModelService } from './services/MLModelService';
import { ThemeService } from './services/ThemeService';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useVehicleData } from './hooks/useVehicleData';
import { useLiveData } from './hooks/useLiveData';

// Ford-inspired theme configuration
const createFordTheme = (isDarkMode) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: '#003478', // Ford Blue
      light: '#2E5F99',
      dark: '#001F47',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6B1A', // Ford Orange
      light: '#FF8A47',
      dark: '#CC5515',
      contrastText: '#ffffff',
    },
    success: {
      main: '#00A651',
    },
    warning: {
      main: '#FFB800',
    },
    error: {
      main: '#D32F2F',
    },
    background: {
      default: isDarkMode ? '#0f1419' : '#f8f9fa',
      paper: isDarkMode ? '#1a1f2e' : '#ffffff',
    },
    text: {
      primary: isDarkMode ? '#e5e7eb' : '#333333',
      secondary: isDarkMode ? '#9ca3af' : '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: isDarkMode ? '#60a5fa' : '#003478',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: isDarkMode ? '#60a5fa' : '#003478',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: isDarkMode ? '#60a5fa' : '#003478',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 52, 120, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #003478, #1D4F8C)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1D4F8C, #2E5F99)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          boxShadow: isDarkMode 
            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 2px 4px rgba(0, 52, 120, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isDarkMode 
              ? '0 8px 24px rgba(0, 0, 0, 0.4)' 
              : '0 8px 24px rgba(0, 52, 120, 0.2)',
          },
        },
      },
    },
  },
});

function App() {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Custom hooks
  const { theme, toggleTheme, setThemeMode } = useTheme();
  const { vehicleData, updateVehicleData } = useVehicleData();
  const { liveData, isStreaming, startStreaming, stopStreaming } = useLiveData();

  // Theme configuration
  const muiTheme = createFordTheme(theme === 'dark');

  // Initialize application
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        // Initialize services
        await DiagnosticService.initialize();
        await MLModelService.loadModels();
        
        // Load user preferences
        const savedTab = localStorage.getItem('ford-diagnostics-tab') || 'dashboard';
        setCurrentTab(savedTab);
        
        // Auto-detect vehicle connection
        const connectionStatus = await DiagnosticService.checkConnection();
        setIsConnected(connectionStatus);
        
        // Start live data streaming if connected
        if (connectionStatus) {
          startStreaming();
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
    
    // Cleanup on unmount
    return () => {
      stopStreaming();
    };
  }, [startStreaming, stopStreaming]);

  // Handle tab change
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
    localStorage.setItem('ford-diagnostics-tab', newTab);
  };

  // Handle vehicle connection
  const handleVehicleConnection = async () => {
    try {
      if (isConnected) {
        await DiagnosticService.disconnect();
        stopStreaming();
        setIsConnected(false);
      } else {
        const connected = await DiagnosticService.connect();
        if (connected) {
          setIsConnected(true);
          startStreaming();
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <div className="app">
          {/* Header */}
          <Header 
            theme={theme}
            onThemeToggle={toggleTheme}
            isConnected={isConnected}
            onConnectionToggle={handleVehicleConnection}
            onSidebarToggle={handleSidebarToggle}
            sidebarOpen={sidebarOpen}
          />

          <div className="app-body">
            {/* Sidebar */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ x: -280, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -280, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="sidebar-container"
                >
                  <Sidebar 
                    currentTab={currentTab}
                    onTabChange={handleTabChange}
                    isConnected={isConnected}
                    vehicleData={vehicleData}
                    theme={theme}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="tab-content"
                >
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <Dashboard 
                          vehicleData={vehicleData}
                          liveData={liveData}
                          isConnected={isConnected}
                          isStreaming={isStreaming}
                        />
                      } 
                    />
                    <Route 
                      path="/vehicle" 
                      element={
                        <VehicleInfo 
                          vehicleData={vehicleData}
                          onUpdateVehicle={updateVehicleData}
                        />
                      } 
                    />
                    <Route 
                      path="/live-data" 
                      element={
                        <LiveData 
                          liveData={liveData}
                          isStreaming={isStreaming}
                          onStartStreaming={startStreaming}
                          onStopStreaming={stopStreaming}
                        />
                      } 
                    />
                    <Route 
                      path="/diagnostics" 
                      element={
                        <Diagnostics 
                          vehicleData={vehicleData}
                          liveData={liveData}
                          isConnected={isConnected}
                        />
                      } 
                    />
                    <Route 
                      path="/ml-predictions" 
                      element={
                        <MLPredictions 
                          liveData={liveData}
                          vehicleData={vehicleData}
                        />
                      } 
                    />
                    <Route 
                      path="/wiring-manual" 
                      element={
                        <WiringManual 
                          vehicleData={vehicleData}
                        />
                      } 
                    />
                    <Route 
                      path="/reports" 
                      element={
                        <Reports 
                          vehicleData={vehicleData}
                          liveData={liveData}
                        />
                      } 
                    />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* Global notification system would go here */}
          <div id="notification-root"></div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;