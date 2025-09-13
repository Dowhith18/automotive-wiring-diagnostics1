import React, { useState, useEffect } from 'react';
import styles from './VehicleSetup.module.css';

const VehicleSetup = () => {
  const [vehicleData, setVehicleData] = useState({
    vinNumber: 'MA1NS2NVPR2DS1667',
    modelNumber: 'AS22XPNV5TP03D00ZY',
    lastRunDateTime: '08-08-2024 05:03:28',
    lastRunStatus: 'Failed'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDataComplete, setIsDataComplete] = useState(false);

  // Check if data is complete for Start button activation
  useEffect(() => {
    const isComplete = vehicleData.vinNumber.trim() !== '' && vehicleData.modelNumber.trim() !== '';
    setIsDataComplete(isComplete);
  }, [vehicleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({
      ...prev,
      [name]: value.toUpperCase() // Convert to uppercase for VIN/Model
    }));
  };

  const handleFetchFromECU = async () => {
    setIsLoading(true);
    try {
      // Simulate ECU fetch delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate fetched data - different models
      const models = [
        'AS22XPNV5TP03D00ZY',
        'XUV700-AX7-2024',
        'SCORPIO-N-Z8L',
        'THAR-LX-4WD'
      ];

      const randomModel = models[Math.floor(Math.random() * models.length)];

      setVehicleData(prev => ({
        ...prev,
        modelNumber: randomModel,
        lastRunDateTime: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(/[\/]/g, '-').replace(',', '')
      }));

    } catch (error) {
      console.error('ECU fetch failed:', error);
      alert('ECU connection failed. Please check vehicle connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    if (!isDataComplete) {
      alert('Please enter VIN Number and Model Number');
      return;
    }

    console.log('Starting diagnostic process:', vehicleData);

    // Update last run data
    setVehicleData(prev => ({
      ...prev,
      lastRunDateTime: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric', 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/[\/]/g, '-').replace(',', ''),
      lastRunStatus: 'In Progress'
    }));

    // Simulate diagnostic process
    setTimeout(() => {
      const statuses = ['Completed', 'Failed', 'Warning', 'Partial'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      setVehicleData(prev => ({
        ...prev,
        lastRunStatus: randomStatus
      }));
    }, 3000);
  };

  const handleClearData = () => {
    setVehicleData({
      vinNumber: '',
      modelNumber: '',
      lastRunDateTime: '',
      lastRunStatus: ''
    });
  };

  const handleInfoClick = () => {
    const infoText = `Vehicle Setup Information:

1. VIN Number: Vehicle Identification Number (17 characters)
2. Model Number: Vehicle model code from ECU
3. Fetch From ECU: Automatically retrieve model data
4. Start: Begin diagnostic scanning process

Current Status:
- VIN: ${vehicleData.vinNumber || 'Not entered'}
- Model: ${vehicleData.modelNumber || 'Not entered'}  
- Last Run: ${vehicleData.lastRunDateTime || 'No previous runs'}
- Status: ${vehicleData.lastRunStatus || 'Ready'}`;

    alert(infoText);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return '#27ae60';
      case 'failed': return '#e74c3c';
      case 'warning': return '#f39c12';
      case 'in progress': return '#3498db';
      case 'partial': return '#9b59b6';
      default: return '#95a5a6';
    }
  };

  return (
    <div className={styles.vehicleSetup}>
      {/* Input Section */}
      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="vinNumber"
            value={vehicleData.vinNumber}
            onChange={handleInputChange}
            placeholder="VIN NUMBER"
            className={styles.inputField}
            maxLength={17}
          />
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="modelNumber"
              value={vehicleData.modelNumber}
              onChange={handleInputChange}
              placeholder="MODEL NUMBER"
              className={styles.inputField}
            />
          </div>

          <button 
            className={styles.fetchButton}
            onClick={handleFetchFromECU}
            disabled={isLoading}
          >
            {isLoading ? 'Fetching...' : 'Fetch From ECU'}
          </button>
        </div>

        {/* Clear Data Button */}
        <div className={styles.actionButtons}>
          <button 
            className={styles.clearButton}
            onClick={handleClearData}
            title="Clear all data"
          >
            Clear Data
          </button>
        </div>
      </div>

      {/* Start Button */}
      <div className={styles.startSection}>
        <button 
          className={`${styles.startButton} ${isDataComplete ? styles.startButtonActive : styles.startButtonInactive}`}
          onClick={handleStart}
          disabled={!isDataComplete}
        >
          <span className={styles.startText}>Start</span>
        </button>
      </div>

      {/* Status Fields */}
      <div className={styles.statusSection}>
        <div className={styles.statusRow}>
          <div className={styles.statusGroup}>
            <label className={styles.statusLabel}>Last Run DateTime</label>
            <input
              type="text"
              value={vehicleData.lastRunDateTime}
              readOnly
              className={styles.statusField}
              placeholder="No previous runs"
            />
          </div>

          <div className={styles.statusGroup}>
            <label className={styles.statusLabel}>Last Run Status</label>
            <input
              type="text"
              value={vehicleData.lastRunStatus}
              readOnly
              className={styles.statusField}
              style={{ 
                color: getStatusColor(vehicleData.lastRunStatus),
                fontWeight: vehicleData.lastRunStatus ? '600' : '400'
              }}
              placeholder="Ready"
            />
          </div>
        </div>

        {/* Info Button */}
        <button 
          className={styles.infoButton}
          onClick={handleInfoClick}
          title="Information"
        >
          i
        </button>
      </div>
    </div>
  );
};

export default VehicleSetup;