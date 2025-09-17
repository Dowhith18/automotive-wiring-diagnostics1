import React from 'react';
import ECUCard from '../ECUCard/ECUCard';
import styles from './ECUStatusGrid.module.css';

const ECUStatusGrid = ({ ecuData, onECUClick, isRefreshing }) => {
  return (
    <div className={styles.ecuStatusGrid}>
      {ecuData.map((ecu) => (
        <ECUCard
          key={ecu.id}
          ecu={ecu}
          onClick={() => onECUClick(ecu)}
          isRefreshing={isRefreshing}
        />
      ))}
    </div>
  );
};

export default ECUStatusGrid;