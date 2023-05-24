const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const { unique_id = '', outdoorInfo = false } = params;

const getFixedDigitsNumber = (number = 0, gameStateData = null) => {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const getBuildingList = (buildingDeviceListData = null) => {
  if (!buildingDeviceListData) return [];

  const refList = [];

  {
    buildingDeviceListData.map((buildingInfo, i) => {
      refList.push({
        value: buildingInfo.device_id,
        label: `${buildingInfo.node_name}`,
      });
    });
  }

  return refList;
};

const getParameterBackgroundColor = (value = '') => {
  switch (value) {
    case 0: {
      return '#6EBB8C';
    }
    case 1: {
      return '#F4B465';
    }
    case 2: {
      return '#E96868';
    }
    default: {
      return '#FFFFFF66';
    }
  }
};

const getParameterText = (value = '') => {
  console.log('val', value);
  switch (value) {
    case 0: {
      return 'good';
    }
    case 1: {
      return 'moderate';
    }
    case 2: {
      return 'bad';
    }
    default: {
      return 'unavailable';
    }
  }
};

const getPm25IndoorValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.indoor_last_log ||
    !logInfo.indoor_last_log.pm25
  )
    return '--';

  return logInfo.indoor_last_log.pm25.value;
};

const getPm25OutdoorValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.building_outdoor_last_log ||
    !logInfo.building_outdoor_last_log.pm25
  )
    return '--';

  return logInfo.building_outdoor_last_log.pm25.value;
};

const getPm25IndoorIncidentValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.indoor_last_log ||
    !logInfo.indoor_last_log.pm25
  )
    return '--';

  return logInfo.indoor_last_log.pm25.incident_level;
};

const getPm10IndoorValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.indoor_last_log ||
    !logInfo.indoor_last_log.pm10
  )
    return '--';

  return logInfo.indoor_last_log.pm10.value;
};

const getPm10OutdoorValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.building_outdoor_last_log ||
    !logInfo.building_outdoor_last_log.pm10
  )
    return '--';

  return logInfo.building_outdoor_last_log.pm10.value;
};

const getPm10IndoorIncidentValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.indoor_last_log ||
    !logInfo.indoor_last_log.pm10
  )
    return '--';

  return logInfo.indoor_last_log.pm10.incident_level;
};

const getco2IndoorValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.indoor_last_log ||
    !logInfo.indoor_last_log.co2
  )
    return '--';

  return logInfo.indoor_last_log.co2.value;
};

const getco2OutdoorValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.building_outdoor_last_log ||
    !logInfo.building_outdoor_last_log.co2
  )
    return '--';

  return logInfo.building_outdoor_last_log.co2.value;
};

const getco2IndoorIncidentValue = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.indoor_last_log ||
    !logInfo.indoor_last_log.co2
  )
    return '--';

  return logInfo.indoor_last_log.co2.incident_level;
};

const getLatestLogUpdateTime = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.indoor_last_log
  )
    return '';

  return `${logInfo.indoor_last_log.utc_datetime.substring(
    11,
    19,
  )} ${logInfo.indoor_last_log.utc_datetime.substring(
    8,
    10,
  )}/${logInfo.indoor_last_log.utc_datetime.substring(
    5,
    7,
  )}/${logInfo.indoor_last_log.utc_datetime.substring(0, 4)}`;
};

const getNeighbourCity = (logInfo = null, deviceList = []) => {
  if (
    !logInfo ||
    !deviceList ||
    deviceList.length === 0 ||
    !logInfo.neighbour_aqi
  )
    return [];
  console.log('neighbour info', logInfo.neighbour_aqi);
  return logInfo.neighbour_aqi;
};

