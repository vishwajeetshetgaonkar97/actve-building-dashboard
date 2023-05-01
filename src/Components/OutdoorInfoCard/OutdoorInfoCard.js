import React, { useContext } from 'react';
import GoodIcon from '../../Assets/GoodIcon.png';
import styles from './styles.module.css';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import {
  getParametersExcludingTempHum,
  getPm25Value,
} from '../../UtilityFunctions/Utils';

const OutdoorInfoCard = () => {
  const { partnerData } = useContext(PartnerDataContext);

  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardTitle}>pm2.5</div>
      <div className={styles.innerInfoCard}>
        <div className={styles.infoImageContainer}>
          <img className={styles.logoImage} src={GoodIcon} alt="sarva logo" />
        </div>

        <div className={styles.infoTitle}>
          <div>indoor</div>
          <span>
            <div>good </div>{' '}
            <div className={styles.infoValue}>{getPm25Value(partnerData)}</div>{' '}
          </span>
        </div>
      </div>

      <div className={styles.innerInfoCard}>
        <div className={styles.infoImageContainer}>
          <img className={styles.logoImage} src={GoodIcon} alt="sarva logo" />
        </div>

        <div className={styles.infoTitle}>
          <div>outdoor</div>
          <span>
            <div>good </div>{' '}
            <div className={styles.infoValue}>{getPm25Value(partnerData)}</div>{' '}
          </span>
        </div>
      </div>

    </div>
  );
};

export default OutdoorInfoCard;
