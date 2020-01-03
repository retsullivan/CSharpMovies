import React from 'react';
import '../pages/pages.css';

export class ColorBand extends React.Component {
    render(){
        return <>
            <div className="maroon" id="maroon-stripe"></div>
            <div className="red" id="red-stripe"></div>
            <div className="orange" id="orange-stripe"></div>
            <div className="yellow" id="yellow-stipe"></div>          
            </>
    }

}