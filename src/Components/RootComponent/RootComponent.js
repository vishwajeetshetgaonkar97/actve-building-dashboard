import React, { useEffect, useMemo, useState, useContext } from 'react';
import getBuildingDeviceList from '../../api/getBuildingDeviceList';
import getDeviceLatestLog from '../../api/getDeviceLatestLog';
import getDevicePastLatestLogs from '../../api/getDevicePastLatestLogs';
import BuildingDataContext from '../../Contexts/BuildingDataContext';
import BuildingDeviceListDataContext from '../../Contexts/BuildingDeviceListDataContext';
import DeviceLatestLogDataContext from '../../Contexts/DeviceLatestLogDataContext';
import DeviceLatestPastLogDataContext from '../../Contexts/DeviceLatestPastLogDataContext';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import {
  getDefaultLat,
  getDefaultLon,
  getIfOutdoorTemperatureHumidityVisible,
  getIfTemperatureHumidityVisible,
} from '../../UtilityFunctions/Utils';
import AreaSelection from '../AreaSelection/AreaSelection';
import InfoDisplay from '../InfoDisplay/InfoDisplay';
import styles from './styles.module.css';
import TemperatureHumidityComponent from '../TemperatureHumidityComponent/TemperatureHumidityComponent';
import PmValueComponent from '../PmValueComponent/PmValueComponent';
import TableComponent from './TableComponent/TableComponent';
import OutdoorPmValueComponent from '../OutdoorPmValueComponent/OutdoorPmValueComponent';

const RootComponent = () => {
  const [buildingIndex, setBuildingIndex] = useState(0);
  const [buildingDeviceValue, setBuildingDeviceValue] = useState(null);

  const [buildingData, setBuildingData] = useState(null);
  const [buildingDeviceListData, setBuildingDeviceListData] = useState(null);
  const [deviceLatestLogData, setDeviceLatestLogData] = useState(null);
  const [deviceLatestPastLogData, setDeviceLatestPastLogData] = useState(null);

  const { partnerData } = useContext(PartnerDataContext);

  const getDeviceLatestLogInfo = async (deviceIndex = 0) => {
    try {
      const deviceLatestLog = await getDeviceLatestLog(
        partnerData[buildingIndex].building_id,
        buildingDeviceValue,
      );
      setDeviceLatestLogData(deviceLatestLog);
      console.log('deviceLatestLog', deviceLatestLog);

      const devicePastInfoLog = await getDevicePastLatestLogs(
        partnerData[buildingIndex].building_id,
        buildingDeviceValue,
      );
      setDeviceLatestPastLogData(devicePastInfoLog);
      console.log('past 7 days log', devicePastInfoLog);
    } catch (error) {
      console.log('error');
    }
  };

  const getBuildingListInfo = async (index = 0) => {
    try {
      const buildingDeviceList = await getBuildingDeviceList(
        partnerData[buildingIndex].building_id,
      );
      setBuildingDeviceListData(buildingDeviceList);
      console.log('buildingDeviceList', buildingDeviceList);
    } catch (error) {
      console.log('error');
    }
  };

  const getContextInfoData = async () => {
    try {
      // const buildingsDetails = await getBuildingDetails();
      // setBuildingData(buildingsDetails);
      getBuildingListInfo();
      if (buildingDeviceListData) {
        getDeviceLatestLogInfo(0);
      }

      // const buildingDeviceList = await getBuildingDeviceList(partnerData[0].building_id);
      // setBuildingDeviceListData(buildingDeviceList);
    } catch (error) {
      console.log(error);
    }
  };

  const BuildingDataContextValue = useMemo(
    () => ({ buildingData, setBuildingData }),
    [buildingData, setBuildingData],
  );

  const BuildingDeviceListDataContextValue = useMemo(
    () => ({ buildingDeviceListData, setBuildingDeviceListData }),
    [buildingDeviceListData, setBuildingDeviceListData],
  );

  const DeviceLatestLogDataContextValue = useMemo(
    () => ({ deviceLatestLogData, setDeviceLatestLogData }),
    [deviceLatestLogData, setDeviceLatestLogData],
  );

  const deviceLatestPastLogDataContextValue = useMemo(
    () => ({ deviceLatestPastLogData, setDeviceLatestPastLogData }),
    [deviceLatestPastLogData, setDeviceLatestPastLogData],
  );

  useEffect(() => {
    // getContextInfoData();
  }, [partnerData]);

  useEffect(() => {
    console.log('buildingIndex', buildingIndex);
    getContextInfoData(buildingIndex);
  }, [buildingIndex]);

  useEffect(() => {
    getDeviceLatestLogInfo(buildingIndex);
  }, [buildingDeviceValue]);

  return (
    <BuildingDataContext.Provider value={BuildingDataContextValue}>
      <BuildingDeviceListDataContext.Provider
        value={BuildingDeviceListDataContextValue}
      >
        <DeviceLatestLogDataContext.Provider
          value={DeviceLatestLogDataContextValue}
        >
          <DeviceLatestPastLogDataContext.Provider
            value={deviceLatestPastLogDataContextValue}
          >
            <div className={styles.mainContainer}>
              {getIfTemperatureHumidityVisible(partnerData) && (
                <TemperatureHumidityComponent />
              )}
              {getIfOutdoorTemperatureHumidityVisible(partnerData) ? (
                <OutdoorPmValueComponent />
              ) : (
                <PmValueComponent />
              )}
            </div>
          </DeviceLatestPastLogDataContext.Provider>
        </DeviceLatestLogDataContext.Provider>
      </BuildingDeviceListDataContext.Provider>
    </BuildingDataContext.Provider>
  );
};

export default RootComponent;
