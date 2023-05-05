import React, { useContext } from 'react';
import GoodIcon from '../../Assets/GoodIcon.png';
import ModerateIcon from '../../Assets/ModerateIcon.png';
import BadIcon from '../../Assets/BadIcon.png';
import styles from './styles.module.css';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import {
  getIndoorInfoName,
  getIndoorInfoValue,
  getIndoorInfoValueCondition,
  getParametersExcludingTempHum,
  getPm25Value,
} from '../../UtilityFunctions/Utils';

const IndoorInfoCard = ({
  title = '',
  value = 0, 
  condition = '',
  noOfCards = 1,
  isLong = false,
}) => {
  const { partnerData } = useContext(PartnerDataContext);

  const getImageIcon = () => {
    if (condition === 'bad') return BadIcon;
    if (condition === 'moderate') return ModerateIcon;
    return GoodIcon;
  };

  return (
    <div className={styles.infoCard}>
      <div
        className={`${styles.infoImageContainer} ${isLong &&
          styles.infoImage3} ${condition === 'bad' &&
          styles.infoImageBadContainer} ${condition === 'moderate' &&
          styles.infoImageModerateContainer} `}
      >
        <img className={styles.logoImage} src={getImageIcon()} alt="icon" />
      </div>

      <div
        className={`${styles.infoTitle} ${noOfCards >= 2 &&
          styles.infoTitle2} ${noOfCards >= 4 &&
          styles.infoTitle4} ${noOfCards >= 6 && styles.infoTitle6}`}
      >
        <div>{title}</div>
        {noOfCards >= 2 && (
          <div
            className={`${styles.infoValue} ${noOfCards >= 2 &&
              styles.infoValue2}`}
          >
            {condition}
          </div>
        )}
        <span>{value}</span>
      </div>

      {noOfCards < 2 && <div className={styles.infoValue}>{condition}</div>}
    </div>
  );
};

export default IndoorInfoCard;
