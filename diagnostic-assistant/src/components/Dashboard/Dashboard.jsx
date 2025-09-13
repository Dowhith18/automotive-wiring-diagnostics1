import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import VehicleSetup from '../VehicleSetup/VehicleSetup';
import DiagnosticsDashboard from '../DiagnosticsDashboard/DiagnosticsDashboard';
import styles from './Dashboard.module.css';

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('diagnostics'); // Start with diagnostics active
  const [activeDiagnosticView, setActiveDiagnosticView] = useState('dashboardData');
  const [isGarudaConnected, setIsGarudaConnected] = useState(true);
  const [appStatus, setAppStatus] = useState('App Idle');

  // Mock vehicle data from previous setup
  const [vehicleData] = useState({
    vinNumber: 'MA1NS2NVPR2DS1667',
    modelNumber: 'AS22XPNV5TP03D00ZY',
    lastRunDateTime: '09-08-2024 02:41:59',
    lastRunStatus: 'Completed'
  });

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleDiagnosticViewChange = (view) => {
    setActiveDiagnosticView(view);
  };

  const handleGarudaConnection = () => {
    setIsGarudaConnected(!isGarudaConnected);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'newVehicle':
        return <VehicleSetup />;
      case 'diagnostics':
        switch (activeDiagnosticView) {
          case 'dashboardData':
            return <DiagnosticsDashboard vehicleData={vehicleData} />;
          case 'dtcAnalysis':
            return (
              <div className={styles.comingSoon}>
                <h2>DTC Analysis</h2>
                <p>Coming soon...</p>
              </div>
            );
          default:
            return <DiagnosticsDashboard vehicleData={vehicleData} />;
        }
      default:
        return (
          <div className={styles.comingSoon}>
            <h2>Module Under Development</h2>
            <p>Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backButton} onClick={onLogout}>
          <span className={styles.backIcon}>←</span>
        </button>
        <h1 className={styles.headerTitle}>
          Mahindra Intelligent Diagnostic Assistant - 1.0.8983.11 [Prod]
        </h1>
        <div className={styles.windowControls}>
          <button className={styles.minimizeBtn}>−</button>
          <button className={styles.maximizeBtn}>□</button>
          <button className={styles.closeBtn}>×</button>
        </div>
      </header>

      <div className={styles.mainContainer}>
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection}
          activeDiagnosticView={activeDiagnosticView}
          onSectionChange={handleSectionChange}
          onDiagnosticViewChange={handleDiagnosticViewChange}
          isGarudaConnected={isGarudaConnected}
          onGarudaConnection={handleGarudaConnection}
          appStatus={appStatus}
          user={user}
        />

        {/* Main Content */}
        <main className={styles.mainContent}>
          {renderMainContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>Mahindra Intelligent Diagnostic Assistant</span>
        <span>Application Status:</span>
      </footer>
    </div>
  );
};

export default Dashboard;