const getMapData = (
  deviceLatestPastLogData = null,
  isCompared = true,
  buildingDeviceListData,
) => {
  const label = [];
  const indoorValueRef = [];
  const outdoorValueRef = [];
  const datasetValueRef = [];

  if (deviceLatestPastLogData && deviceLatestPastLogData.indoor_graph) {
    deviceLatestPastLogData.indoor_graph.map(element => {
      label.push(element.day.substring(0, 3));
    });
  }
  console.log('graph label', label);

  if (deviceLatestPastLogData && deviceLatestPastLogData.indoor_graph) {
    deviceLatestPastLogData.indoor_graph.map(element => {
      if (element.max.pm25) {
        indoorValueRef.push(element.max.pm25);
      }
    });
  }
  console.log('graph indoor value', indoorValueRef);

  if (deviceLatestPastLogData && deviceLatestPastLogData.outdoor_graph) {
    deviceLatestPastLogData.outdoor_graph.map(element => {
      if (element.max.pm25) {
        outdoorValueRef.push(element.max.pm25);
      }
    });
  }
  console.log('graph outdoor value', outdoorValueRef);

  const indoorRef = {
    label: 'PM2.5',
    data: [0, 0, 0, 0, 0, 0, 0],
    fill: false,
    borderColor: '#9DAFCD',
    tension: 0.1,
  };

  const outdoorRef = {
    label: 'PM2.5',
    data: [0, 0, 0, 0, 0, 0, 0],
    fill: false,
    borderColor: '#4171C5',
    tension: 0.1,
  };

  if (indoorValueRef.length > 0) {
    indoorRef.data = indoorValueRef;
  }

  if (outdoorValueRef.length > 0) {
    outdoorRef.data = outdoorValueRef;
  }

  if (
    indoorValueRef.length > 0 &&
    buildingDeviceListData &&
    buildingDeviceListData.length > 0
  ) {
    datasetValueRef.push(indoorRef);
    if (isCompared) {
      datasetValueRef.push(outdoorRef);
    }
    return {
      labels: label,
      datasets: datasetValueRef,
    };
  }

  const labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const defData = {
    labels,
    datasets: [
      {
        label: 'PM2.5',
        data: [],
        fill: false,
        borderColor: '#4171C5',
        tension: 0.1,
      },
      {
        label: 'PM2.5',
        data: [],
        fill: false,
        borderColor: '#9DAFCD',
        tension: 0.1,
      },
    ],
  };
  return defData;
};

const getNoOfTimesBetterOrWorse = (indoor = 1, outdoor = 2) => {
  if (
    indoor === outdoor ||
    !indoor ||
    !outdoor ||
    indoor === '--' ||
    outdoor === '--'
  )
    return '--';

  console.log('indoor better', (outdoor / indoor) >> 0);
  console.log('outdoor better', (outdoor / indoor) >> 0);

  if (indoor > outdoor) return `${(indoor / outdoor) >> 0}x`;

  return `${(outdoor / indoor) >> 0}x`;
};

const getIfBetterOrWorse = (indoor, outdoor) => {
  if (
    indoor === outdoor ||
    !indoor ||
    !outdoor ||
    indoor === '--' ||
    outdoor === '--'
  )
    return '';
  if (outdoor > indoor) return 'BETTER';
  return 'WORSE';
};

const getIfBetterOrWorseColor = (indoor, outdoor) => {
  if (
    indoor === outdoor ||
    !indoor ||
    !outdoor ||
    indoor === '--' ||
    outdoor === '--'
  )
    return '';
  if (outdoor > indoor) return false;
  return true;
};

function checkIfValidlatitudeAndlongitude(str) {
  // Regular expression to check if string is a latitude and longitude
  const regexExp = /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi;

  return regexExp.test(str);
}

const getDefaultLat = (lat = 0, longitude = 0) => {
  if (checkIfValidlatitudeAndlongitude(lat, longitude)) return lat;

  return 19.076;
};

const getDefaultLon = (lat = 0, longitude = 0) => {
  if (checkIfValidlatitudeAndlongitude(lat, longitude)) return longitude;

  return 72.8777;
};

// dash

const getParametersExcludingTempHum = partnerInfo => {
  if (partnerInfo && partnerInfo.indoor_params) {
    const parameterArray = partnerInfo.indoor_params.split(',');

    if (partnerInfo.indoor_params.includes('temp')) {
      const index = parameterArray.indexOf('temp');

      if (index > -1) {
        parameterArray.splice(index, 1);
      }
    }

    if (partnerInfo.indoor_params.includes('hum')) {
      const index = parameterArray.indexOf('hum');
      if (index > -1) {
        parameterArray.splice(index, 1);
      }
    }

    if (partnerInfo.indoor_params.includes('aqi')) {
      const index = parameterArray.indexOf('aqi');
      if (index > -1) {
        parameterArray.splice(index, 1);
      }
    }

    console.log('parameter array', parameterArray);

    return parameterArray;
  }

  return [];
};

const getIfTemperatureHumidityVisible = partnerInfo => {

  if (
    partnerInfo &&
    partnerInfo.indoor_params &&
    (partnerInfo.indoor_params.includes('temp') ||
      partnerInfo.indoor_params.includes('hum'))
  )
    return true;
  return false;
};

const getIfOutdoorTemperatureHumidityVisible = partnerInfo => {
  if (
    outdoorInfo &&
    outdoorInfo === 'true' &&
    partnerInfo &&
    partnerInfo.indoor_params &&
    partnerInfo.external_device_log &&
    (partnerInfo.indoor_params.includes('temp') ||
      partnerInfo.indoor_params.includes('hum'))
  )
    return true;
  return false;
};

