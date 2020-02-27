import React, { useEffect, useState } from 'react';
import Utils from '../utils/utils';

function List(props){
	const [totalConfirmed, setTotalConfirmed] = useState();
	useEffect(()=>{
		if(props.data.cases){
			const total = props.data.cases.reduce((acc, cur) => {
				const confirmed = cur[3];
				return acc += parseInt(confirmed); 
			}, 0);
			setTotalConfirmed(total);
		}
	}, [props.data.cases]);
	const makeList = () => {
		if(props.data.casesByCountry){
			const list = props.data.casesByCountry.map((c, idx) => {
				
				const {_id, confirmedCount, deathCount, recoveredCount} = c;
				return (
					<div key={idx} className="bg-gray-500 hover:bg-white p-4">
					<div className={"text-base"}>{Utils.formatNum(confirmedCount)} {_id}</div>
					<div className={"text-sm"}>Deaths: {Utils.formatNum(deathCount)}</div>
					<div className={"text-sm"}>Recovered: {Utils.formatNum(recoveredCount)}</div>
					</div>
					)
			})
			return list;
		}
	}
    
	return (
		<div className={`w-1/5 overflow-auto transition ease-in-out animated ${props.openList ? `slideInLeft` : `animated slideOutLeft`} `}>
			<div className="bg-gray-500 hover:bg-white p-4 text-lg">{totalConfirmed} Confirmed cases</div>
			{props.data.casesByCountry && makeList()}
		</div>
	)
}

export default List;