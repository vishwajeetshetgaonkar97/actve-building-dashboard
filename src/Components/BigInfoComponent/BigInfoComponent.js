import React from 'react';
import styles from './styles.module.css';

const BigInfoComponent = ({
  heading = '',
  value = 0,
  condition = 'offline',
  backgroundColor = '',
}) => {
  return (
    <div
      className={styles.outerContainer}
      style={{ background: backgroundColor }}
    >
      <div className={styles.cardHeading}>
        {heading}{' '}
        <div className={`${styles.cardInfoSub} ${styles.cardInfoSubMob}`}>
          {value} {heading === 'CO2' ? 'ppm' : 'ug/m3'}
        </div>{' '}
      </div>
      <div className={styles.cardInfoHeading}>{condition}</div>
      <div className={`${styles.cardInfoSub} ${styles.cardInfoSubDes}`}>
        {value} {heading === 'CO2' ? 'ppm' : 'ug/m3'}
      </div>
    </div>
  );
};

export default BigInfoComponent;
