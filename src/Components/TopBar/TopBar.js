import React, { useContext } from 'react';
import ActiveBuildingLogoImage from '../../Assets/ActiveBuildingsLogo.png';
import styles from './styles.module.css';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import { getParametersExcludingTempHum } from '../../UtilityFunctions/Utils';

const TopBar = () => {
  const { partnerData } = useContext(PartnerDataContext);

  const parameterLength = getParametersExcludingTempHum(partnerData).length;


  return (
    <div className={`${styles.mainContainer} `}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logoImage1}
          src={ActiveBuildingLogoImage}
          alt="sarva logo"
        />
        <span className={styles.imageSeperatorBorder} />
        {/* <img
          className={styles.logoImage2}
          src={DrivLogoImage}
          alt="driv logo"
        /> */}
        <div className={styles.logoImage2}>Real time air quality </div>
      </div>

      <div className={styles.infoContainer}>
        <span>
          {partnerData && partnerData.display_name
            ? partnerData.display_name
            : ''}{' '}
        </span>{' '}
        <span>{(partnerData && partnerData.data_logs && partnerData.data_logs[0] && partnerData.data_logs[0].location)
            ? partnerData.data_logs[0].location
            : ''}{' '}</span>
      </div>
    </div>
  );
};

export default TopBar;
