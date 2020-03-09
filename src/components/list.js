import React, { useContext, Fragment } from 'react';
import Utils from '../utils/utils';
import DataReportContext from './context/DataReportContext';

function List(props){
    const data = useContext(DataReportContext);

	const makeList = () => {
		if(data.casesByCountry){
			const list = data.casesByCountry.map((c, idx) => {
				const {_id, confirmedCount, deathCount, recoveredCount} = c;
				return (
					<div key={idx} className="bg-yellow-400 hover:bg-white p-4 border-b" data-name={_id} onClick={(e)=>props.handleListClick(e.currentTarget.getAttribute("data-name"))}>
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
			{data.casesByCountry && 
				<div className="overflow-scroll">
					{makeList()}
				</div>
			}
		</Fragment>
	)
}

export default List;