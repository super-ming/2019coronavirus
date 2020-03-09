import React, { useEffect, useState, lazy, Suspense } from 'react';
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
    const loadDataReport = () => {
        Utils.getData('http://localhost:5000/api/cases').then(data => {
            setDataReport(data);
        }).catch(err => console.log(err))
    };
    useEffect(() => loadDataReport(), [])
    useEffect(()=>{
		if(dataReport){
			const total = dataReport.cases.reduce((acc, cur) => {
				const confirmed = cur.confirmedCount;
				return acc += parseInt(confirmed); 
            }, 0);
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
            <div className="h-screen">
                <Header toggleList={toggleList}/>
                <main className={"flex flex-row flex-grow rounded bg-blue-800 pt-3 px-4"}>
                    <Suspense fallback={<div className="animated pulse infinite text-white">Loading...</div>}>
                        <div className={`flex flex-col flex-grow max-h-screen animated block ease-out ${openList ? `slideInLeft w-1/5` : `slideOutLeft hidden`}`}>
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
                </main>
                <Footer/>
            </div>
        </DataReportProvider>
    )
}

export default Homepage;