const getIfTemperatureVisible = partnerInfo => {
  getParametersExcludingTempHum(partnerInfo);

  if (
    partnerInfo &&
    partnerInfo.indoor_params &&
    partnerInfo.indoor_params.includes('temp')
  )
    return true;
  return false;
};

const getIfHumidityVisible = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.indoor_params &&
    partnerInfo.indoor_params.includes('hum')
  )
    return true;
  return false;
};

const getTemperature = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.indoor_params &&
    partnerInfo.data_logs &&
    partnerInfo.indoor_params.includes('temp')
  )
    return `${partnerInfo.data_logs[0].temp.value}°C`;
  return `-`;
};

const getOutdoorTemperature = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.external_device_log &&
    partnerInfo.external_device_log.temp
  )
    return `${partnerInfo.external_device_log.temp.value}°C`;
  return `-`;
};

const getHumidity = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.indoor_params &&
    partnerInfo.data_logs &&
    partnerInfo.indoor_params.includes('hum')
  )
    return `${partnerInfo.data_logs[0].hum.value}% Rh`;
  return `-`;
};

const getOutdoorHumidity = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.external_device_log &&
    partnerInfo.external_device_log.hum
  )
    return `${partnerInfo.external_device_log.hum.value}% Rh`;
  return `-`;
};

const getPm25Value = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].pm25 &&
    partnerInfo.data_logs[0].pm25.value
  )
    return `${partnerInfo.data_logs[0].pm25.value} ug/m3`;
  return `-`;
};

const getPm10Value = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].pm10 &&
    partnerInfo.data_logs[0].pm10.value
  )
    return `${partnerInfo.data_logs[0].pm10.value} ug/m3`;
  return `-`;
};

const gettvocValue = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].tvoc &&
    partnerInfo.data_logs[0].tvoc.value
  )
    return `${partnerInfo.data_logs[0].tvoc.value} ppb`;
  return `-`;
};

const gettco2Value = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].co2 &&
    partnerInfo.data_logs[0].co2.value
  )
    return `${partnerInfo.data_logs[0].co2.value} ppm`;
  return `-`;
};

const gettso2Value = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].so2 &&
    partnerInfo.data_logs[0].so2.value
  )
    return `${partnerInfo.data_logs[0].so2.value} ppb`;
  return `-`;
};

const gettno2Value = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].no2 &&
    partnerInfo.data_logs[0].no2.value
  )
    return `${partnerInfo.data_logs[0].no2.value} ppb`;
  return `-`;
};

const getto3Value = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].o3 &&
    partnerInfo.data_logs[0].o3.value
  )
    return `${partnerInfo.data_logs[0].o3.value} ppb`;
  return `-`;
};

const gettcoValue = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].co &&
    partnerInfo.data_logs[0].co.value
  )
    return `${partnerInfo.data_logs[0].co.value} ppb`;
  return `-`;
};

const gettch2oValue = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].ch2o &&
    partnerInfo.data_logs[0].ch2o.value
  )
    return `${partnerInfo.data_logs[0].ch2o.value} ppb`;
  return `-`;
};

const getSoundValue = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].sound &&
    partnerInfo.data_logs[0].sound.value
  )
    return `${partnerInfo.data_logs[0].sound.value} dBA`;
  return `-`;
};

const getLightValue = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].light &&
    partnerInfo.data_logs[0].light.value
  )
    return `${partnerInfo.data_logs[0].light.value} Lux`;
  return `-`;
};

const getPm1Value = partnerInfo => {
  if (
    partnerInfo &&
    partnerInfo.data_logs &&
    partnerInfo.data_logs[0] &&
    partnerInfo.data_logs[0].pm1 &&
    partnerInfo.data_logs[0].pm1.value
  )
    return `${partnerInfo.data_logs[0].pm1.value} ug/m3`;
  return `-`;
};


const getIndoorInfoName = (partnerInfo, index = 0) => {
  if (!partnerInfo || !partnerInfo.data_logs) return `-`;

  const dataLog = partnerInfo.data_logs[0];
  const parameter = dataLog[getParametersExcludingTempHum(partnerInfo)[index]];
  console.log('paraaaaa', getParametersExcludingTempHum(partnerInfo)[index]);

  switch (getParametersExcludingTempHum(partnerInfo)[index]) {
    case 'pm25':
      return 'pm 2.5';

    case 'pm10':
      return 'pm 10';

    case 'tvoc':
      return 'tvoc';

    case 'co2':
      return 'co2';

    case 'so2':
      return 'so2';

    case 'no2':
      return 'no2';

    case 'o3':
      return 'o3';

    case 'co':
      return 'co';

      case 'ch2o':
      return 'ch2o';

      case 'sound':
        return 'Sound';

        case 'light':
        return 'Light';

        case 'pm1':
        return 'PM1';

    default:
      return '-';
  }
};

