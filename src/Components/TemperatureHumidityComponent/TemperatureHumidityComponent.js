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

const TemperatureHumidityComponent = ({
  outdoorInfo = false,
  dataIndex = 0,
}) => {
  const { partnerData } = useContext(PartnerDataContext);
  console.log("temerature index",dataIndex)
  console.log("temerature index",getTemperature(partnerData, dataIndex))

  const indoorTemp = getTemperature(partnerData, dataIndex)
  const indoorHumidity = getHumidity(partnerData, dataIndex)
  
  
  const parameterLength = getParametersExcludingTempHum(partnerData).length;

  return (
    <div
      className={`${styles.mainContainer}`}
      style={{ opacity: getIfTemperatureHumidityVisible(partnerData) ? 1 : 0 }}
    >
      <div
        className={`${styles.infoCard} 
        ${parameterLength >= 3 &&
          getIfOutdoorTemperatureHumidityVisible(partnerData) &&
          styles.infoCard3}
         ${(getIfTemperatureVisible(partnerData) ||
           getIfHumidityVisible(partnerData)) &&
           styles.infoCard2}  
          
          ${getIfOutdoorTemperatureHumidityVisible(partnerData) &&
            styles.infoOutdoorCard}
            
            ${getIfOutdoorTemperatureHumidityVisible(partnerData) &&
              (getIfTemperatureVisible(partnerData) ||
                getIfHumidityVisible(partnerData)) &&
              styles.infoOutdoorCard2}

              ${parameterLength >= 3 &&
                getIfOutdoorTemperatureHumidityVisible(partnerData) &&
                styles.infoOutdoorCard3}
                ${parameterLength >= 6 &&
                  getIfOutdoorTemperatureHumidityVisible(partnerData) &&
                  styles.infoOutdoorCard6}

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
            indoorTemp}
          {getIfOutdoorTemperatureHumidityVisible(partnerData) && (
            <>
              <span>
                indoor <div>{indoorTemp}</div>
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
          
            ${parameterLength >= 3 &&
              getIfOutdoorTemperatureHumidityVisible(partnerData) &&
              styles.infoOutdoorCard3}

            
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
              indoorHumidity}

            {getIfOutdoorTemperatureHumidityVisible(partnerData) && (
              <>
                {' '}
                <span>
                  indoor <div>{indoorHumidity}</div>
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
