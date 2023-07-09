import React, { useContext, useEffect } from 'react';
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
import BuildingDataContext from '../../Contexts/BuildingDataContext';

const PmValueComponent = ({ dataIndex = 0 }) => {
  const { partnerData, parnerDataIndex } = useContext(PartnerDataContext);

  const { buildingIndexInfo } = useContext(BuildingDataContext);

  const parameterLength = getParametersExcludingTempHum(partnerData).length;

  console.log('informationnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', parnerDataIndex);

  useEffect(() => {
    console.log('yes things have been changed', buildingIndexInfo);
  }, [buildingIndexInfo]);

  return (
    <div
      className={`${styles.mainContainer} 
    ${parameterLength >= 3 && styles.mainContainer3}`}
    >
      <div
        className={`${styles.column1} 
        ${parameterLength >= 2 && styles.column12}
        ${parameterLength >= 3 && styles.column13}
        ${parameterLength >= 4 && styles.column14}
        ${parameterLength >= 6 && styles.column16}
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
            value={getIndoorInfoValue(partnerData, 0, dataIndex)}
            condition={getIndoorInfoValueCondition(partnerData, 0, dataIndex)}
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
              value={getIndoorInfoValue(partnerData, 1, dataIndex)}
              condition={getIndoorInfoValueCondition(partnerData, 1, dataIndex)}
              noOfCards={parameterLength}
            />
          </div>
        )}
      </div>

      {parameterLength >= 3 && (
        <div
          className={`${styles.column2} 
          ${parameterLength >= 4 && styles.column21}
          ${parameterLength >= 6 && styles.column24}
          ${parameterLength >= 8 && styles.column28}
          `}
        >
          <div
            className={`${styles.childContainer2} ${parameterLength === 2 &&
              styles.childContainer22} ${parameterLength === 8 &&
              styles.childContainer28}`}
          >
            <IndoorInfoCard
              title={getIndoorInfoName(partnerData, 2)}
              value={getIndoorInfoValue(partnerData, 2, dataIndex)}
              condition={getIndoorInfoValueCondition(partnerData, 2, dataIndex)}
              noOfCards={parameterLength}
              isLong={
                parameterLength === 3 ||
                parameterLength === 4 ||
                parameterLength === 5 ||
                parameterLength === 6 ||
                parameterLength === 7
              }
            />
          </div>

          {parameterLength >= 8 && (
            <div
              className={`${styles.childContainer2} ${parameterLength === 8 &&
                styles.childContainer28}`}
            >
              <IndoorInfoCard
                title={getIndoorInfoName(partnerData, 7)}
                value={getIndoorInfoValue(partnerData, 7, dataIndex)}
                condition={getIndoorInfoValueCondition(
                  partnerData,
                  7,
                  dataIndex,
                )}
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
          ${parameterLength >= 6 && styles.column34}
          `}
        >
          <div
            className={`${styles.childContainer3} 
            ${parameterLength >= 5 && styles.childContainer32}
            
            `}
          >
            <IndoorInfoCard
              title={getIndoorInfoName(partnerData, 3)}
              value={getIndoorInfoValue(partnerData, 3, dataIndex)}
              condition={getIndoorInfoValueCondition(partnerData, 3, dataIndex)}
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
                value={getIndoorInfoValue(partnerData, 4, dataIndex)}
                condition={getIndoorInfoValueCondition(
                  partnerData,
                  4,
                  dataIndex,
                )}
                noOfCards={parameterLength}
              />
            </div>
          )}
        </div>
      )}

      {parameterLength >= 6 && (
        <div
          className={`${styles.column4} 
          ${parameterLength >= 4 && styles.column32}
          ${parameterLength >= 7 && styles.column42}
          
          `}
        >
          <div
            className={`${styles.childContainer4} 
            ${parameterLength >= 7 && styles.childContainer42}
            
            `}
          >
            <IndoorInfoCard
              title={getIndoorInfoName(partnerData, 5)}
              value={getIndoorInfoValue(partnerData, 5, dataIndex)}
              condition={getIndoorInfoValueCondition(partnerData, 5, dataIndex)}
              noOfCards={parameterLength}
              isLong={parameterLength === 6}
            />
          </div>

          {parameterLength >= 7 && (
            <div
              className={`${styles.childContainer4} ${parameterLength >= 7 &&
                styles.childContainer42}`}
            >
              <IndoorInfoCard
                title={getIndoorInfoName(partnerData, 6)}
                value={getIndoorInfoValue(partnerData, 6, dataIndex)}
                condition={getIndoorInfoValueCondition(
                  partnerData,
                  6,
                  dataIndex,
                )}
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
