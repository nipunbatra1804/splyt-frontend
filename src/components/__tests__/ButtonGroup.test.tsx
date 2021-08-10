import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonGroup from "src/components/ButtonGroup";

describe("ButtonGroup", () => {

    it("should render as many buttons as input array", () => {
        const mockOfficeButtonArray = [
            {id: "mkId1", text: "mk Id 1"}, 
            {id: "mkId2", text: "mk Id 2"}, 
        ];

        render(<ButtonGroup values={mockOfficeButtonArray} handleClick={jest.fn()}></ButtonGroup>);

        expect(screen.queryAllByTestId("button-group-btn")).toHaveLength(2);
    });

    it("should select a button when clicked", () => {
        const mockOfficeButtonArray = [
            {id: "mkId1", text: "mk Id 1"}, 
            {id: "mkId2", text: "mk Id 2"}, 
        ];
        const mockHandler = jest.fn();

        render(<ButtonGroup values={mockOfficeButtonArray} handleClick={mockHandler}></ButtonGroup>);
        const button = screen.getByText("mk Id 2");
        fireEvent.click(button);

        expect(button).toHaveClass("active");
    });

    it("should invoke handler with id when button is clicked", () => {
        const mockOfficeButtonArray = [
            {id: "mkId1", text: "mk Id 1"}, 
            {id: "mkId2", text: "mk Id 2"}, 
        ];
        const mockHandler = jest.fn();

        render(<ButtonGroup values={mockOfficeButtonArray} handleClick={mockHandler}></ButtonGroup>);
        const button = screen.getByText("mk Id 2");
        fireEvent.click(button);

        expect(mockHandler).toBeCalledWith("mkId2");
    });
    
});