const options = {
    // Required: API key
    key: '3bGDy2SHmChWGQe6ZxoplvzIaAwTC3aO', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 50.27,
    lon: 30.31,
    zoom: 3,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { overlays, picker, broadcast } = windyAPI
    // .map is instance of Leaflet map

    L.popup()
        .setLatLng([50.4, 14.3])

    // Metric for wind was changed to m/s
    overlays.wind.setMetric('m/s')

    // Wait since wather is rendered
    broadcast.once('redrawFinished', () => {
        picker.open({ lat: 50.27, lon: 30.31 });
        // Opening of a picker (async)
    });
});