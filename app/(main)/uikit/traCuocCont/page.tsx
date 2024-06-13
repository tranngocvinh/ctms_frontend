'use client'
import React, { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import turf from '@turf/turf'; // Import turf.js

const App = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [distance, setDistance] = useState('');

    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'map',
            zoom: 9,
            center: [105.8542, 21.0285], // Hà Nội
            style: 'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
        });

        // Add directions
        map.on('load', () => {
            map.addLayer({
                id: 'directions',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [105.8542, 21.0285], // Hà Nội
                                [106.6626, 20.8449] // Hải Phòng
                            ]
                        }
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#007cbf',
                    'line-width': 5
                }
            });

            // Calculate distance
            const lineDistance = turf.length({
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [105.8542, 21.0285], // Hà Nội
                        [106.6626, 20.8449] // Hải Phòng
                    ]
                }
            }, { units: 'kilometers' });

            setDistance(`${lineDistance.toFixed(2)} km`);
        });

        return () => {
            map.remove();
        };
    }, []);

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    return (
        <div>
            <div id="map" style={{ height: '100vh', width: '100vw' }}></div>
            {showNotification && (
                <div className="notification">
                    <p>Tuyến đường từ Hà Nội đến Hải Phòng</p>
                    <p>Quãng đường: {distance}</p>
                    <button onClick={handleCloseNotification}>Đóng</button>
                </div>
            )}
            <style>
                {`
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                `}
            </style>
        </div>
    );
};

export default App;


