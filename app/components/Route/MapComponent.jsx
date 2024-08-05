import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PrimeIcons } from 'primereact/api';

const createCustomIcon = (iconClass) => {
    return new L.DivIcon({
        html: `<i class="${iconClass}" style="font-size: 24px; color: red;"></i>`,
        iconSize: [24, 24],
        className: 'custom-leaflet-icon'
    });
};

const MapComponent = ({ waypoints }) => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const coords = waypoints
            .filter(waypoint => waypoint && waypoint.lat !== undefined && waypoint.lon !== undefined)
            .map(waypoint => [waypoint.lat, waypoint.lon]);

        setPositions(coords);
    }, [waypoints]);

    return (
        <div id="map-container" style={{ height: "600px", width: "100%" }}>
            <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {positions.map((position, index) => (
                    <Marker key={index} position={position} icon={createCustomIcon(PrimeIcons.MAP_MARKER)} />
                ))}
                {positions.length > 1 && (
                    <Polyline positions={positions} color="blue" />
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
