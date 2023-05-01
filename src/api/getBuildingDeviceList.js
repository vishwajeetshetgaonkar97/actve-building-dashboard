import { BASE_URL } from '../constants'; 

const getBuildingDeviceList = async buildingId => {
  const response = await fetch(
    `${BASE_URL}/get/building/devices/list/public/${buildingId}
    `,
  );
  const data = await response.json();

  return data;
};

export default getBuildingDeviceList;
