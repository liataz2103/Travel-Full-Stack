let platform = new H.service.Platform({
    'apikey': 'E6xTQtuJ21WBOceTJ3ET'
  });


  // Obtain the default map types from the platform object:
let defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: { lat: 51.500910,  lng: -0.124658 }
    });