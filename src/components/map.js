import React, { useEffect, useState, useContext } from 'react';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import DataReportContext from './context/DataReportContext';

function LeafletMap(props){
    const data = useContext(DataReportContext);
    const makeMarkers = () => {
        if(data.cases){
            const markers = data.cases.map((c, idx) => {
                if(c.lat && c.lng){
                    return (<CircleMarker 
                        key={idx} center={[c.lat, c.lng]} 
                        radius={c.confirmedCount < 2 ? 2 : 2 * Math.log(c.confirmedCount)}
                        fillRadius={1}
                        stroke={false}
                        fillOpacity={0.8}
                        />
                    )
                }
                
            })
            return markers
        }
    };
    let minLat, minLng, maxLat, maxLng, centerLat, centerLng, bufferLat, bufferLng;
    
    if(data.minMaxLatLng){
        minLat = data.minMaxLatLng.minLat;
        minLng = data.minMaxLatLng.minLng;
        maxLat = data.minMaxLatLng.maxLat;
        maxLng = data.minMaxLatLng.maxLng;
        centerLat = (minLat + maxLat) / 2;
        const distanceLat = maxLat - minLat;
        bufferLat = distanceLat * 0.05;
        centerLng = (minLng + maxLng) / 2;
        const distanceLng = maxLng - minLng;
        bufferLng = distanceLng * 0.15;
    }
    if(props.currentLocation){
        const loc = data.casesByCountry.find(el => el._id === props.currentLocation);
        centerLat = loc.lat;
        centerLng = loc.lng;
    }
    
    return (
        <div className="w-1/2 p-4">
            <Map
                style={{ height: "480px", width: "100%" }}
                zoom={5}
                center={props.currentLocation ? [centerLat, centerLng] : [-0.09, 51.505]}
                bounds={minLat ? [
                    [minLat - bufferLat, minLng - bufferLng],
                    [maxLat + bufferLat, maxLng + bufferLng]
                  ] : [[24,72],[47,121]]}
            >
                <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data && makeMarkers()}
            </Map>
        </div>
    )
}

export default LeafletMap;