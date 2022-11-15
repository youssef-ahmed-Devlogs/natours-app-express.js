export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieW91c3NlZjI3IiwiYSI6ImNsYWd1dTAyYzA1ZWMzcG1xeDg5NzdieWEifQ.gEB7xKqw0pt7VNodaMd2wQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/youssef27/clagv26ix000415mk11rwn523',
    // center: [-118.113491, 32.11175],
    // zoom: 2,
    // interactive: false,
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
