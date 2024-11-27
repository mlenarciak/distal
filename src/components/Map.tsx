import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { MAPBOX_TOKEN, MAPBOX_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM } from '../config/mapbox';

interface Location {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
}

interface MapViewProps {
  locations: Location[];
  onMarkerClick?: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ locations, onMarkerClick }) => {
  const mapRef = React.useRef<MapRef>(null);
  const [viewState, setViewState] = useState({
    longitude: DEFAULT_CENTER.longitude,
    latitude: DEFAULT_CENTER.latitude,
    zoom: DEFAULT_ZOOM
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (locations.length > 0 && mapLoaded && mapRef.current) {
      const avgLng = locations.reduce((sum, loc) => sum + loc.coordinates.lng, 0) / locations.length;
      const avgLat = locations.reduce((sum, loc) => sum + loc.coordinates.lat, 0) / locations.length;
      setViewState(prev => ({
        ...prev,
        longitude: avgLng,
        latitude: avgLat
      }));
    }
  }, [locations, mapLoaded]);

  if (!MAPBOX_TOKEN) {
    return <div className="h-[400px] bg-gray-100 flex items-center justify-center">Map unavailable</div>;
  }

  return (
    <Map
      ref={mapRef}
      onLoad={() => setMapLoaded(true)}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: 400 }}
      mapStyle={MAPBOX_STYLE}
      mapboxAccessToken={MAPBOX_TOKEN}
      attributionControl={true}
    >
      <NavigationControl position="top-right" />
      
      {locations.map((location) => (
        <Marker
          key={location.id}
          longitude={location.coordinates.lng}
          latitude={location.coordinates.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onMarkerClick?.(location.id);
          }}
        >
          <div className="group relative cursor-pointer">
            <MapPin 
              size={24}
              className="text-blue-600 filter drop-shadow-md transition-transform hover:scale-110" 
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-white rounded shadow-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {location.name}
            </div>
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default MapView;