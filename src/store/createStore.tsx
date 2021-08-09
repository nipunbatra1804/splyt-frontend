import React, { Dispatch, Reducer } from "react";
import { Driver } from "src/types/types";

const initialState: {drivers:Driver[], setDrivers: (drivers:any[]) => void} = {
    drivers:[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setDrivers: () =>{}
};
const CustomContext = React.createContext(initialState);

const Provider: React.FC = (props: any) => {
    // const store = React.useReducer(reducer, initialState);
    const [drivers,setDrivers] =  React.useState<Driver[]>([]);
    

    return (
        <CustomContext.Provider value={{drivers, setDrivers}}>
            {props.children}
        </CustomContext.Provider>
    );
};

export { CustomContext, Provider }; 