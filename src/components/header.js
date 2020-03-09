import React from 'react';
import { ReactComponent as Icon } from '../assets/buttonicon.svg';

function Header(props){
    return (
        <div className="flex flex-row w-full bg-blue-500 ">
            <button className="mx-4" onClick={()=>props.toggleList()}><Icon width={25}/></button>
            <div className="text-3xl">COVID-19 Tracker</div>
        </div>
    )
}

export default Header;