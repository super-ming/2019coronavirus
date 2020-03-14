import React, { useContext } from 'react';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import DataReportContext from './context/DataReportContext';

interface MapProps {
    currentLocation?: string
}

type Case = {
    confirmedCount: number,
    lat?: number,
    lng?: number
}

interface MinMaxLatLng {
    minLat?: number,
    minLng?: number,
    maxLat?: number,
    maxLng?: number
}

interface CasesByCountry {
    country: string,
    province: string,
    confirmedCount: number,
    deathCount: number,
    recoveredCount: number,
    lastUpdate: string,
    lat: number,
    lng: number,
    __v: number
    _id: {}
}

function LeafletMap(props: MapProps){
    const data = useContext(DataReportContext);
    const makeMarkers = () => {
        if(data.cases){
            const markers = data.cases.map((c:Case, idx) => {
                if(c.lat && c.lng){
                    return (<CircleMarker 
                        key={idx} center={[c.lat, c.lng]} 
                        radius={c.confirmedCount < 2 ? 2 : 2 * Math.log(c.confirmedCount)}
                        fillRadius={1}
                        stroke={false}
                        fillOpacity={0.7}
                        />
                    )
                }
                return ''
            })
            return markers
        }
    };
    let minLat:number | undefined = 0, minLng:number | undefined = 0, maxLat:number | undefined = 0, maxLng:number | undefined = 0, centerLat:number | undefined = 0, centerLng:number | undefined = 0, bufferLat:number | undefined = 0, bufferLng:number | undefined = 0;
    const minMaxCoords = data.minMaxLatLng as MinMaxLatLng; 
    if(minMaxCoords){
        minLat = minMaxCoords.minLat || 0;
        minLng = minMaxCoords.minLng || 0;
        maxLat = minMaxCoords.maxLat || 0;
        maxLng = minMaxCoords.maxLng || 0;
        centerLat = (minLat + maxLat) / 2;
        const distanceLat = maxLat - minLat;
        bufferLat = distanceLat * 0.05 || 0;
        centerLng = (minLng + maxLng) / 2;
        const distanceLng = maxLng - minLng;
        bufferLng = distanceLng * 0.15 || 0;
    }
    if(props.currentLocation){
        const casesByCountry = data.casesByCountry as CasesByCountry[];
        const loc = casesByCountry.find(el => el._id === props.currentLocation) as CasesByCountry;
        centerLat = loc.lat;
        centerLng = loc.lng;
    }
    
    return (
        <div className="w-1/2 px-4">
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