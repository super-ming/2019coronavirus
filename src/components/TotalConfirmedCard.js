import React from 'react';
import Utils from '../utils/utils';

function TotalConfirmedCard(props){
    const totalConfirmed = props.totalConfirmed;
    return (
        <div className="flex flex-row bg-yellow-500 hover:bg-white border-b rounded">
            <div className="pl-4 text-xl text-blue-700 py-4">{Utils.formatNum(totalConfirmed)}</div>
            <div className="w-full text-md text-center pt-5 pb-4"> Confirmed Cases</div>
        </div>
    )
};

export default TotalConfirmedCard;