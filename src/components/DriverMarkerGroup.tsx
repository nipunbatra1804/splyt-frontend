import React from "react";
import { useStoreContext } from "src/store/store";
import { Driver } from "src/types/types";
import  DriverMarker from "src/components/DriverMarker";

const DriverMarkerGroup = () : JSX.Element => {
    const {state} = useStoreContext();
    const {drivers} = state;
    return (<>
        {drivers.map((elem:Driver) => <DriverMarker position={[elem.location.latitude,elem.location.longitude]} key={elem.driver_id}/>)}
    </>);
};

export default DriverMarkerGroup;