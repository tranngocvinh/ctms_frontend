import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Polyline, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {PrimeIcons} from 'primereact/api';

const createCustomIcon = (iconClass) => {
    return new L.DivIcon({
        html: `<i class="${iconClass}" style="font-size: 24px; color: red;"></i>`,
        iconSize: [24, 24],
        className: 'custom-leaflet-icon'
    });
};

const MapComponent = ({ waypoints, routeSegments }) => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        console.log("Waypoints Updated:", waypoints);
        const coords = waypoints
            .filter(waypoint => waypoint && waypoint.lat !== undefined && waypoint.lon !== undefined)
            .map(waypoint => [waypoint.lat, waypoint.lon]);

        setPositions(coords);
    }, [waypoints]);

    useEffect(() => {
        console.log("Route Segments in MapComponent:", routeSegments);
    }, [routeSegments]);

    return (
        <div id="map-container" style={{ height: "600px", width: "100%" }}>
            <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {positions.map((position, index) => (
                    <Marker key={index} position={position} icon={createCustomIcon(PrimeIcons.MAP_MARKER)} />
                ))}
                {routeSegments.map((segment, index) => (
                    <Polyline key={index} positions={segment} color="blue" />
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
