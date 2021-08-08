
export type Location = {
    latitude: number,
    longitude: number,
    bearing: number
  }
  
export type Driver = {
    driver_id : string,
    location: Location
}

export type Position = {
  latitude: number, 
  longitude: number
}


export type OfficeLocation = {
  id: string, 
  name: string, 
  position: Position
}
