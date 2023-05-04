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
      <div className={`${styles.column1} ${parameterLength >= 2 && styles.column12}`}>
        <div
          className={`${styles.childContainer1} ${parameterLength === 2 &&
            styles.childContainer12}`}
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
            className={`${styles.childContainer1} ${parameterLength === 2 &&
              styles.childContainer12}`}
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
    </div>
  );
};

export default PmValueComponent;
