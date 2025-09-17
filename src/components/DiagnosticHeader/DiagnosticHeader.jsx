import React from 'react';
import styles from './DiagnosticHeader.module.css';

const DiagnosticHeader = ({ vehicleData, onRefresh, onDTCAnalysis, isRefreshing }) => {
  const formatDate = () => {
    const now = new Date();
    return {
      time: now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      }),
      date: now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
  };

  const currentDateTime = formatDate();

  return (
    <div className={styles.diagnosticHeader}>
      {/* Vehicle Information */}
      <div className={styles.vehicleInfo}>
        <div className={styles.primaryInfo}>
          <span className={styles.vinNumber}>
            {vehicleData?.vinNumber || 'MA1NS2NVPR2DS1667'}
          </span>
          <span className={styles.modelNumber}>
            {vehicleData?.modelNumber || 'AS22XPNV5TP03D00ZY'}
          </span>
        </div>

        <div className={styles.vehicleDescription}>
          XUV300 HIGH DFF AX7LPRO G AT ESP TECHPACK TGDI
        </div>
      </div>

      {/* Date Time */}
      <div className={styles.dateTimeInfo}>
        <div className={styles.currentTime}>
          {currentDateTime.time}
        </div>
        <div className={styles.currentDate}>
          {currentDateTime.date}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button 
          className={styles.actionButton}
          onClick={onDTCAnalysis}
          title="DTC Analysis"
        >
          <span className={styles.buttonIcon}>📋</span>
          <span className={styles.buttonText}>DTC</span>
        </button>

        <button 
          className={styles.actionButton}
          onClick={() => console.log('Analysis clicked')}
          title="Analysis"
        >
          <span className={styles.buttonIcon}>📊</span>
          <span className={styles.buttonText}>Analysis</span>
        </button>

        <button 
          className={styles.actionButton}
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh Data"
        >
          <span className={`${styles.buttonIcon} ${isRefreshing ? styles.spinning : ''}`}>
            🔄
          </span>
          <span className={styles.buttonText}>Refresh</span>
        </button>

        <button 
          className={`${styles.actionButton} ${styles.diagnosticsButton}`}
          title="Diagnostics Menu"
        >
          <span className={styles.buttonIcon}>🔧</span>
          <span className={styles.buttonText}>Diagnostics</span>
        </button>
      </div>
    </div>
  );
};

export default DiagnosticHeader;