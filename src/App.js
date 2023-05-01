import React, { useEffect, useState, useRef, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import getPartnerDetails from './api/getPartnerDetails';
import './App.css';
import RootComponent from './Components/RootComponent/RootComponent';
import TopBar from './Components/TopBar/TopBar';
import PartnerDataContext from './Contexts/PartnerDataContext';
import TableComponent from './Components/RootComponent/TableComponent/TableComponent';
import getPartnerInfo from './api/getPartnerInfo';

function App() {
  const [partnerData, setPartnerData] = useState(null);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { unique_id = '' } = params;

  const getPartnerParameters = async () => {
    try {
      console.log('unique partner id', unique_id);
      const partnerInfo = await getPartnerInfo(unique_id);
      setPartnerData(partnerInfo);
      console.log('partner info', partnerInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const PartnerDataContextValue = useMemo(
    () => ({ partnerData, setPartnerData }),
    [partnerData, setPartnerData],
  );

  useEffect(() => {
    getPartnerParameters();
  }, []);

  if (!partnerData)
    return (
      <div className="spinnerContainer wrapper">
        <CircularProgress color="inherit" />
      </div>
    );

  return (
    <PartnerDataContext.Provider value={PartnerDataContextValue}>
      <>
        <div className="wrapper">
          <TopBar />
          <RootComponent />
        </div>

        {/* <TableComponent /> */}
      </>
    </PartnerDataContext.Provider>
  );
}

export default App;
