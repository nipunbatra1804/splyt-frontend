import React, { Children, useState, useEffect } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Position } from "src/types/types";
import { Map as LeafletMap } from "leaflet";

const MapWrapper = styled(MapContainer)`
    width: 100%;
    height: 100%;
`;

const MapComponent = styled.div`
    width: 80vw;
    height: 50vh;
    min-width: 640px;
    min-height: 480px;
    margin-left: auto;
    margin-right: auto;
`;

export type MapProps = {
  center : Position,
  children?: JSX.Element[]
}


function Map (props: MapProps):JSX.Element {
    const [map, setMap] = useState<LeafletMap>();
    const {latitude, longitude} = props.center;

    useEffect(() => {
        map?.flyTo([latitude,longitude]);
    }, [latitude, longitude]);

    return (
        <MapComponent>
            <MapWrapper center={[latitude, longitude]} zoom={13} scrollWheelZoom={true} whenCreated={setMap}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.children}
            </MapWrapper>
        </MapComponent>
    );
}

export default Map;