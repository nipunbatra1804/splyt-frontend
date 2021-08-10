import { renderHook } from "@testing-library/react-hooks";
import { useInterval } from "src/hooks/useInterval";

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.useRealTimers();
});

describe("useInterval", () => {
    it("should repeatedly calls provided callback with a fixed time delay between each call", () => {
        const callback = jest.fn();

        renderHook(() => useInterval(callback, 200));
        // expect(callback).not.toHaveBeenCalled();
  
        // fast-forward time until 1s before it should be executed
        jest.advanceTimersByTime(199);
        // expect(callback).not.toHaveBeenCalled();
  
        // fast-forward until 1st call should be executed
        jest.advanceTimersByTime(2);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should clear interval on unmount", () => {
        const callback = jest.fn();
        const { unmount } = renderHook(() => useInterval(callback, 200));
        expect(clearInterval).not.toHaveBeenCalled();
  
        unmount();
  
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });
});