import React, { useContext } from 'react';
import GoodIcon from '../../Assets/GoodIcon.png';
import ModerateIcon from '../../Assets/ModerateIcon.png';
import BadIcon from '../../Assets/BadIcon.png';
import styles from './styles.module.css';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import {
  getParametersExcludingTempHum,
  getPm25Value,
} from '../../UtilityFunctions/Utils';

const OutdoorInfoCard = ({
  title = '',
  value = 0,
  valueOut = 0,
  condition = '',
  conditionOut = '',
  noOfCards = 1,
  isLong = false,
}) => {
  const { partnerData } = useContext(PartnerDataContext);

  const getImageIcon = (conditionValue = '') => {
    if (conditionValue === 'bad') return BadIcon;
    if (conditionValue === 'moderate') return ModerateIcon;
    return GoodIcon;
  };

  return (
    <div className={`${styles.infoCard} ${isLong && styles.infoCardLong}`}>
      <div className={styles.infoCardTitle}>{title}</div>
      <div
        className={`${styles.innerInfoCard}  
        ${isLong && styles.innerInfoCardLong}
        ${noOfCards >= 3 && styles.innerInfoCard3}`}
      >
        <div
          className={`${styles.infoImageContainer} 
          ${noOfCards >= 2 && styles.infoImageContainer2}
          ${condition === 'bad' && styles.infoImageBadContainer} ${condition ===
            'moderate' && styles.infoImageModerateContainer} `}
        >
          <img
            className={styles.logoImage}
            src={getImageIcon(condition)}
            alt="sarva logo"
          />
        </div>

        <div
          className={`${styles.infoTitle} 
         
          ${noOfCards >= 2 && styles.infoTitle2}
          ${noOfCards >= 3 && styles.infoTitle3}
            `}
        >
          <div>indoor</div>
          <span>
            <div>{condition}</div>{' '}
            <div className={styles.infoValue}>{value}</div>{' '}
          </span>
        </div>
      </div>

      <div
        className={`${styles.innerInfoCard}  
       ${isLong && styles.innerInfoCardLong}
       ${noOfCards >= 3 && styles.innerInfoCard3}`}
      >
        <div
          className={`${styles.infoImageContainer} ${noOfCards >= 2 &&
            styles.infoImageContainer2} ${condition === 'bad' &&
            styles.infoImageBadContainer} ${condition === 'moderate' &&
            styles.infoImageModerateContainer} `}
        >
          <img
            className={styles.logoImage}
            src={getImageIcon(conditionOut)}
            alt="sarva logo"
          />
        </div>

        <div
          className={`${styles.infoTitle}
           ${noOfCards >= 2 && styles.infoTitle2}
           ${noOfCards >= 3 && styles.infoTitle3}
           `}
        >
          <div>outdoor</div>
          <span>
            <div>{conditionOut}</div>{' '}
            <div className={styles.infoValue}>{valueOut}</div>{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OutdoorInfoCard;
