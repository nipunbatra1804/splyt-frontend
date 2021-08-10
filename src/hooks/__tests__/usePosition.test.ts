import { renderHook } from "@testing-library/react-hooks";
import { usePosition } from "src/hooks/usePosition";
  
describe("usePosition", () => {
    it("should return  poositon when hook is mounted", () => {

        const mockPosition = {
            latitude: 46.378333,
            longitude: 13.836667,
        };
        const mockGeolocation = {
            getCurrentPosition: jest.fn(),
            watchPosition: jest.fn().mockImplementation((success, error) => Promise.resolve(success({
                coords: mockPosition,
            }))),
        };
        global.navigator.geolocation = mockGeolocation;

        const position = renderHook(() => usePosition());
        const result = position.result.current;

        expect(result.position).toEqual(mockPosition);
    });

    it("should return error when user deines location", () => {
        const mockPosition = {
            latitude: 46.378333,
            longitude: 13.836667,
        };
        const mockGeolocation = {
            getCurrentPosition: jest.fn(),
            watchPosition: jest.fn().mockImplementation((success, error) => Promise.resolve(error(new Error("User denied Geolocation")))),
        };
        global.navigator.geolocation = mockGeolocation;

        const position = renderHook(() => usePosition());
        const result = position.result.current;

        expect(result.position).toEqual(null);
        expect(result.error).toEqual("User denied Geolocation");
    });

    it("should return error when geolocation is not supported", () => {
        global.navigator.geolocation = null;
        const position = renderHook(() => usePosition());
        const result = position.result.current;

        expect(result.position).toEqual(null);
        expect(result.error).toEqual("Geolocation is not supported");
    });
});