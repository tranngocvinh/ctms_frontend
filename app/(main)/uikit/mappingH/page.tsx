"use client"
import React, {useState, useEffect} from 'react';
import {
    APIProvider,
    Map,
    useMapsLibrary,
    useMap,
} from "@vis.gl/react-google-maps";
import DirectionsService = google.maps.DirectionsService;
import DirectionsRenderer = google.maps.DirectionsRenderer;


export default function Intro() {
    const position = {lat: 21.0278, lng: 105.8342};
    return (
        <div style={{height: "100vh", width: "100%"}}>
            <APIProvider apiKey={'AIzaSyDcJ5DTm_s2j29SwC0ASU0LDA6XS_EGJzg'}>
                <Map center={position} zoom={10} mapId={'c5dc8b63c411e6b'} fullscreenControl={false}>
                    <Direction/>
                </Map>
            </APIProvider>
        </div>
    )

    function Direction() {
        const map = useMap();
        const routesLibrary = useMapsLibrary("routes");
        const [directionsService, setDirectionsService] =
            useState<google.maps.DirectionsService>();
        const [directionsRenderer, setDirectionsRenderer] =
            useState<google.maps.DirectionsRenderer>();
        const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
        const [routeIndex, setRouteIndex] = useState(0);
        const selected = routes[routeIndex];
        const leg = selected?.legs[0];
        useEffect(() => {
            if (!routesLibrary || !map) return;
            setDirectionsService(new routesLibrary.DirectionsService);
            setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
        }, [routesLibrary, map]);
        useEffect(() => {
            if (!directionsService || !directionsRenderer) return;
            directionsService.route({
                origin: "Hai Phong",
                destination: "Ha Noi",
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
            }).then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });
        }, [directionsService, directionsRenderer]);
        useEffect(() => {
            if (!directionsRenderer) return;
            directionsRenderer.setRouteIndex(routeIndex);
        }, [routeIndex, directionsRenderer])
        if (!leg) return null;
        return (
            <div className={"disrections"}>
                <h2>{selected.summary}</h2>
                <p>{leg.start_address.split(","[0])} to {leg.end_address.split(",")[0]}</p>
                <p> Distance: {leg.distance?.text}</p>
                <p>Duration: {leg.duration?.text}</p>
                <h2>Other Routes</h2>
                <ul>
                    {routes.map((route, index) =>
                        <li key={route.summary}>
                            <button onClick={() => setRouteIndex(index)}>{route.summary} </button>
                        </li>)}
                </ul>
            </div>
        )
    }
}
