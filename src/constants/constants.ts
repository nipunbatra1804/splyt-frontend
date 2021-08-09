import { OfficeLocation } from "src/types/types";


export const officeLocations: OfficeLocation[] = [
    {
        id: "london",
        name: "London",
        position:   {latitude: 51.5049375, longitude: -0.0964509}
    }, 
    {
        id: "singapore",
        name: "Singapore",
        position:   {latitude: 1.285194, longitude: 103.8522982}
    }, 
    {
        id: "kualaLumpur",
        name: "Kuala Lumpur",
        position:   {latitude: 3.120659, longitude: 101.6746269}
    },
    {
        id: "tokyo",
        name: "Tokyo",
        position:   {latitude: 35.6582729, longitude: 139.753554}
    }
];

export const defaultNumberOfTaxis = 25;

export const officeButtonArray = officeLocations.map(elem => { 
    return {id: elem.id, text: elem.name};
});
officeButtonArray.push({id: "goToNearest", text: "Go To Nearest"});