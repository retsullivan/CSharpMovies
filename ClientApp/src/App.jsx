import React from 'react';
import './App.css';
import {HomePage}  from "./pages";
import {MovieDetails}  from './pages';
import {MovieList} from "./pages";
import {MovieEditor, MovieAdder} from "./pages";
import {Header} from "./resources";
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends React.Component {
    

    render () {
        return<>
            <Router>
                <Switch>
                    <Route path="/movies/:id" component={MovieDetails}/>   
                    <Route path="/movies" component={MovieList}/>     
                    <Route path="/home" component={HomePage}/>       
                    <Route path="/new" component={MovieAdder}/>   
                    <Route path="/edit/:id" component={MovieEditor}/>  
                    <Route path="/" component= {HomePage}/>  
                    <Route render={() => <Redirect to={{pathname: "/"}} />} />   
                </Switch>
            </Router>
        </>;
    }
}