import React from 'react';
import Utils from '../utils/utils';

interface CardProps {
    totalConfirmed?: number
}

function TotalConfirmedCard(props: CardProps){
    const totalConfirmed = props.totalConfirmed;
    return (
        <div className="flex flex-col bg-yellow-500 hover:bg-white border-b rounded">
            <div className="text-xl text-blue-700 text-center pt-4">{Utils.formatNum(totalConfirmed || 0)}</div>
            <div className="w-full text-md text-center pt-5 pb-4"> Confirmed Cases</div>
        </div>
    )
};

export default TotalConfirmedCard;