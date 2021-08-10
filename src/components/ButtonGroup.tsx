import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
    min-width: 200px;
    height: 50px;
    letter-spacing: 0.5px;
    background-color: #FFFFFF;
    color: #E0314B;
    font-size: 32px;
    border: 1.5px solid #E0314B;
    border-radius: 5px;
    cursor: pointer;

    &.active {
        background-color: #E0314B;
        border: 1.5px solid rgb(25, 26, 24);
        color: #FFFFFF;
    } 
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;




export type ButtonGroupProps = {
    values: {id:string, text:string}[],
    handleClick: (id:string) => void
}

const ButtonGroup = (props: ButtonGroupProps ): JSX.Element => {
    const [clickedId, setClickedId] = useState("");
    const {values, handleClick} = props;

    const handleButtonClick = (id:string) => {
        setClickedId(id);
        handleClick(id);
    };

    return (
        <ButtonWrapper>
            {values.map((elem) => (
                <Button
                    key={elem.id}
                    name={elem.text}
                    onClick={() => handleButtonClick(elem.id)}
                    className={elem.id === clickedId ? "active" : ""}
                    data-testid="button-group-btn"
                >
                    {elem.text}
                </Button>
            ))}
        </ButtonWrapper>
    );
};

export default ButtonGroup;