
Remeber to add in the bff api and add it to the `.env` file as shown below:
```
REACT_APP_BFF_API_URL="http://localhost:8080"
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## More Info

The project uses react-leaflet to render an interactive map. Primary reasons for using react-leaflet are that it is free and  very versatile. Being very lightweight, it is not as feature packed as react-google-maps

Additionally, it uses styled components and hooks to get most of the fucntioality out. The repo is organised in an atomic/molecular design patter to make it easier to make changes. 