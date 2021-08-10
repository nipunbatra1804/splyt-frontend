import { Driver, Position } from "src/types/types";

export type Action = 
  | { type: "FETCH_DRIVERS_SUCCESS", payload: { drivers: Driver[] } }
  | { type: "FETCH_DRIVERS_FAILURE" }
  | { type: "UPDATE_MAP_CENTRE", payload: { mapCentre: Position } }
  | { type: "UPDATE_NUMBER_TAXIS", payload: { noOfTaxis: number } };

export type State = {
    drivers: Driver[],
    mapCentre: Position,
    noOfTaxis: number,
    error: boolean,
}