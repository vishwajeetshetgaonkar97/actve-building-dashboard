import React, { useContext } from 'react';
import GoodIcon from '../../Assets/GoodIcon.png';
import styles from './styles.module.css';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import {
  getParametersExcludingTempHum,
  getPm25Value,
} from '../../UtilityFunctions/Utils';
import OutdoorInfoCard from '../OutdoorInfoCard/OutdoorInfoCard';

const OutdoorPmValueComponent = () => {
  const { partnerData } = useContext(PartnerDataContext);

  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.childContainer1}`}>
      <OutdoorInfoCard />
      </div>
    </div>
  );
};

export default OutdoorPmValueComponent;
