import React, { useEffect, useState, useContext, Fragment } from 'react';
import Utils from '../utils/utils';
import DataReportContext from './context/DataReportContext';

function List(props){
    const data = useContext(DataReportContext);
	const [totalConfirmed, setTotalConfirmed] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(()=>{
		if(data.cases){
			setLoading(false);
			const total = data.cases.reduce((acc, cur) => {
				const confirmed = cur.confirmedCount;
				return acc += parseInt(confirmed); 
			}, 0);
			setTotalConfirmed(total);
		}
	}, [data.cases]);
	const makeList = () => {
		if(data.casesByCountry){
			const list = data.casesByCountry.map((c, idx) => {
				
				const {_id, confirmedCount, deathCount, recoveredCount} = c;
				return (
					<div key={idx} className="bg-yellow-400 hover:bg-white p-4" data-name={_id} onClick={(e)=>props.handleListClick(e.currentTarget.getAttribute("data-name"))}>
						<div className="flex flex-row">
							<div className={"text-base text-blue-700"}>{Utils.formatNum(confirmedCount)}</div>
							<div className={"text-base pl-1"}>{_id}</div>
						</div>
						
						<div className={"text-sm text-red-700"}>Deaths: {Utils.formatNum(deathCount)}</div>
						<div className={"text-sm"}>Recovered: {Utils.formatNum(recoveredCount)}</div>
					</div>
					)
			})
			return list;
		}
	}
    
	return (
		<Fragment>
			{loading && <div className="animated pulse infinite h-full pt-32 pl-4">Loading...</div>}
			{data.casesByCountry && 
				<div className={`w-1/5 overflow-auto transition ease-in-out animated ${props.openList ? `slideInLeft` : `animated slideOutLeft`} `}>
					<div className="flex flex-row bg-yellow-500 hover:bg-white border-b">
						<div className="pl-4 text-xl text-blue-700 py-4">{totalConfirmed}</div>
						<div className="w-full text-lg text-center py-4">Confirmed cases</div>
					</div>
					{makeList()}
				</div>
			}
		</Fragment>
		
	)
}

export default List;