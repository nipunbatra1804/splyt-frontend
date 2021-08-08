import {useState, useEffect} from "react";
import { Position } from "src/types/types";

export const usePosition = () : {position: Position | null, error: string | null}  => {
    const [position, setPosition] = useState<Position | null>(null);
    const [error, setError] = useState<string | null >(null);

    const onChange = (position:GeolocationPosition) => {
        const {coords} = position;
        setPosition({latitude:coords.latitude, longitude: coords.longitude});
    };
    const onError = (error:GeolocationPositionError) => {
        setError(error.message);
    };
    
  
    // callbacks will go here...
    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError("Geolocation is not supported");
            return;
        }
        geo.watchPosition(onChange, onError);
    }, []);

    return {position, error};
};