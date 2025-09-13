import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ 
  activeSection, 
  activeDiagnosticView,
  onSectionChange, 
  onDiagnosticViewChange,
  isGarudaConnected, 
  onGarudaConnection, 
  appStatus,
  user 
}) => {
  return (
    <aside className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <span className={styles.logoText}>hida</span>
        </div>
      </div>

      {/* User Section */}
      <div className={styles.userSection}>
        <div className={styles.userIcon}>👤</div>
        <div className={styles.userId}>
          {user?.userId || '25020614'}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navigation}>
        <div 
          className={`${styles.navItem} ${activeSection === 'newVehicle' ? styles.active : ''}`}
          onClick={() => onSectionChange('newVehicle')}
        >
          <span className={styles.navIcon}>🚗</span>
          <span className={styles.navText}>New Vehicle</span>
        </div>

        <div 
          className={`${styles.navItem} ${activeSection === 'diagnostics' ? styles.active : ''}`}
          onClick={() => onSectionChange('diagnostics')}
        >
          <span className={styles.navIcon}>🔧</span>
          <span className={styles.navText}>Diagnostics</span>
        </div>

        {/* Sub-navigation for Diagnostics */}
        {activeSection === 'diagnostics' && (
          <div className={styles.subNavigation}>
            <div 
              className={`${styles.subNavItem} ${activeDiagnosticView === 'dashboardData' ? styles.subActive : ''}`}
              onClick={() => onDiagnosticViewChange('dashboardData')}
            >
              <span className={styles.subNavIcon}>⭕</span>
              <span className={styles.subNavText}>Dashboard Data</span>
            </div>
          </div>
        )}
      </nav>

      {/* Status Section */}
      <div className={styles.statusSection}>
        <div className={styles.appStatus}>
          <span className={styles.statusIcon}>⚙️</span>
          <span className={styles.statusText}>{appStatus}</span>
        </div>

        <div 
          className={`${styles.connectionStatus} ${isGarudaConnected ? styles.connected : styles.disconnected}`}
          onClick={onGarudaConnection}
        >
          <span className={styles.connectionIcon}>
            {isGarudaConnected ? '✅' : '❌'}
          </span>
          <div className={styles.connectionInfo}>
            <span className={styles.connectionText}>Garuda Connected</span>
            <button className={styles.connectButton}>
              {isGarudaConnected ? 'Connect' : 'Connect'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={styles.bottomControls}>
        <button className={styles.controlButton} title="Screenshot">
          <span className={styles.controlIcon}>📷</span>
          <span className={styles.controlText}>Screen shot</span>
        </button>

        <button className={styles.controlButton} title="Screen Record">
          <span className={styles.controlIcon}>⏺️</span>
          <span className={styles.controlText}>Screen Record</span>
        </button>

        <button className={styles.controlButton} title="Settings">
          <span className={styles.controlIcon}>⚙️</span>
          <span className={styles.controlText}>Settings</span>
        </button>

        <button className={styles.controlButton} title="Network">
          <span className={styles.controlIcon}>📶</span>
          <span className={styles.controlText}>Network</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;