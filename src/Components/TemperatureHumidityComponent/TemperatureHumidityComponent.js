import React, { useContext } from 'react';
import TemperatureIcon from '../../Assets/TemperatureIcon.png';
import HumidityIcon from '../../Assets/HumidityIcon.png';
import styles from './styles.module.css';
import {
  getHumidity,
  getIfHumidityVisible,
  getIfOutdoorTemperatureHumidityVisible,
  getIfTemperatureHumidityVisible,
  getIfTemperatureVisible,
  getOutdoorHumidity,
  getOutdoorTemperature,
  getParametersExcludingTempHum,
  getTemperature,
} from '../../UtilityFunctions/Utils';
import PartnerDataContext from '../../Contexts/PartnerDataContext';

const TemperatureHumidityComponent = ({ outdoorInfo = false }) => {
  const { partnerData } = useContext(PartnerDataContext);

  const parameterLength = getParametersExcludingTempHum(partnerData).length;

  return (
    <div
      className={`${styles.mainContainer}`}
      style={{ opacity: getIfTemperatureHumidityVisible(partnerData) ? 1 : 0 }}
    >
      <div
        className={`${styles.infoCard} 
        ${parameterLength >= 3 && styles.infoCard3}
         ${(getIfTemperatureVisible(partnerData) ||
           getIfHumidityVisible(partnerData)) &&
           styles.infoCard2}  
          
          ${getIfOutdoorTemperatureHumidityVisible(partnerData) &&
            styles.infoOutdoorCard}
            ${getIfOutdoorTemperatureHumidityVisible(partnerData) &&
              (getIfTemperatureVisible(partnerData) ||
                getIfHumidityVisible(partnerData)) &&
              styles.infoOutdoorCard2}
            `}
      >
        <img className={styles.logoImage} src={HumidityIcon} alt="logo" />
        <div className={styles.infoTitle}>temperature</div>

        <div
          className={`${
            styles.infoValue
          } ${getIfOutdoorTemperatureHumidityVisible(partnerData) &&
            styles.infoOutdoorValue}`}
        >
          {!getIfOutdoorTemperatureHumidityVisible(partnerData) &&
            getTemperature(partnerData)}
          {getIfOutdoorTemperatureHumidityVisible(partnerData) && (
            <>
              <span>
                indoor <div>{getTemperature(partnerData)}</div>
              </span>
              <span>
                outdoor <div>{getOutdoorTemperature(partnerData)}</div>
              </span>
            </>
          )}
        </div>
      </div>

      {getIfTemperatureHumidityVisible(partnerData) && (
        <div
          className={`${styles.infoCard} ${parameterLength >= 3 &&
            styles.infoCard3}
          ${(getIfTemperatureVisible(partnerData) ||
            getIfHumidityVisible(partnerData)) &&
            styles.infoCard2}  ${getIfOutdoorTemperatureHumidityVisible(
            partnerData,
          ) && styles.infoOutdoorCard} 

          ${getIfOutdoorTemperatureHumidityVisible(partnerData) &&
            (getIfTemperatureVisible(partnerData) ||
              getIfHumidityVisible(partnerData)) &&
            styles.infoOutdoorCard2}
          
          `}
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

            {getIfOutdoorTemperatureHumidityVisible(partnerData) && (
              <>
                {' '}
                <span>
                  indoor <div>{getHumidity(partnerData)}</div>
                </span>
                <span>
                  outdoor <div>{getOutdoorHumidity(partnerData)}</div>
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureHumidityComponent;
