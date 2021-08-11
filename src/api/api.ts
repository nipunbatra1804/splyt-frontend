import axios from "axios";
import { Driver, Position } from "src/types/types";

const bffApi = axios.create({
    baseURL: process.env.REACT_APP_BFF_API_URL
});


export const getDrivers = async (position: Position, count:number): Promise<Driver[]> => {
    const result = await bffApi.get("/drivers", {
        params: {
            longitude: position.longitude,
            latitude: position.latitude, 
            count: count
        }
    });
    return result.data.drivers;
};