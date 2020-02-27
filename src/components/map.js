import React, { useEffect, useState, useContext } from 'react';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import DataReportContext from './context/DataReportContext';

function LeafletMap(){
    const data = useContext(DataReportContext);
    const makeMarkers = () => {
        if(data.casesByCountry){
            const markers = data.casesByCountry.map((c, idx) => {
                return (<CircleMarker key={idx} center={[c.lat, c.lng]}/>)
            })
            return markers
        }
    };
    return (
        <div className="w-3/4">
            <Map
                style={{ height: "480px", width: "100%" }}
                zoom={1}
                center={[-0.09, 51.505]}>
                <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data && makeMarkers()}
            </Map>
        </div>
    )
}

export default LeafletMap;