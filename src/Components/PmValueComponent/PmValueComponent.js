import React, { useContext } from 'react';
import GoodIcon from '../../Assets/GoodIcon.png';
import styles from './styles.module.css';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import {
  getParametersExcludingTempHum,
  getPm25Value,
} from '../../UtilityFunctions/Utils';

const PmValueComponent = () => {
  const { partnerData } = useContext(PartnerDataContext);

  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.childContainer1}`}>
        <div className={styles.infoCard}>
          <div className={styles.infoImageContainer}>
            <img className={styles.logoImage} src={GoodIcon} alt="sarva logo" />
          </div>

          <div className={styles.infoTitle}>
            <div>pm 2.5</div>
            <span>{getPm25Value(partnerData)}</span>
          </div>

          <div className={styles.infoValue}>good</div>
        </div>
      </div>
    </div>
  );
};

export default PmValueComponent;
