import axios from "axios";
import { Driver, Position } from "src/types/types";

const bffApi = axios.create({
    baseURL: "http://localhost:8080"
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