
import React, { ReactElement } from "react";
import { officeLocations } from "src/constants/constants";
import {Marker, Popup} from "react-leaflet";


function OfficeMarkerLocations(): ReactElement {
    return (<> 
        {officeLocations.map((ofc) => (
            <Marker key={ofc.id} position={[ofc.position.latitude, ofc.position.longitude]} data-testId="office-location" >
                <Popup>
                    Splyt HQ - {ofc.name}
                </Popup>
            </Marker>
        ))}
    </>);
}
export default OfficeMarkerLocations;
