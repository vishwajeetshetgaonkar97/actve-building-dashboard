import { BASE_URL } from '../constants';

const getDevicePastLatestLogs = async (buildingId = 1, deviceId = '') => {
  const response = await fetch(
    `${BASE_URL}/get/devices/weekly/log/public/${buildingId}/${deviceId}
    `,
  );
  const data = await response.json();

  return data;
};

export default getDevicePastLatestLogs;
