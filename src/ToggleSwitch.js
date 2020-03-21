import React from 'react';

export default function ToggleSwitch(props){
    let toggle = props.id + "switch";
    return (
        <div className="material-switch pull-right" key={props.id} id={props.id}>
            <input id={toggle} name="someSwitchOption001" type="checkbox"/>
            <label htmlFor={toggle} className="label-default"></label>
        </div>
    )
}