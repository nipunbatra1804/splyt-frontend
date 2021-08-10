import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DriverMarkerGroup from "src/components/DriverMarkerGroup";
import * as StoreContext from "src/store/store";
import { State } from "src/store/reducer";
import { Driver, Position } from "src/types/types";

const mockUserContext = (inputState: State) => {
    jest.spyOn(StoreContext, "useStoreContext").mockImplementation(() => ({
        state: inputState,
        dispatch: jest.fn()
    }));
};

jest.mock("src/components/DriverMarker", () => {
    return function DummyMarker(props: any) {
        return (<div data-testid="driver-marker">{props.position}</div>);
    };
});

describe("DriverMarkerGroup", () => {
    const mockCenter: Position = {
        latitude: 0,
        longitude: 0
    };
    const mockInputNoTaxis = 42;
    const mockDrivers: Driver[] = [{
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
    const mockInitialState: State = { drivers:mockDrivers, mapCentre: mockCenter, noOfTaxis: mockInputNoTaxis, error: false };

    it("should render DriverMarkerGroup", () => {
        mockUserContext(mockInitialState);

        render(<DriverMarkerGroup />);

        expect(screen.getAllByTestId("driver-marker")).toHaveLength(2);

    });
});


