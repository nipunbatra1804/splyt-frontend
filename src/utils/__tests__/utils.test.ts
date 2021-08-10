// import {officeLocations} from "src/constants/constants";
import { getClosestOrDefaultOffice } from "src/utils/utils";
import * as constants from "src/constants/constants";

describe("utils", () => {

    it("should return closest office location", () => {
        const closestOfice =  getClosestOrDefaultOffice({latitude: 51.5049375, longitude: -0.0964509});

        expect(closestOfice).toEqual({
            id: "london",
            name: "London",
            position:   {latitude: 51.5049375, longitude: -0.0964509}
        });
    });

    it("should return default office location when position is null", () => {
        const closestOfice =  getClosestOrDefaultOffice(null);

        expect(closestOfice).toEqual({
            id: "london",
            name: "London",
            position:   {latitude: 51.5049375, longitude: -0.0964509}
        });
    });
});

