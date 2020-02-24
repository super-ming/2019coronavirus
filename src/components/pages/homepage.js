import React, { useEffect, useContext, Fragment } from 'react';
import DataReportContext from '../context/DataReportContext';
import List from '../list';
import Map from '../map';

function Homepage() {
    const data = useContext(DataReportContext);
    return (
        <div className={"flex flex-row h-screen"}>
            <List data={data}/> 
            <Map />  
        </div>
    )
}

export default Homepage;