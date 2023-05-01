import React, { useContext } from 'react';
import TemperatureIcon from '../../Assets/TemperatureIcon.png';
import styles from './styles.module.css';
import {
  getHumidity,
  getIfHumidityVisible,
  getIfOutdoorTemperatureHumidityVisible,
  getIfTemperatureHumidityVisible,
  getIfTemperatureVisible,
  getOutdoorHumidity,
  getOutdoorTemperature,
  getTemperature,
} from '../../UtilityFunctions/Utils';
import PartnerDataContext from '../../Contexts/PartnerDataContext';

const TemperatureHumidityComponent = () => {
  const { partnerData } = useContext(PartnerDataContext);

  return (
    <div className={styles.mainContainer}>
      <div
        className={`${styles.infoCard} ${(getIfTemperatureVisible(
          partnerData,
        ) ||
          getIfHumidityVisible(partnerData)) &&
          styles.infoCard2}   ${getIfOutdoorTemperatureHumidityVisible(
          partnerData,
        ) && styles.infoOutdoorCard} `}
      >
        <img className={styles.logoImage} src={TemperatureIcon} alt="logo" />
        <div className={styles.infoTitle}>temperature</div>

        <div
          className={`${
            styles.infoValue
          } ${getIfOutdoorTemperatureHumidityVisible(partnerData) &&
            styles.infoOutdoorValue}`}
        >
          {!getIfOutdoorTemperatureHumidityVisible(partnerData) &&
            getTemperature(partnerData)}
          <span>
            indoor <div>{getTemperature(partnerData)}</div>
          </span>
          <span>
            outdoor <div>{getOutdoorTemperature(partnerData)}</div>
          </span>
        </div>
      </div>

      {getIfTemperatureHumidityVisible(partnerData) && (
        <div
          className={`${styles.infoCard} ${(getIfTemperatureVisible(
            partnerData,
          ) ||
            getIfHumidityVisible(partnerData)) &&
            styles.infoCard2}  ${getIfOutdoorTemperatureHumidityVisible(
            partnerData,
          ) && styles.infoOutdoorCard} `}
        >
          <img className={styles.logoImage} src={TemperatureIcon} alt="logo" />
          <div className={styles.infoTitle}>Humidity</div>

          <div
            className={`${
              styles.infoValue
            } ${getIfOutdoorTemperatureHumidityVisible(partnerData) &&
              styles.infoOutdoorValue}`}
          >
            {!getIfOutdoorTemperatureHumidityVisible(partnerData) &&
              getHumidity(partnerData)}

            <span>
              indoor <div>{getHumidity(partnerData)}</div>
            </span>
            <span>
              outdoor <div>{getOutdoorHumidity(partnerData)}</div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureHumidityComponent;
