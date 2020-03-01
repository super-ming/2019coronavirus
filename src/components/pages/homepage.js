import React, { useEffect, useState, useContext, Fragment, lazy, Suspense } from 'react';
import Utils from '../../utils/utils';
import LeafletMap from '../map';
import Header from '../header';
import { DataReportProvider } from '../context/DataReportContext';
const List = lazy(() => import('../list'));

function Homepage() {
    const [openList, setOpenList] = useState(true);
    const [listLocation, setListLocation] = useState("");
    const [dataReport, setDataReport] = useState({});
    const loadDataReport = () => {
        Utils.getData('http://localhost:5000/api/data').then(data => {
            setDataReport(data);
        }).catch(err => console.log(err))
    };
    useEffect(() => loadDataReport(), [])
    function toggleList(){
        setOpenList(!openList);
    }
    function handleListClick(e){
        setListLocation(e);
    }
    return (
        <DataReportProvider value={dataReport}>
            <Header toggleList={toggleList}/>
            <div className={"flex flex-row h-screen bg-blue-200"}>
                <Suspense fallback={<div>Loading...</div>}>
                    <List openList={openList} handleListClick={handleListClick}/> 
                </Suspense>
                <LeafletMap currentLocation={listLocation}/>  
            </div>
        </DataReportProvider>
    )
}

export default Homepage;