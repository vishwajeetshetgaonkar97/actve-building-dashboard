import React, { useEffect, useMemo, useState, useContext, useRef } from 'react';
import getBuildingDeviceList from '../../api/getBuildingDeviceList';
import getDeviceLatestLog from '../../api/getDeviceLatestLog';
import getDevicePastLatestLogs from '../../api/getDevicePastLatestLogs';
import BuildingDataContext from '../../Contexts/BuildingDataContext';
import BuildingDeviceListDataContext from '../../Contexts/BuildingDeviceListDataContext';
import DeviceLatestLogDataContext from '../../Contexts/DeviceLatestLogDataContext';
import DeviceLatestPastLogDataContext from '../../Contexts/DeviceLatestPastLogDataContext';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import {
  getDataLogByIndex,
  getDefaultLat,
  getDefaultLon,
  getIfOutdoorTemperatureHumidityVisible,
  getIfTemperatureHumidityVisible,
  getParametersExcludingTempHum,
} from '../../UtilityFunctions/Utils';
import styles from './styles.module.css';
import TemperatureHumidityComponent from '../TemperatureHumidityComponent/TemperatureHumidityComponent';
import PmValueComponent from '../PmValueComponent/PmValueComponent';
import OutdoorPmValueComponent from '../OutdoorPmValueComponent/OutdoorPmValueComponent';

const RootComponent = ({ outdoorInfo = false }) => {
  const deviceRef = useRef({ intervalId: null });

  const dataIndex = useRef({ index: 0 });

  const [buildingIndexInfo, setBuildingIndexInfo] = useState(null);

  const [buildingIndex, setBuildingIndex] = useState(0);
  const [buildingDeviceValue, setBuildingDeviceValue] = useState(null);

  const [buildingData, setBuildingData] = useState(null);
  const [buildingDeviceListData, setBuildingDeviceListData] = useState(null);
  const [deviceLatestLogData, setDeviceLatestLogData] = useState(null);
  const [deviceLatestPastLogData, setDeviceLatestPastLogData] = useState(null);

  const { partnerData, partnerDataIndex, setPartnerDataIndex } = useContext(
    PartnerDataContext,
  );

  const handleDeviceIndex = () => {
    if (
      partnerData &&
      partnerData.data_logs &&
      partnerData.data_logs.length > 0
    ) {
      if (dataIndex.current.index < partnerData.data_logs.length - 1) {
        dataIndex.current.index = dataIndex.current.index + 1;
        console.log(
          'information',
          getDataLogByIndex(partnerData, dataIndex.current.index),
        );
        setBuildingIndexInfo(
          getDataLogByIndex(partnerData, dataIndex.current.index),
        );
        return;
      }
      dataIndex.current.index = 0;
      setBuildingIndexInfo(getDataLogByIndex(partnerData, 0));
    }
  };


  // referesh devices every 5 sec
  useEffect(() => {
    deviceRef.current.intervalId = setInterval(() => {
      console.log('loop');
      handleDeviceIndex();
    }, 5000);
    return () => {
      clearInterval(deviceRef.current.intervalId);
    };
  }, []);

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
    () => ({
      buildingData,
      setBuildingData,
      buildingIndexInfo,
      setBuildingIndexInfo,
    }),
    [buildingData, setBuildingData, buildingIndexInfo, setBuildingIndexInfo],
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

  console.log('out', outdoorInfo);

  console.log('indooo', partnerData);

  const parameterLength = getParametersExcludingTempHum(partnerData).length;

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
            <div
              className={`${styles.mainContainer} 
            ${parameterLength >= 3 && styles.mainContainer3}
            ${outdoorInfo === 'true' && styles.mainContainerOutdoor}
            ${outdoorInfo === 'true' &&
              parameterLength >= 3 &&
              styles.mainContainerOutdoor3}
              ${outdoorInfo === 'true' &&
                parameterLength >= 6 &&
                styles.mainContainerOutdoor6}

            `}
            >
              {true && (
                <TemperatureHumidityComponent
                  outdoorInfo={outdoorInfo}
                  dataIndex={dataIndex.current.index}
                />
              )}
              {outdoorInfo === 'true' ? (
                <OutdoorPmValueComponent />
              ) : (
                <PmValueComponent dataIndex={dataIndex.current.index} />
              )}
            </div>
          </DeviceLatestPastLogDataContext.Provider>
        </DeviceLatestLogDataContext.Provider>
      </BuildingDeviceListDataContext.Provider>
    </BuildingDataContext.Provider>
  );
};

export default RootComponent;
