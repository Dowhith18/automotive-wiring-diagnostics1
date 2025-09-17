import React from 'react';
import styles from './ECUCard.module.css';

const ECUCard = ({ ecu, onClick, isRefreshing }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS':
        return '🚗'; // Green car icon
      case 'DTC_FOUND':
        return '🚗'; // Red car icon (styled with CSS)
      case 'DASHBOARD_DATA':
        return '⭕'; // Red circle icon
      default:
        return '🚗';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'SUCCESS':
        return styles.statusSuccess;
      case 'DTC_FOUND':
        return styles.statusError;
      case 'DASHBOARD_DATA':
        return styles.statusDashboard;
      default:
        return styles.statusDefault;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'SUCCESS';
      case 'DTC_FOUND':
        return 'DTC_FOUND';
      case 'DASHBOARD_DATA':
        return 'Dashboard Data';
      default:
        return 'UNKNOWN';
    }
  };

  return (
    <div 
      className={`${styles.ecuCard} ${ecu.isSpecial ? styles.specialCard : ''} ${isRefreshing ? styles.refreshing : ''}`}
      onClick={onClick}
    >
      {/* ECU Name */}
      <div className={styles.ecuName}>
        {ecu.id}
      </div>

      {/* ECU Description */}
      <div className={styles.ecuDescription}>
        {ecu.name}
      </div>

      {/* Status Section */}
      <div className={styles.statusSection}>
        <div className={styles.statusLabel}>Status</div>
        <div className={styles.statusValue}>
          {getStatusText(ecu.status)}
        </div>
      </div>

      {/* Status Icon and Count */}
      <div className={styles.statusIndicator}>
        <div className={`${styles.statusIcon} ${getStatusClass(ecu.status)}`}>
          {getStatusIcon(ecu.status)}
        </div>

        {!ecu.isSpecial && (
          <div className={styles.dtcCount}>
            <span className={styles.countIcon}>⚠️</span>
            <span className={styles.countValue}>{ecu.dtcCount}</span>
          </div>
        )}

        {ecu.isSpecial && (
          <div className={styles.specialCount}>
            <span className={styles.countValue}>{ecu.dtcCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ECUCard;