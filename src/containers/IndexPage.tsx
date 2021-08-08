
import React, { useEffect, useState } from "react";
import Map from "src/components/Map";
import Slider from "src/components/Slider";
import DriverMarker from "src/components/DriverMarker";
import styled from "styled-components";
import {getDrivers} from "src/api/api";
import { Driver, OfficeLocation, Position } from "src/types/types";
import Header from "src/components/Header";
import { usePosition } from "src/hooks/usePosition";
import { getClosestOrDefaultOffice } from "src/utils/utils";
import { Marker, Popup } from "react-leaflet";
import { officeLocations, defaultNumberOfTaxis } from "src/constants/constants";
import ButtonGroup from "src/components/ButtonGroup";


const Styles = styled.div`
  .App {
    display: flex;
    justify-content: center;
  }
  .wrapper {
    margin-top: 10vh;
    width: 50%;
  }
`;

const defaultPosition = getClosestOrDefaultOffice(null).position;
const officeButtonArray = officeLocations.map(elem => { 
    return {id: elem.id, text: elem.name};
});

function IndexPage(): JSX.Element {
    const [numberOfTaxis, setNumberOfTaxis] = useState(defaultNumberOfTaxis);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [center, setCenter] = useState<Position>(defaultPosition);
    const {position} = usePosition();

    const handleSliderChanges = (value:number) => {
        setNumberOfTaxis(value);
    };

    const handleOfficeSelection = (officeId: string) => {
        const office = officeLocations.find(elem => elem.id === officeId);
        if(office) setCenter(office?.position);
    };

    const getDriversFromBFF = async (numberOfTaxis: number, position: Position) => {
        const drivers = await getDrivers(position,numberOfTaxis); 
        setDrivers(drivers);
    };

    useEffect(() => {
        getDriversFromBFF(numberOfTaxis, center);
    }, [numberOfTaxis, center]);


    useEffect(() => {
        const interval = setInterval(() => {
            getDriversFromBFF(numberOfTaxis, center);
        }, 1000);
        return () => clearInterval(interval);
    }, [numberOfTaxis, center]);

    useEffect(() => {
        const office = getClosestOrDefaultOffice(position);
        setCenter(office.position);
    }, [position]);

    const renderDriverMarkers = (drivers: Driver[]): JSX.Element => {
        return (<>
            {drivers.map((elem) => <DriverMarker position={[elem.location.latitude,elem.location.longitude]} key={elem.driver_id}/>)}
        </>);
    };

    const renderOfficeLocations = (offices: OfficeLocation[]): JSX.Element => {
        return (<> 
            {offices.map((ofc) => (
                <Marker key={ofc.id} position={[ofc.position.latitude, ofc.position.longitude]} >
                    <Popup>
                        Splyt HQ - {ofc.name}
                    </Popup>
                </Marker>
            ))}
        </>);
    };

    return (
        <Styles>
            <Header/>
            <Map center={center}>
                {renderDriverMarkers(drivers)}
                {renderOfficeLocations(officeLocations)}
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
