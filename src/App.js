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
  const ref = useRef({ intervalId: null });

  const [partnerData, setPartnerData] = useState(null);
  const [partnerDataIndex, setPartnerDataIndex] = useState(0);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { unique_id = '', outdoorInfo = false } = params;

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
    () => ({
      partnerData,
      setPartnerData,
      partnerDataIndex,
      setPartnerDataIndex,
    }),
    [partnerData, setPartnerData, partnerDataIndex, setPartnerDataIndex],
  );

  useEffect(() => {
    getPartnerParameters();
  }, []);

  // fetch data after 2 min
  useEffect(() => {
    ref.current.intervalId = setInterval(() => {
      getPartnerParameters();
    }, 120000);
    return () => {
      clearInterval(ref.current.intervalId);
    };
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
          <TopBar outdoorInfo={outdoorInfo} />
          <RootComponent outdoorInfo={outdoorInfo} />
        </div>

        {/* <TableComponent /> */}
      </>
    </PartnerDataContext.Provider>
  );
}

export default App;
