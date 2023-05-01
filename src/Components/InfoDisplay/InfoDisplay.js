import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import styles from './styles.module.css';
import BigInfoComponent from '../BigInfoComponent/BigInfoComponent';
import SmallInfoComponent from '../SmallInfoComponent/SmallInfoComponent';
import LineChartComponent from '../../UI/Graphs/LineChart/LineChart';
import {
  getBuildingList,
  getco2IndoorIncidentValue,
  getco2IndoorValue,
  getco2OutdoorValue,
  getLatestLogUpdateTime,
  getMapData,
  getNeighbourCity,
  getParameterBackgroundColor,
  getParameterText,
  getPm10IndoorIncidentValue,
  getPm10IndoorValue,
  getPm10OutdoorValue,
  getPm25IndoorIncidentValue,
  getPm25IndoorValue,
  getPm25OutdoorValue,
} from '../../UtilityFunctions/Utils';
import DeviceLatestLogDataContext from '../../Contexts/DeviceLatestLogDataContext';
import BuildingDeviceListDataContext from '../../Contexts/BuildingDeviceListDataContext';
import DeviceLatestPastLogDataContext from '../../Contexts/DeviceLatestPastLogDataContext';

const InfoDisplay = ({ buildingDeviceValue, setBuildingDeviceValue }) => {
  const { buildingDeviceListData } = useContext(BuildingDeviceListDataContext);
  const { deviceLatestLogData } = useContext(DeviceLatestLogDataContext);
  const { deviceLatestPastLogData } = useContext(
    DeviceLatestPastLogDataContext,
  );

  const [compareChecked, setCompareChecked] = useState(true);

  const labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const data = {
    labels,
    datasets: [
      {
        label: 'PM2.5',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#4171C5',
        tension: 0.1,
      },
      {
        label: 'PM2.5',
        data: [5, 9, 8, 1, 6, 5, 4],
        fill: false,
        borderColor: '#9DAFCD',
        tension: 0.1,
      },
    ],
  };

  const useStyles = makeStyles(theme => ({
    textfield_input: {
      color: `#F7F5E0 !important`,
      fontFamily: 'poppin-Medium',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (
      buildingDeviceListData &&
      !buildingDeviceValue &&
      buildingDeviceListData[0]
    ) {
      setBuildingDeviceValue(buildingDeviceListData[0].device_id);
    }
  }, [buildingDeviceListData]);

  const handleBuildingChange = event => {
    const { value } = event.target;

    setBuildingDeviceValue(value);
  };

  return (
    <div className={styles.mainOuterContainer}>
      <div className={styles.outerContainer}>
        <TextField
          className={styles.dropDownButton}
          select
          size="small"
          value={buildingDeviceValue}
          inputProps={{ className: classes.textfield_input }}
          onChange={handleBuildingChange}
        >
          {getBuildingList(buildingDeviceListData).map(buildingInfo => {
            return (
              <MenuItem
                value={buildingInfo.value}
                className={styles.dropDownButtonInfo}
                style={{ color: '#F7F5E0' }}
              >
                {buildingInfo.label}
              </MenuItem>
            );
          })}
        </TextField>

        <div className={styles.statsInfoContainer}>
          <div className={styles.bigInfoCardsContainer}>
            <BigInfoComponent
              heading="PM2.5"
              value={getPm25IndoorValue(
                deviceLatestLogData,
                buildingDeviceListData,
              )}
              condition={getParameterText(
                getPm25IndoorIncidentValue(
                  deviceLatestLogData,
                  buildingDeviceListData,
                ),
              )}
              backgroundColor={getParameterBackgroundColor(
                getPm25IndoorIncidentValue(
                  deviceLatestLogData,
                  buildingDeviceListData,
                ),
              )}
            />
            <BigInfoComponent
              heading="PM10"
              value={getPm10IndoorValue(
                deviceLatestLogData,
                buildingDeviceListData,
              )}
              condition={getParameterText(
                getPm10IndoorIncidentValue(
                  deviceLatestLogData,
                  buildingDeviceListData,
                ),
              )}
              backgroundColor={getParameterBackgroundColor(
                getPm10IndoorIncidentValue(
                  deviceLatestLogData,
                  buildingDeviceListData,
                ),
              )}
            />
            <BigInfoComponent
              heading="CO2"
              value={getco2IndoorValue(
                deviceLatestLogData,
                buildingDeviceListData,
              )}
              condition={getParameterText(
                getco2IndoorIncidentValue(
                  deviceLatestLogData,
                  buildingDeviceListData,
                ),
              )}
              backgroundColor={getParameterBackgroundColor(
                getco2IndoorIncidentValue(
                  deviceLatestLogData,
                  buildingDeviceListData,
                ),
              )}
            />

            <div className={styles.lastUpdatedInfo}>
              last updated:{' '}
              {getLatestLogUpdateTime(
                deviceLatestLogData,
                buildingDeviceListData,
              )}
            </div>
          </div>

          <div className={styles.smallInfoCardsContainer}>
            <div className={styles.smallInfoCardsMainContainer}>
              <div className={styles.smallInfoCardsContainerHeading}>
                indoor vs outdoor air
              </div>
              <div className={styles.smallInfoCardsInnerContainer}>
                <SmallInfoComponent
                  heading="PM2.5"
                  indoorValue={getPm25IndoorValue(
                    deviceLatestLogData,
                    buildingDeviceListData,
                  )}
                  outdoorValue={getPm25OutdoorValue(
                    deviceLatestLogData,
                    buildingDeviceListData,
                  )}
                />
                <SmallInfoComponent
                  heading="PM10"
                  indoorValue={getPm10IndoorValue(
                    deviceLatestLogData,
                    buildingDeviceListData,
                  )}
                  outdoorValue={getPm10OutdoorValue(
                    deviceLatestLogData,
                    buildingDeviceListData,
                  )}
                />
                <SmallInfoComponent
                  heading="CO2"
                  indoorValue={getco2IndoorValue(
                    deviceLatestLogData,
                    buildingDeviceListData,
                  )}
                  outdoorValue={getco2OutdoorValue(
                    deviceLatestLogData,
                    buildingDeviceListData,
                  )}
                />
              </div>
            </div>

            <div className={styles.graphContainer}>
              <div className={styles.graphTopContainer}>
                <div className={styles.graphTopLeftContainer}>
                  <div className={styles.graphTopLeftTitle}>
                    PM2.5 - lAST 7 DAYS
                  </div>
                  <div className={styles.graphTopLeftCheckbox}>
                    <form className={styles.graphTopLeftCheckbox}>
                      <input
                        type="checkbox"
                        checked={compareChecked}
                        onChange={() => setCompareChecked(!compareChecked)}
                      />
                      <label htmlFor="vehicle1">Compare to outdoors</label>
                    </form>
                  </div>
                </div>

                <div className={styles.graphTopLeftContainer}>
                  <div className={styles.graphColorCodeContainer}>
                    <div className={styles.graphColorCodeIndicator} />
                    <div className={styles.graphColorCodeIndicatorText}>
                      indoor
                    </div>
                  </div>

                  <div className={styles.graphColorCodeContainer}>
                    <div
                      className={`${styles.graphColorCodeIndicator} ${styles.outdoorIndicator}`}
                    />
                    <div
                      className={`${styles.graphColorCodeIndicatorText} ${styles.graphTopPadding}`}
                    >
                      outdoor
                    </div>
                  </div>
                </div>
              </div>
              <LineChartComponent
                chartData={getMapData(deviceLatestPastLogData, compareChecked,buildingDeviceListData)}
              />
            </div>
          </div>
        </div>

        <div />
      </div>

      <div className={styles.neighborhoodStatsContainer}>
        <div className={styles.neighborhoodStatsContainerHeading}>
          {' '}
          neighborhood AQI
        </div>
        <div className={styles.neighborhoodInfoContainer}>
          {getNeighbourCity(deviceLatestLogData, buildingDeviceListData).map(
            info => {
              console.log('cityyyyy', info);
              return (
                <div className={styles.neighborhoodInnerInfoContainer}>
                  <div className={styles.neighborhoodInnerInfoHeading}>
                    {' '}
                    {info.city}{' '}
                  </div>

                  <div className={styles.neighborhoodInnerInfoValue}>
                    {' '}
                    {info.aqi.value}{' '}
                  </div>
                  <div className={styles.neighborhoodInnerInfoCondition} > {getParameterText(info.aqi.incident_level)} </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;