const getIndoorInfoValue = (partnerInfo, index = 0) => {
  if (!partnerInfo || !partnerInfo.data_logs) return `-`;

  const dataLog = partnerInfo.data_logs[0];
  console.log('para', getParametersExcludingTempHum(partnerInfo)[index]);

  switch (getParametersExcludingTempHum(partnerInfo)[index]) {
    case 'pm25':
      return getPm25Value(partnerInfo);

    case 'pm10':
      return getPm10Value(partnerInfo);

    case 'tvoc':
      return gettvocValue(partnerInfo);

    case 'co2':
      return gettco2Value(partnerInfo);

    case 'so2':
      return gettso2Value(partnerInfo);

    case 'no2':
      return gettno2Value(partnerInfo);

    case 'o3':
      return getto3Value(partnerInfo);

    case 'co':
      return gettcoValue(partnerInfo);

      case 'ch2o':
      return gettch2oValue(partnerInfo);

      case 'sound':
        return getSoundValue(partnerInfo);

        case 'light':
        return getLightValue(partnerInfo);

        case 'pm1':
        return getPm1Value(partnerInfo);

      

    default:
      return '-';
  }
};

const getOutdoorInfoValue = (partnerInfo, index = 0) => {
  if (!partnerInfo || !partnerInfo.data_logs) return `-`;

  const dataLog = partnerInfo.external_device_log;

  if (!dataLog[getParametersExcludingTempHum(partnerInfo)[index]]) return '-';


  console.log(
    'out',
    dataLog[getParametersExcludingTempHum(partnerInfo)[index]],
  );

  
  return `${
    dataLog[getParametersExcludingTempHum(partnerInfo)[index]].value
  } ug/m3`;
};

const getIndoorInfoValueCondition = (partnerInfo, index = 0) => {
  if (!partnerInfo || !partnerInfo.data_logs) return `-`;

  const dataLog = partnerInfo.data_logs[0];
  console.log(
    'connnnn',
    dataLog[getParametersExcludingTempHum(partnerInfo)[index]],
  );

  if (!dataLog[getParametersExcludingTempHum(partnerInfo)[index]]) return '-';

  return getParameterText(
    dataLog[getParametersExcludingTempHum(partnerInfo)[index]].incident_level,
  );
};

const getOutdoorInfoValueCondition = (partnerInfo, index = 0) => {
  if (!partnerInfo || !partnerInfo.data_logs) return `-`;

  const dataLog = partnerInfo.external_device_log;
  console.log(
    'out connnnn',
    dataLog[getParametersExcludingTempHum(partnerInfo)[index]],
  );

  if (!dataLog[getParametersExcludingTempHum(partnerInfo)[index]]) return '-';

  return getParameterText(
    dataLog[getParametersExcludingTempHum(partnerInfo)[index]].incident_level,
  );
};

export default getFixedDigitsNumber;

export {
  getFixedDigitsNumber,
  getPm25IndoorValue,
  getPm25OutdoorValue,
  getPm25IndoorIncidentValue,
  getPm10IndoorValue,
  getPm10OutdoorValue,
  getPm10IndoorIncidentValue,
  getco2IndoorValue,
  getco2OutdoorValue,
  getco2IndoorIncidentValue,
  getBuildingList,
  getParameterBackgroundColor,
  getParameterText,
  getLatestLogUpdateTime,
  getNeighbourCity,
  getMapData,
  getIfBetterOrWorse,
  getIfBetterOrWorseColor,
  getNoOfTimesBetterOrWorse,
  getDefaultLat,
  getDefaultLon,
  getParametersExcludingTempHum,
  checkIfValidlatitudeAndlongitude,
  getIfTemperatureHumidityVisible,
  getIfTemperatureVisible,
  getIfHumidityVisible,
  getTemperature,
  getHumidity,
  getPm25Value,
  getIfOutdoorTemperatureHumidityVisible,
  getOutdoorTemperature,
  getOutdoorHumidity,
  getIndoorInfoName,
  getIndoorInfoValue,
  getIndoorInfoValueCondition,
  getOutdoorInfoValue,
  getOutdoorInfoValueCondition,
};
