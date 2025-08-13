// src/components/Dashboard/Dashboard.js - Main Dashboard Component
import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  Bluetooth as BluetoothIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

import './Dashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const Dashboard = ({ vehicleData, liveData, isConnected, isStreaming }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [systemHealth, setSystemHealth] = useState({
    overall: 'good',
    obdConnection: isConnected,
    mlModel: true,
    dataStream: isStreaming,
  });

  // Mock statistics for demo
  const [statistics, setStatistics] = useState({
    successfulDiagnoses: 247,
    activeFaults: 3,
    mlAccuracy: 94.3,
    wiringFaults: 8,
    trends: {
      diagnoses: '+12.5%',
      faults: 'Live',
      accuracy: '+2.1%',
      wiring: '-3'
    }
  });

  // Live sensor data processing
  const sensorReadings = liveData?.sensors || {
    batteryVoltage: { value: 12.6, unit: 'V', status: 'normal' },
    engineRPM: { value: 750, unit: 'RPM', status: 'normal' },
    coolantTemp: { value: 195, unit: '°F', status: 'normal' },
    oilPressure: { value: 45, unit: 'PSI', status: 'normal' },
    fuelPressure: { value: 58, unit: 'PSI', status: 'normal' },
    intakeTemp: { value: 72, unit: '°F', status: 'normal' },
  };

  // DTC codes
  const dtcCodes = liveData?.dtcCodes || [
    { code: 'P0171', description: 'System Too Lean (Bank 1)', severity: 'medium' },
    { code: 'P0420', description: 'Catalyst System Efficiency Below Threshold', severity: 'low' },
    { code: 'P0300', description: 'Random/Multiple Cylinder Misfire Detected', severity: 'high' }
  ];

  // Update system health based on connection status
  useEffect(() => {
    setSystemHealth(prev => ({
      ...prev,
      obdConnection: isConnected,
      dataStream: isStreaming,
      overall: isConnected && isStreaming ? 'good' : 'warning'
    }));
  }, [isConnected, isStreaming]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Chart configurations
  const sensorChartData = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30'],
    datasets: [
      {
        label: 'Battery Voltage',
        data: [12.6, 12.8, 12.5, 12.7, 12.6, 12.9, 12.6],
        borderColor: '#003478',
        backgroundColor: 'rgba(0, 52, 120, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Engine RPM',
        data: [750, 800, 720, 850, 780, 900, 750],
        borderColor: '#FF6B1A',
        backgroundColor: 'rgba(255, 107, 26, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const sensorChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Live Sensor Trends',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Voltage (V)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'RPM',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const systemHealthData = {
    labels: ['Healthy', 'Warning', 'Critical'],
    datasets: [
      {
        data: [85, 12, 3],
        backgroundColor: ['#00A651', '#FFB800', '#D32F2F'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return <CheckCircleIcon color="success" />;
      case 'warning': return <WarningIcon color="warning" />;
      case 'error': return <ErrorIcon color="error" />;
      default: return <SpeedIcon />;
    }
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
            System Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Real-time automotive diagnostic overview
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="System Settings">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh} disabled={refreshing}>
              <RefreshIcon className={refreshing ? 'spinning' : ''} />
            </IconButton>
          </Tooltip>
          
          <Chip 
            icon={<BluetoothIcon />}
            label={isConnected ? "Connected" : "Disconnected"}
            color={isConnected ? "success" : "error"}
            variant="filled"
          />
        </Box>
      </Box>

      {/* Alert Section */}
      {!isConnected && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Vehicle not connected. Connect to OBD-II port to access live diagnostic data.
        </Alert>
      )}

      {/* Statistics Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="stat-card success">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {statistics.successfulDiagnoses}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Successful Diagnoses
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
                <Chip label={statistics.trends.diagnoses} color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="stat-card warning">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'warning.main' }}>
                      {statistics.activeFaults}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Fault Codes
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'warning.light' }}>
                    <WarningIcon />
                  </Avatar>
                </Box>
                <Chip label={statistics.trends.faults} color="warning" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="stat-card info">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'info.main' }}>
                      {statistics.mlAccuracy}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ML Accuracy
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'info.light' }}>
                    <TrendingUpIcon />
                  </Avatar>
                </Box>
                <Chip label={statistics.trends.accuracy} color="info" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="stat-card primary">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {statistics.wiringFaults}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Wiring Faults
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <ErrorIcon />
                  </Avatar>
                </Box>
                <Chip label={statistics.trends.wiring} color="primary" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Main Dashboard Grid */}
      <Grid container spacing={3}>
        {/* Live Sensor Data */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="dashboard-panel">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                    Live Sensor Data
                  </Typography>
                  {isStreaming && (
                    <Chip 
                      label="UPDATING" 
                      color="success" 
                      size="small"
                      className="live-badge"
                    />
                  )}
                </Box>
                
                <Grid container spacing={2}>
                  {Object.entries(sensorReadings).map(([key, data]) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      <Card variant="outlined" className="sensor-card">
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {data.value}{data.unit}
                              </Typography>
                            </Box>
                            {getStatusIcon(data.status)}
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={75} 
                            color={data.status === 'normal' ? 'success' : 'warning'}
                            sx={{ mt: 1 }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                {/* Live Chart */}
                <Box sx={{ mt: 3, height: 300 }}>
                  <Line data={sensorChartData} options={sensorChartOptions} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Sidebar - DTC Codes & System Health */}
        <Grid item xs={12} lg={4}>
          {/* Active DTC Codes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Card className="dashboard-panel" sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                    Active DTC Codes
                  </Typography>
                  <Chip 
                    label={`${dtcCodes.length} Active`}
                    color="warning"
                    size="small"
                  />
                </Box>
                
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {dtcCodes.map((dtc, index) => (
                    <Card key={dtc.code} variant="outlined" sx={{ mb: 1 }}>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                              {dtc.code}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {dtc.description}
                            </Typography>
                          </Box>
                          <Chip 
                            label={dtc.severity}
                            color={getSeverityColor(dtc.severity)}
                            size="small"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <Card className="dashboard-panel">
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                  System Health
                </Typography>
                
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ width: 200, height: 200 }}>
                    <Doughnut 
                      data={systemHealthData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
                
                <Box sx={{ space: 2 }}>
                  {Object.entries(systemHealth).map(([key, status]) => {
                    if (key === 'overall') return null;
                    
                    return (
                      <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Typography>
                        <Chip 
                          label={status ? 'Active' : 'Inactive'}
                          color={status ? 'success' : 'error'}
                          size="small"
                        />
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;