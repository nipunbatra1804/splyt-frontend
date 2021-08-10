import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "src/components/Slider";

describe("Slider", () => {

    it("should render Slider with default value", () => {
        render(<Slider color= "" defaultValue={25} handleChange={jest.fn()}></Slider>);

        expect(screen.queryByTestId("slider")).toBeInTheDocument();
        expect(screen.queryByText("25")).toBeInTheDocument();
    });

    it("should select a update value when slider is moved", () => {
        const mockHandler = jest.fn();

        render(<Slider color= "" defaultValue={25} handleChange={mockHandler}></Slider>);
        fireEvent.change(screen.getByTestId("slider"), { target: { value: 42 } });

        expect(screen.queryByText("42")).toBeInTheDocument();
    });

    it("should invoke handler with id when button is clicked", () => {
        const mockHandler = jest.fn();

        render(<Slider color= "" defaultValue={25} handleChange={mockHandler}></Slider>);
        fireEvent.change(screen.getByTestId("slider"), { target: { value: 42 } });

        expect(mockHandler).toBeCalledWith(42);
    });
    
});