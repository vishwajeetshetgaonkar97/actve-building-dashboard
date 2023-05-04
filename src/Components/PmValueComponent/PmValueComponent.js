import React, { useContext } from 'react';
import GoodIcon from '../../Assets/GoodIcon.png';
import styles from './styles.module.css';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import {
  getIndoorInfoName,
  getIndoorInfoValue,
  getIndoorInfoValueCondition,
  getParametersExcludingTempHum,
  getPm25Value,
} from '../../UtilityFunctions/Utils';
import IndoorInfoCard from '../IndoorInfoCard/IndoorInfoCard';

const PmValueComponent = () => {
  const { partnerData } = useContext(PartnerDataContext);

  const parameterLength = getParametersExcludingTempHum(partnerData).length;

  return (
    <div className={styles.mainContainer}>
      <div
        className={`${styles.column1} 
        ${parameterLength >= 2 && styles.column12}
        ${parameterLength >= 3 && styles.column13}
        ${parameterLength >= 4 && styles.column14}
        `}
      >
        <div
          className={`${styles.childContainer1} 
          ${parameterLength === 2 && styles.childContainer12}
          ${parameterLength >= 3 && styles.childContainer13}
          `}
        >
          <IndoorInfoCard
            title={getIndoorInfoName(partnerData, 0)}
            value={getIndoorInfoValue(partnerData, 0)}
            condition={getIndoorInfoValueCondition(partnerData, 0)}
            noOfCards={parameterLength}
          />
        </div>

        {parameterLength >= 2 && (
          <div
            className={`${styles.childContainer1} 
          ${parameterLength === 2 && styles.childContainer12}
          ${parameterLength >= 3 && styles.childContainer13}
          
          `}
          >
            <IndoorInfoCard
              title={getIndoorInfoName(partnerData, 1)}
              value={getIndoorInfoValue(partnerData, 1)}
              condition={getIndoorInfoValueCondition(partnerData, 1)}
              noOfCards={parameterLength}
            />
          </div>
        )}
      </div>

      {parameterLength >= 3 && (
        <div
          className={`${styles.column2} 
          ${parameterLength >= 4 && styles.column21}
          
          `}
        >
          <div
            className={`${styles.childContainer2} ${parameterLength === 2 &&
              styles.childContainer22}`}
          >
            <IndoorInfoCard
              title={getIndoorInfoName(partnerData, 2)}
              value={getIndoorInfoValue(partnerData, 2)}
              condition={getIndoorInfoValueCondition(partnerData, 2)}
              noOfCards={parameterLength}
              isLong={
                parameterLength === 3 ||
                parameterLength === 4 ||
                parameterLength === 5
              }
            />
          </div>

          {parameterLength >= 8 && (
            <div
              className={`${styles.childContainer2} ${parameterLength === 2 &&
                styles.childContainer22}`}
            >
              <IndoorInfoCard
                title={getIndoorInfoName(partnerData, 0)}
                value={getIndoorInfoValue(partnerData, 0)}
                condition={getIndoorInfoValueCondition(partnerData, 0)}
                noOfCards={parameterLength}
              />
            </div>
          )}
        </div>
      )}

      {parameterLength >= 4 && (
        <div
          className={`${styles.column3} 
          ${parameterLength >= 4 && styles.column32}
          `}
        >
          <div
            className={`${styles.childContainer3} 
            ${parameterLength >= 4 && styles.childContainer32}
            
            `}
          >
            <IndoorInfoCard
              title={getIndoorInfoName(partnerData, 3)}
              value={getIndoorInfoValue(partnerData, 3)}
              condition={getIndoorInfoValueCondition(partnerData, 3)}
              noOfCards={parameterLength}
              isLong={parameterLength === 3 || parameterLength === 4}
            />
          </div>

          {parameterLength >= 5 && (
            <div
              className={`${styles.childContainer3} ${parameterLength >= 4 &&
                styles.childContainer32}`}
            >
              <IndoorInfoCard
                title={getIndoorInfoName(partnerData, 4)}
                value={getIndoorInfoValue(partnerData, 4)}
                condition={getIndoorInfoValueCondition(partnerData, 4)}
                noOfCards={parameterLength}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PmValueComponent;
