import { createContext } from 'react';

type Case = {
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

type MinMaxLatLng = {
    minLat?: number,
    minLng?: number,
    maxLat?: number,
    maxLng?: number
}

interface ContextProps {
    cases?: Case[],
    casesByCountry?: Case[],
    minMaxLatLng?: MinMaxLatLng
}

const DataReportContext = createContext<Partial<ContextProps>>({});

export const DataReportProvider = DataReportContext.Provider;
export const DataReportConsumer = DataReportContext.Consumer;
export default DataReportContext;