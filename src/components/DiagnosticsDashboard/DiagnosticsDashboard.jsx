import React, { useState, useEffect } from 'react';
import ECUStatusGrid from '../ECUStatusGrid/ECUStatusGrid';
import VehicleInfoPanel from '../VehicleInfoPanel/VehicleInfoPanel';
import DiagnosticHeader from '../DiagnosticHeader/DiagnosticHeader';
import styles from './DiagnosticsDashboard.module.css';

const DiagnosticsDashboard = ({ vehicleData }) => {
  const [ecuData, setEcuData] = useState([
    { id: 'EMS', name: '612_T GDI', status: 'SUCCESS', dtcCount: 0, description: 'Engine Management System' },
    { id: 'IS_SM', name: 'ARTCORE', status: 'DTC_FOUND', dtcCount: 8, description: 'Information System Smart Module' },
    { id: 'TCU', name: 'TCU', status: 'DTC_FOUND', dtcCount: 5, description: 'Transmission Control Unit' },
    { id: 'ESP', name: 'ESP', status: 'DTC_FOUND', dtcCount: 4, description: 'Electronic Stability Program' },
    { id: 'PKE', name: 'PKE', status: 'DTC_FOUND', dtcCount: 6, description: 'Passive Keyless Entry' },
    { id: 'ESCL', name: 'ESCL', status: 'DTC_FOUND', dtcCount: 1, description: 'Electronic Steering Column Lock' },
    { id: 'SRS', name: 'SRS', status: 'DTC_FOUND', dtcCount: 10, description: 'Supplemental Restraint System' },
    { id: 'MBFM', name: 'MBFM', status: 'DTC_FOUND', dtcCount: 10, description: 'Multi-Body Framework Module' },
    { id: 'FCM', name: 'FCM', status: 'DTC_FOUND', dtcCount: 8, description: 'Front Camera Module' },
    { id: 'FRM', name: 'FRM', status: 'DTC_FOUND', dtcCount: 7, description: 'Front Radar Module' },
    { id: 'SVS', name: 'Dashboard Data', status: 'DASHBOARD_DATA', dtcCount: 7, description: 'Service Vehicle Soon', isSpecial: true },
    { id: 'EPS', name: 'EPS', status: 'DTC_FOUND', dtcCount: 1, description: 'Electric Power Steering' },
    { id: 'WLC', name: 'WLC', status: 'DTC_FOUND', dtcCount: 7, description: 'Wireless Charging' },
    { id: 'MGM', name: 'MGM', status: 'DTC_FOUND', dtcCount: 2, description: 'Media Gateway Module' },
    { id: 'DATC', name: 'DATC', status: 'DTC_FOUND', dtcCount: 11, description: 'Digital Automatic Temperature Control' }
  ]);

  const [vehicleInfo, setVehicleInfo] = useState({
    odometer: '85 kms',
    batteryVoltage: '13.7 V',
    vehicleSpeed: '0 Kmph',
    engineSpeed: '867 rpm',
    ignitionCounter: '276 count (s)'
  });

  const [dtcSummary, setDtcSummary] = useState({
    totalDTCs: 87,
    totalECUs: 15,
    ecuWithDTCs: '14/15'
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleECUClick = (ecu) => {
    console.log('ECU clicked:', ecu);
    // Navigate to detailed ECU view or show DTC details
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update ECU data with simulated changes
      setEcuData(prevData => 
        prevData.map(ecu => ({
          ...ecu,
          dtcCount: Math.max(0, ecu.dtcCount + Math.floor(Math.random() * 3) - 1)
        }))
      );

      // Update summary
      const totalDTCs = ecuData.reduce((sum, ecu) => sum + ecu.dtcCount, 0);
      setDtcSummary(prev => ({ ...prev, totalDTCs }));

    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDTCAnalysis = () => {
    console.log('Opening DTC Analysis...');
    // Navigate to DTC analysis view
  };

  return (
    <div className={styles.diagnosticsDashboard}>
      {/* Header */}
      <DiagnosticHeader 
        vehicleData={vehicleData}
        onRefresh={handleRefresh}
        onDTCAnalysis={handleDTCAnalysis}
        isRefreshing={isRefreshing}
      />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* ECU Status Grid */}
        <div className={styles.ecuGridContainer}>
          <ECUStatusGrid 
            ecuData={ecuData}
            onECUClick={handleECUClick}
            isRefreshing={isRefreshing}
          />
        </div>

        {/* Vehicle Info Panel */}
        <div className={styles.infoPanelContainer}>
          <VehicleInfoPanel 
            vehicleInfo={vehicleInfo}
            dtcSummary={dtcSummary}
          />
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsDashboard;