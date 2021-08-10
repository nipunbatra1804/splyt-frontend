import React, {useContext} from "react";
import { getDrivers } from "src/api/api";
import { Driver, Position } from "src/types/types";
import { Action, State } from "src/store/types";
import { getClosestOrDefaultOffice } from "src/utils/utils";
import { defaultNumberOfTaxis } from "src/constants/constants";



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

export const fetchDriversSuccessAction = (drivers: Driver[]):Action => {
    return {
        type: "FETCH_DRIVERS_SUCCESS",
        payload : { drivers: [...drivers]}
    };
};

export const fetchDriversFailureAction = ():Action => {
    return {
        type: "FETCH_DRIVERS_FAILURE"
    };
};

export const updateMapCenterAction = (centre: Position):Action => {
    return {
        type: "UPDATE_MAP_CENTRE",
        payload : { mapCentre: centre} 
    };
};

export const updateNumberOfTaxisAction = (noOfTaxis: number):Action => {
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
    dispatch(updateMapCenterAction(position));
    fetchDrivers(dispatch,position,count);
};

export const fetchDrivers = async (dispatch: React.Dispatch<Action>, position:Position, count:number):Promise<void> => {
    try {
        const drivers = await getDrivers(position, count);
        dispatch(fetchDriversSuccessAction(drivers));
    } catch(ex) {
        dispatch(fetchDriversFailureAction());
    }
};
