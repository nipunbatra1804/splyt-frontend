import React from "react";
import { Marker } from "react-leaflet";
import { Icon, Point } from "leaflet";
import taxiPng from "src/assets/img/taxi.svg";

type DriverMarkerProps = {
    position:[number,number]
}

const taxiIcon = new Icon({
    iconUrl: taxiPng,
    iconRetinaUrl: taxiPng,
    iconSize: new Point(32, 32),
    className: "leaflet-div-icon"
});


function DriverMarker (props: DriverMarkerProps):JSX.Element {

    return (
        <Marker position={props.position} icon={taxiIcon} >
        </Marker>
    );
    
}

export default DriverMarker;