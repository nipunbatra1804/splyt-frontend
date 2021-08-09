import React from "react";
import IndexPage from "./containers/IndexPage";
// import { Provider } from "src/store/reducer";
import { Provider } from "src/store/store";

function App(): JSX.Element {
    return (
        <Provider>
            <IndexPage/>
        </Provider>
    );
}

export default App;
