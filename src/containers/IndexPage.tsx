
import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import Map from "src/components/Map";
import Slider from "src/components/Slider";
import Header from "src/components/Header";
import ButtonGroup from "src/components/ButtonGroup";
import ErrorBanner from "src/components/ErrorBanner";
import DriverMarkerGroup from "src/components/DriverMarkerGroup";
import OfficeMarkerLocations from "src/components/OfficeMarkerLocations";

import { usePosition } from "src/hooks/usePosition";
import { getClosestOrDefaultOffice } from "src/utils/utils";
import { officeLocations, defaultNumberOfTaxis, officeButtonArray } from "src/constants/constants";
import { fetchDrivers, updateMapCenter, updateNumberOfTaxis } from "src/store/reducer";
import { CustomContext } from "src/store/store";
import { useInterval } from "src/hooks/useInterval";


const Styles = styled.div`
  .App {
    display: flex;
    justify-content: center;
  }
  .wrapper {
    margin-top: 10vh;
    width: 60%;
  }
`;

function IndexPage(): JSX.Element {
    const {position} = usePosition();    
    const { state , dispatch } = useContext(CustomContext);
    const { mapCentre, noOfTaxis, error } = state;

    useInterval(() => {
        fetchDrivers(dispatch,mapCentre,noOfTaxis);
    }, 5000);

    useEffect(() => {
        const office = getClosestOrDefaultOffice(position);
        updateMapCenter(dispatch, office.position, noOfTaxis);
    }, [position]);


    const handleSliderChanges = (value:number) => {
        updateNumberOfTaxis(dispatch, mapCentre, value);
    };

    const handleOfficeSelection = (officeId: string) => {
        if(officeId === "goToNearest" ) {
            const office = getClosestOrDefaultOffice(position);
            updateMapCenter(dispatch, office.position, noOfTaxis);
            return;
        }
        const office = officeLocations.find(elem => elem.id === officeId);
        if(office) updateMapCenter(dispatch, office.position,noOfTaxis);
    };

    return (
        <Styles>
            <Header/>
            {error && (<ErrorBanner/>)}
            <Map center={mapCentre}>
                <DriverMarkerGroup/>
                <OfficeMarkerLocations/>
            </Map>
            <div className="App">
                <div className="wrapper">
                    <ButtonGroup values={officeButtonArray} handleClick={handleOfficeSelection}/>
                    <Slider color="#0074D9" handleChange={handleSliderChanges} defaultValue={defaultNumberOfTaxis} />
                </div>
            </div>
        </Styles>
    );
}

export default IndexPage;
