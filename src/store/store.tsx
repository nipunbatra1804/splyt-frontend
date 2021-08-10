import React, { Dispatch, Reducer } from "react";
import { reducer, State, Action, initialState } from "src/store/reducer";


// const initalContextValues: {state:State, setDrivers: (drivers:any[]) => void} = {
const initalContextValues: {state:State, dispatch: Dispatch<Action> } = {
    state: initialState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: () => {}
};
const CustomContext = React.createContext(initalContextValues);

const Provider: React.FC = (props: any) => {
    const [state,dispatch] = React.useReducer(reducer, initialState);

    return (
        <CustomContext.Provider value={{state, dispatch}}>
            {props.children}
        </CustomContext.Provider>
    );
};

const useStoreContext = () => React.useContext(CustomContext);

export { CustomContext, Provider, useStoreContext }; 