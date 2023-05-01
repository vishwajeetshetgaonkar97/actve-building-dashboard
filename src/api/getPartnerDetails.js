import { BASE_URL } from '../constants'; 

const getPartnerDetails = async (partnerId = '') => {
  
  const response = await fetch(
    `${BASE_URL}/get/partner/building/details/public/${partnerId}`,
  );
  const data = await response.json();

  return data;
};

export default getPartnerDetails;
