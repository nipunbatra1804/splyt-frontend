import React, { ReactElement } from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export default function Header (): ReactElement {
    return (
        <HeaderWrapper>
            <h1> Splyt Challenge </h1>
        </HeaderWrapper>
    );
}
