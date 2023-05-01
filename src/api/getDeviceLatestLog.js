import { BASE_URL } from '../constants'; 

const getDeviceLatestLog = async (buildingId =1,deviceId="") => {
  const response = await fetch(
    `${BASE_URL}/get/devices/latest/log/public/${buildingId}/${deviceId}
    `,
  );
  const data = await response.json();

  return data;
};

export default getDeviceLatestLog;
