import React from 'react';
import {Movie} from '../models';
import { Link } from 'react-router-dom';
import '../pages/pages.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';


export class InfoForm extends React.Component{

    state = {
        newMovieId:"",
        newMovieTitle:"",
        newMovieGenre:"",
        newMovieDirector:"",
        newMovieReleaseYear:"",
        newMovieRunTime:""
    };

    onAddMovie(){
        this.props.addMovie(new Movie(this.state.newMovieId,this.state.newMovieTitle,this.state.newMovieGenre,
                                        this.state.newMovieDirector, this.state.newMovieReleaseYear, this.state.newMovieRunTime));
        this.resetForm();
    }


    resetForm(){
        this.setState({newMovieId:"",
                        newMovieTitle:"",
                        newMovieGenre:"",
                        newMovieDirector:"",
                        newMovieReleaseYear:"",
                        newMovieRunTime:""});      
    }

    render(){
        return<>
            {
            <div className="edit-menu {this.props.state.editFormClass}">
                <div className="card">
                    <h3>Add Movie</h3>
                    <h5>my form here</h5>
                    
                    <form className="movie-form">
                        <div className="form-group">
                            <div className="d-flex">
                                <input type="text"
                                id="newMovieId"
                                name="newMovieId"
                                className="form-control" 
                                placeholder="Enter the movie id"
                                value={this.state.newMovieId}
                                onChange={e =>this.setState({newMovieId:e.target.value})}
                                /> 
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="d-flex"> 
                                <input type="text"
                                id="newMovieTitle"
                                name="newMovieTitle"
                                className="form-control" 
                                placeholder="Enter the movie Title"
                                value={this.state.newMovieTitle}
                                onChange={e =>this.setState({newMovieTitle:e.target.value})}
                                />    
                            </div>         
                        </div>
                        <div className="form-group">
                            <div className="d-flex"> 
                                <input type="text"
                                id="newMovieGenre"
                                name="newMovieGenre"
                                className="form-control" 
                                placeholder="Enter the movie genre"
                                value={this.state.newMovieGenre}
                                onChange={e =>this.setState({newMovieGenre:e.target.value})}
                                />    
                            </div>         
                        </div>
                </form>           
                <button className="btn btn-info btn-block" onClick={(this.props.addMovie())}> Add </button>
                {/* <button className="btn btn-info btn-block"> Add </button> */}
                <button className="btn btn-outline-info btn-block" id="cancel" onClick={(this.resetForm())} > cancel</button>
                {/* <button className="btn btn-outline-info btn-block"> Add </button> */}
                </div>
            </div>
            }
        </>
    };
    
}