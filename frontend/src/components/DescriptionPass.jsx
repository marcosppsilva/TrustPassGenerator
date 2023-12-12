import '../../src/App.css';
import React from "react";

export function DescriptionPass({value, onChange}) {
    return (

        <input type="text" value={value} onChange={onChange}></input>        
    );
}