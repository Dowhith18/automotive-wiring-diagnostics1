import React from 'react';
import styles from './VehicleInfoPanel.module.css';

const VehicleInfoPanel = ({ vehicleInfo, dtcSummary }) => {
  return (
    <div className={styles.vehicleInfoPanel}>
      {/* Vehicle Telemetry */}
      <div className={styles.infoCard}>
        <div className={styles.cardRow}>
          <div className={styles.infoItem}>
            <div className={styles.itemLabel}>Odometer</div>
            <div className={styles.itemValue}>{vehicleInfo.odometer}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.itemLabel}>Battery Voltage</div>
            <div className={styles.itemValue}>{vehicleInfo.batteryVoltage}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.itemLabel}>Vehicle Speed</div>
            <div className={styles.itemValue}>{vehicleInfo.vehicleSpeed}</div>
          </div>
        </div>

        <div className={styles.cardRow}>
          <div className={styles.infoItem}>
            <div className={styles.itemLabel}>Engine Speed</div>
            <div className={styles.itemValue}>{vehicleInfo.engineSpeed}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.itemLabel}>Ignition Counter</div>
            <div className={styles.itemValue}>{vehicleInfo.ignitionCounter}</div>
          </div>
        </div>
      </div>

      {/* DTC Status */}
      <div className={`${styles.infoCard} ${styles.dtcStatusCard}`}>
        <div className={styles.cardTitle}>DTC Status</div>
        <div className={styles.dtcSummary}>
          <div className={styles.dtcItem}>
            <div className={styles.dtcLabel}>Total DTCs in Vehicle</div>
            <div className={styles.dtcValue}>{dtcSummary.totalDTCs}</div>
          </div>
        </div>
      </div>

      {/* ECU Status */}
      <div className={`${styles.infoCard} ${styles.ecuStatusCard}`}>
        <div className={styles.cardTitle}>ECU Status</div>
        <div className={styles.ecuSummary}>
          <div className={styles.ecuRow}>
            <div className={styles.ecuItem}>
              <div className={styles.ecuLabel}>Number of ECUs in Vehicle</div>
              <div className={styles.ecuValue}>{dtcSummary.totalECUs}</div>
            </div>
          </div>
          <div className={styles.ecuRow}>
            <div className={styles.ecuItem}>
              <div className={styles.ecuLabel}>ECUs With DTCs</div>
              <div className={styles.ecuValue}>{dtcSummary.ecuWithDTCs}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoPanel;