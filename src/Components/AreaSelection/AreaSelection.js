import React, { useEffect, useMemo, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import GoogleMapReact from 'google-map-react';
import { MdLocationOn } from 'react-icons/md';
import styles from './styles.module.css';
import BuildingDataContext from '../../Contexts/BuildingDataContext';
import PartnerDataContext from '../../Contexts/PartnerDataContext';
import DeviceLatestLogDataContext from '../../Contexts/DeviceLatestLogDataContext';
import {
  checkIfValidlatitudeAndlongitude,
  getMapLatLong,
} from '../../UtilityFunctions/Utils';

const AnyReactComponent = ({
  isSelected = false,
  index,
  setBuildingIndex,
  setDeviceLatestLogData,
  setBuildingDeviceValue,
}) => {
  return (
    <div className={styles.demoTick}>
      <MdLocationOn
        size={isSelected ? 40 : 27}
        color={isSelected ? '#F7F5E0' : '#9DAFCD'}
        onClick={() => {
          setDeviceLatestLogData(null);
          setBuildingDeviceValue(null);
          setBuildingIndex(index);
        }}
      />
    </div>
  );
};

const AreaSelection = ({
  defaultLat = 15.2993,
  defaultLon = 74.124,
  buildingIndex,
  setBuildingIndex,
  setBuildingDeviceValue,
}) => {
  const { partnerData } = useContext(PartnerDataContext);
  const { setDeviceLatestLogData } = useContext(DeviceLatestLogDataContext);

  return (
    <div className={styles.outerContainer}>
      {partnerData && (
        <div className={styles.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyA-C7BnBAfSMywVsBv7qBt2nKXeFL82Tcg',
            }}
            defaultCenter={[defaultLat, defaultLon]}
            defaultZoom={9}
            options={{
              styles: [
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                {
                  elementType: 'labels.text.stroke',
                  stylers: [{ color: '#242f3e' }],
                },
                {
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#746855' }],
                },
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#d59563' }],
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#d59563' }],
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{ color: '#263c3f' }],
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#6b9a76' }],
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{ color: '#38414e' }],
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{ color: '#212a37' }],
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#9ca5b3' }],
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{ color: '#746855' }],
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{ color: '#1f2835' }],
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#f3d19c' }],
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{ color: '#2f3948' }],
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#d59563' }],
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{ color: '#17263c' }],
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#515c6d' }],
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{ color: '#17263c' }],
                },
              ],
            }}
          >
            {partnerData.map((location, index) => {
              if (
                checkIfValidlatitudeAndlongitude(
                  `${location.latitude},${location.longitude}`,
                )
              )
                return (
                  <AnyReactComponent
                    lat={location.latitude}
                    lng={location.longitude}
                    text={location.building_name}
                    isSelected={index === buildingIndex}
                    index={index}
                    setBuildingIndex={setBuildingIndex}
                    setDeviceLatestLogData={setDeviceLatestLogData}
                    setBuildingDeviceValue={setBuildingDeviceValue}
                  />
                );
            })}
          </GoogleMapReact>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <div className={styles.buttonTopContainer}>
          <div className={styles.infoInnerContainer}>
            <div>Campus: BALVI</div>
            {/* <div className={styles.bottomInfo}>No. of Buildings Covered:8</div> */}
          </div>

          <div className={`${styles.infoInnerContainer} `}>
            <div>No of Buildings: {partnerData.length}</div>
            {/* <div className={styles.bottomInfo}>No. of Rooms Covered:32</div> */}
          </div>
        </div>

        <div className={styles.buildingContainer}>
          <div className={styles.buildingContainerTitle}>Location</div>
        </div>

        {partnerData && (
          <div className={styles.buildingButtonContainer}>
            {partnerData.map((individualBuildingInfo, i) => {
              if (i === buildingIndex)
                return (
                  <Button
                    className={`${styles.buildingButton} ${i ===
                      buildingIndex && styles.buildingButtonActive}`}
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setDeviceLatestLogData(null);
                      setBuildingDeviceValue(null);
                      setBuildingIndex(i);
                    }}
                  >
                    {individualBuildingInfo.building_name}
                  </Button>
                );
            })}

            {partnerData.map((individualBuildingInfo, i) => {
              if (i !== buildingIndex)
                return (
                  <Button
                    className={`${styles.buildingButton} ${i ===
                      buildingIndex && styles.buildingButtonActive}`}
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setDeviceLatestLogData(null);
                      setBuildingDeviceValue(null);
                      setBuildingIndex(i);
                    }}
                  >
                    {individualBuildingInfo.building_name}
                  </Button>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaSelection;
