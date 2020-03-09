import React, { useEffect, useState, useContext, Fragment, lazy, Suspense } from 'react';
import Utils from '../utils/utils';
import LeafletMap from '../components/Map';
import Header from '../components/Header';
import { DataReportProvider } from '../components/context/DataReportContext';
import Footer from '../components/Footer';
const List = lazy(() => import('../components/List'));
const TotalConfirmedCard = lazy(() => import('../components/TotalConfirmedCard'));
const TwitterBoard = lazy(() => import('../components/TwitterBoard'));

function Homepage() {
    const [openList, setOpenList] = useState(true);
    const [listLocation, setListLocation] = useState("");
    const [dataReport, setDataReport] = useState({cases: []});
    const [totalConfirmed, setTotalConfirmed] = useState();
    const [loading, setLoading] = useState(false);
    const loadDataReport = () => {
        setLoading(true);
        Utils.getData('http://localhost:5000/api/data').then(data => {
            setDataReport(data);
        }).catch(err => console.log(err))
    };
    useEffect(() => loadDataReport(), [])
    useEffect(()=>{
		if(dataReport){
            setLoading(false);
            console.log(dataReport)
			const total = dataReport.cases.reduce((acc, cur) => {
				const confirmed = cur.confirmedCount;
				return acc += parseInt(confirmed); 
            }, 0);
            console.log(total)
			setTotalConfirmed(total);
		}
	}, [dataReport]);
    function toggleList(){
        setOpenList(!openList);
    }
    function handleListClick(e){
        setListLocation(e);
    }
    return (
        <DataReportProvider value={dataReport}>
            <div className="max-h-full">
                <Header toggleList={toggleList}/>
                <div className={"flex flex-row max-h-screen rounded bg-blue-800 pt-3 pl-4"}>
                    <Suspense fallback={<div className="animated pulse infinite text-white">Loading...</div>}>
                        <div className={`flex flex-col w-1/5 max-h-screen animated ${openList ? `slideInLeft` : `animated slideOutLeft`}`}>
                            <Suspense fallback={<div className="animated pulse infinite text-white">Loading...</div>}>
                                <TotalConfirmedCard totalConfirmed={totalConfirmed} />
                                <List openList={openList} handleListClick={handleListClick}/>
                            </Suspense>
                        </div>
                    </Suspense>
                    <LeafletMap currentLocation={listLocation}/> 
                    <Suspense fallback={<div className="animated pulse infinite">Loading...</div>}>
                        <TwitterBoard />
                    </Suspense>
                </div>
                <Footer/>
            </div>
        </DataReportProvider>
    )
}

export default Homepage;