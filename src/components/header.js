import React, { useEffect, useState } from 'react';

function Header(props){
    return (
        <div className="flex flex-row w-full bg-blue-500 ">
            <button className="mx-4" onClick={()=>props.toggleList()}>Button</button>
            <div className="text-3xl">Header</div>
        </div>
    )
}

export default Header;