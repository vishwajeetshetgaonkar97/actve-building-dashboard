import React from 'react';
import ActiveBuildingLogoImage from '../../Assets/ActiveBuildingsLogo.png';
import styles from './styles.module.css';

const TopBar = () => {
  return (
    <div className={styles.mainContainer}>
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
JASLOK HOSPITAL IVF </span>  <span>MAIN OT</span>   
      </div>
    </div>
  );
};

export default TopBar;
