import React, { useEffect, useState, useContext, Fragment } from 'react';
import DataReportContext from '../context/DataReportContext';
import List from '../list';
import LeafletMap from '../map';
import Header from '../header';

function Homepage() {
    const data = useContext(DataReportContext);
    
    const [openList, setOpenList] = useState(true);
    function toggleList(){
        setOpenList(!openList);
    }
    return (
        <Fragment>
            <Header toggleList={toggleList}/>
            <div className={"flex flex-row h-screen"}>
                <List data={data} openList={openList}/> 
                <LeafletMap />  
            </div>
        </Fragment>
    )
}

export default Homepage;