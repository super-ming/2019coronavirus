import { createContext } from 'react';

const DataReportContext = createContext();

export const DataReportProvider = DataReportContext.Provider;
export const DataReportConsumer = DataReportContext.Consumer;
export default DataReportContext;