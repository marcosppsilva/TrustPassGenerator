import '../../src/App.css';
import React from "react";

export function GeneratedPass({ value, onChange }) {
    return (

        <input type="text" value={value} onChange={onChange} className='ShowingGenerated' readOnly ></input>
    );
}