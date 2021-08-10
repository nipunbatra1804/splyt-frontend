import {fetchDriversSuccessAction, fetchDriversFailureAction, updateMapCenterAction, updateNumberOfTaxisAction, reducer, fetchDrivers, State, updateMapCenter, updateNumberOfTaxis} from "src/store/reducer";
import { Driver, Position } from "src/types/types";
import * as api from "src/api/api";


describe("reducer", () => {
    const mockCenter: Position = {
        latitude: 0,
        longitude: 0
    };
    const mockDrivers:Driver[] = [{
        driver_id: "mock_id", 
        location: {
            latitude: 0,
            longitude: 0,
            bearing: 0
        }
    }];
    const mockInputNoTaxis = 42;
    const mockInitialState: State = { drivers:mockDrivers, mapCentre: mockCenter, noOfTaxis: mockInputNoTaxis, error: false };
    const mockFetchedDrivers: Driver[] = [{
        driver_id: "new_mock_1", 
        location: {
            latitude: 1,
            longitude: 1,
            bearing: 1
        }
    }, {
        driver_id: "new_mock_2", 
        location: {
            latitude: 1,
            longitude: 1,
            bearing: 1
        }
    }];
    
    describe("reducer actions", () => {
        it("fetchDriversSuccessAction should return correct type and payload", () => {
            const action = fetchDriversSuccessAction(mockFetchedDrivers);
            const state = reducer(mockInitialState,action);

            expect(state.drivers).toEqual(mockFetchedDrivers);
            expect(state.error).toBe(false);
        });

        it("fetchDriversSuccessAction should return correct type and payload", () => {

            const action = fetchDriversFailureAction();

            const state = reducer(mockInitialState,action);

            expect(state.drivers).toEqual([]);
            expect(state.error).toBe(true);
    
        });

        it("updateMapCenterAction should return correct type and payload", () => {
            const mockUpdatedCenter: Position = {
                latitude: 101,
                longitude: 10
            };
            const action = updateMapCenterAction(mockUpdatedCenter);

            const state = reducer(mockInitialState,action);

            expect(state.mapCentre).toEqual(mockUpdatedCenter);
        });

        it("updateMapCenterAction should return correct type and payload", () => {
            const mockInputNoTaxis = 12;
            const action = updateNumberOfTaxisAction(mockInputNoTaxis);

            const state = reducer(mockInitialState,action);

            expect(state.noOfTaxis).toEqual(mockInputNoTaxis);
        });
    });

    describe("reducer state", () => {    
        it("should update the drivers from api", async () => {
            jest.spyOn(api, "getDrivers").mockResolvedValue(mockFetchedDrivers);
            const dispatch = jest.fn();

            await fetchDrivers(dispatch,mockInitialState.mapCentre, mockInitialState.noOfTaxis);
    
            expect(dispatch).toBeCalledWith(fetchDriversSuccessAction(mockFetchedDrivers));
        });

        it("should invoke failed action when the call from api fails", async () => {
            jest.spyOn(api, "getDrivers").mockRejectedValueOnce([]);
            const dispatch = jest.fn();

            await fetchDrivers(dispatch,mockInitialState.mapCentre, mockInitialState.noOfTaxis);
    
            expect(dispatch).toBeCalledWith(fetchDriversFailureAction());
        });

        it("should update map center and the drivers from api",  () => {
            jest.spyOn(api, "getDrivers").mockResolvedValue(mockFetchedDrivers);
            const dispatch = jest.fn();
            const newPosition = {
                latitude: 22,
                longitude: 22
            };

            updateMapCenter(dispatch,newPosition, mockInitialState.noOfTaxis);
    
            expect(dispatch).toBeCalledWith(updateMapCenterAction(newPosition));
            // expect(dispatch).toBeCalledWith(fetchDriversSuccessAction(mockFetchedDrivers));
        
        });

        it("should update the number of taxis and the drivers from api", async () => {
            const mockInputNoTaxis = 23;
            const dispatch = jest.fn();
            updateNumberOfTaxis(dispatch,mockInitialState.mapCentre, mockInputNoTaxis);
    
            expect(dispatch).toBeCalledWith(updateNumberOfTaxisAction(mockInputNoTaxis));
        });
    });
});