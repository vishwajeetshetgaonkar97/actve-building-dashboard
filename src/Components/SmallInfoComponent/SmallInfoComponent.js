import React from 'react';
import Button from '@mui/material/Button';
import styles from './styles.module.css';
import {
  getIfBetterOrWorse,
  getIfBetterOrWorseColor,
  getNoOfTimesBetterOrWorse,
} from '../../UtilityFunctions/Utils';

const SmallInfoComponent = ({
  heading = '',
  indoorValue = 0,
  outdoorValue = 0,
}) => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.cardLargeInfoContainer}>
        <div className={`${styles.cardHeading} ${styles.cardHeadingDekstop}`}>
          {heading}
        </div>
        <div
          className={`${styles.cardInfoHeading1} ${getIfBetterOrWorseColor(
            indoorValue,
            outdoorValue,
          ) && styles.cardInfoHeading2Worse} ${getNoOfTimesBetterOrWorse(
            indoorValue,
            outdoorValue,
          ) === '--' && styles.cardInfoHeadingNoInfo}`}
        >
          {getNoOfTimesBetterOrWorse(indoorValue, outdoorValue)}
        </div>
        <div
          className={`${styles.cardInfoHeading2} ${getIfBetterOrWorseColor(
            indoorValue,
            outdoorValue,
          ) && styles.cardInfoHeading2Worse}`}
        >
          {getIfBetterOrWorse(indoorValue, outdoorValue)}
        </div>
      </div>

      <div className={styles.cardSmallInfoContainer}>
        <div className={`${styles.cardHeading} ${styles.cardHeadingMob}`}>
          {heading}
        </div>
        <div className={styles.cardInfoSub1}>
          indoor: {indoorValue} {heading === 'CO2' ? 'ppm' : 'ug/m3'}
        </div>
        <div className={styles.cardInfoSub2}>
          outdoor: {outdoorValue} {heading === 'CO2' ? 'ppm' : 'ug/m3'}
        </div>
      </div>
    </div>
  );
};

export default SmallInfoComponent;
