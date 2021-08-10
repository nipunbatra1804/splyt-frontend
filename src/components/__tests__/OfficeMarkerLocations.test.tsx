import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OfficeMarkerLocations from "src/components/OfficeMarkerLocations";
import * as constants from "src/constants/constants";

jest.mock("react-leaflet", () => ({
    ...jest.requireActual("react-leaflet"),
    Marker: function DummyMarker(props: any) {
        return (<div data-testid="driver-marker">{props.position}</div>);
    }
}));

describe("OfficeMarkerLocations", () => {
    it("should render only the london office", () => {
        constants.officeLocations = [{
            id: "london",
            name: "London",
            position:   {latitude: 51.5049375, longitude: -0.0964509}
        }];

        render(<OfficeMarkerLocations />);

        expect(screen.getAllByTestId("driver-marker")).toHaveLength(1);

    });
});


