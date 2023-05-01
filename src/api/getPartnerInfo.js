import { BASE_URL } from '../constants'; 

const getPartnerInfo = async buildingId => {
  const response = await fetch(
    `${BASE_URL}/view/latest/sensor/data/public/?unique_id=${buildingId}
    `,
  );
  const data = await response.json();

  return data;
};

export default getPartnerInfo;
