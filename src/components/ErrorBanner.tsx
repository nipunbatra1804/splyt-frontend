import React, { ReactElement } from "react";
import styled from "styled-components";

const ErrorBannerWrapper = styled.div`
    padding: 20px;
    background-color: #f44336; /* Red */
    color: white;
    margin-bottom: 15px;
`;


function ErrorBanner(): ReactElement {
    return (
        <ErrorBannerWrapper data-testid="error-banner">
            Something Went Wrong When Trying to Fetch Taxis in the Area
        </ErrorBannerWrapper>
    );
}

export default ErrorBanner;
