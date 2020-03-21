import React from 'react';

export default function Roles(props){
    let Class = "w-" + props.data + " ";
    return(
        <div className={props.hasOwnProperty("data") === true ? Class + "transition-2 bx-shdw user-data" : "bx-shdw w-90 transition-2 user-data"}>
            <h3 className="text-center bb-grey">Manage Roles</h3>
            <p>No content</p>
        </div>
    )
}