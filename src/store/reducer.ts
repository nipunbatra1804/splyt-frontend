import React, {useContext} from "react";
import { getDrivers } from "src/api/api";
import { Driver, Position } from "src/types/types";
import { getClosestOrDefaultOffice } from "src/utils/utils";
import { defaultNumberOfTaxis } from "src/constants/constants";


export type Action = 
  | { type: "FETCH_DRIVERS_SUCCESS", payload: { drivers: Driver[] } }
  | { type: "FETCH_DRIVERS_FAILURE" }
  | { type: "UPDATE_MAP_CENTRE", payload: { mapCentre: Position } }
  | { type: "UPDATE_NUMBER_TAXIS", payload: { noOfTaxis: number } }
  | { type: "clear" };

export type State = {
    drivers: Driver[],
    mapCentre: Position,
    noOfTaxis: number,
    error: boolean,
}

const defaultPosition = getClosestOrDefaultOffice(null).position;
export const initialState: State = { drivers:[], mapCentre: defaultPosition, noOfTaxis: defaultNumberOfTaxis, error: false };
export const reducer = (state: State, action: Action) : State => {
    switch(action.type) {
    case "FETCH_DRIVERS_SUCCESS": 
        return {...state, drivers: action.payload.drivers, error: false };
    case "FETCH_DRIVERS_FAILURE": 
        return {...state, drivers: [], error: true};
    case "UPDATE_MAP_CENTRE": 
        return {...state, mapCentre: action.payload.mapCentre };
    case "UPDATE_NUMBER_TAXIS": 
        return {...state, noOfTaxis: action.payload.noOfTaxis };
    default:
        state.drivers = [];
        return state;
    }
};

const fetchDriversSuccess = (drivers: Driver[]):Action => {
    return {
        type: "FETCH_DRIVERS_SUCCESS",
        payload : { drivers: [...drivers]}
    };
};

const fetchDriversFailure = ():Action => {
    return {
        type: "FETCH_DRIVERS_FAILURE"
    };
};

const updateMapCenterSuccess = (centre: Position):Action => {
    return {
        type: "UPDATE_MAP_CENTRE",
        payload : { mapCentre: centre} 
    };
};

const updateNumberOfTaxisAction = (noOfTaxis: number):Action => {
    return {
        type: "UPDATE_NUMBER_TAXIS",
        payload : { noOfTaxis: noOfTaxis} 
    };
};

export const updateNumberOfTaxis = (dispatch: React.Dispatch<Action>, position:Position, count:number):void => {
    dispatch(updateNumberOfTaxisAction(count));
    fetchDrivers(dispatch,position,count);
};

export const updateMapCenter = (dispatch: React.Dispatch<Action>, position:Position, count:number):void => {
    dispatch(updateMapCenterSuccess(position));
    fetchDrivers(dispatch,position,count);
};

export const fetchDrivers = async (dispatch: React.Dispatch<Action>, position:Position, count:number):Promise<void> => {
    try {
        const drivers = await getDrivers(position, count);
        dispatch(fetchDriversSuccess(drivers));
    } catch(ex) {
        dispatch(fetchDriversFailure());
    }
};
