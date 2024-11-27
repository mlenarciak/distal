// Mapbox configuration
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
export const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v12';

// Map default settings
export const DEFAULT_CENTER = {
  longitude: -98.5795,  // Center of US
  latitude: 39.8283
};

export const DEFAULT_ZOOM = 3;

// Map style configuration
export const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: 400,
  style: {
    position: 'relative' as const
  }
};

// Marker style
export const MARKER_STYLE = {
  color: '#3B82F6',  // blue-600
  size: 24
};