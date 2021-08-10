
import React from "react";
import * as StoreContext from "src/store/store";
import { State } from "src/store/types";
import IndexPage from "src/containers/IndexPage";
import { render, screen } from "@testing-library/react";

const mockStoreContext = (inputState: State) => {
    jest.spyOn(StoreContext, "useStoreContext").mockImplementation(() => ({
        state: inputState,
        dispatch: jest.fn()
    }));
};

jest.mock("src/components/DriverMarkerGroup", () => {
    return function DummyMarker(props: any) {
        return (<div data-testid="driver-markers">Driver Markers</div>);
    };
});
jest.mock("src/components/OfficeMarkerLocations", () => {
    return function DummyLocations(props: any) {
        return (<div data-testid="office-markers">Office Markers</div>);
    };
});

jest.mock("src/components/Map", () => {
    return function DummyMarker(props: any) {
        return (<div data-testid="map">{props.children}</div>);
    };
});


describe("Name of the group", () => {
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

    afterAll(() => {
        jest.resetAllMocks();
    });

    it("should render IndexPage with all sub components", () => {
        mockStoreContext(mockInitialState);

        render(<IndexPage />);

        expect(screen.queryByTestId("driver-markers")).toBeInTheDocument();
        expect(screen.queryByTestId("office-markers")).toBeInTheDocument();
        expect(screen.queryByTestId("map")).toBeInTheDocument();
        expect(screen.queryByTestId("slider")).toBeInTheDocument();  
    });

    it("should render Error Banner when loading has failed", () => {
        const stateWithError = {
            ...mockInitialState,
            drivers: [],
            error:true
        };
        mockStoreContext(stateWithError);

        render(<IndexPage />);

        expect(screen.queryByTestId("error-banner")).toBeInTheDocument();
    
    });
});