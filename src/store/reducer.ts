import React, {useContext} from "react";
import { getDrivers } from "src/api/api";
import { Driver, Position } from "src/types/types";


export type Action = 
  | { type: "FETCH_DRIVERS_SUCCESS", payload: {drivers: Driver[]} }
  | { type: "clear" };

export type State = {
    drivers: Driver[]
}

export const initialState: State = { drivers:[]};
export const reducer = (state: State, action: Action) : State => {
    switch(action.type) {
    case "FETCH_DRIVERS_SUCCESS": 
        state.drivers = [...action.payload.drivers];
        console.log(state.drivers);
        return state;
    default:
        return state;
    }
};

const fetchDriversSuccess = (drivers: Driver[]):Action => {
    return {
        type: "FETCH_DRIVERS_SUCCESS",
        payload : { drivers: [...drivers]}
    };
};

export const fetchDrivers = async (setDrivers: (drivers:Driver[]) => void, position:Position, count:number):Promise<void> => {
    try {
        const drivers = await getDrivers(position, count);
        setDrivers(drivers);
    } catch(ex) {
        console.log("Something went wrong here");
    }
};
