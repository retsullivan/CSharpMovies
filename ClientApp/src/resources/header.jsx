import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/pages.css';

export class Header extends React.Component {
    render(){
        return <>
             <head>
                <link rel="stylesheet" href="https://use.typekit.net/uff0mpp.css"/>
            </head>
           
            <div className="top">
                <div className="row">
                    <div className="col">
                        <h1 className="display-1">
                            <Link to="/home" className="site-title" id="site-title">Movie Manager</Link>
                        </h1>
                    </div>
                </div>
            </div>
            
            </>
    }

}