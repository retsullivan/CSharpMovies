import React from 'react';
import { Link } from 'react-router-dom';
import {withRouter, Redirect} from 'react-router-dom';
import {MovieDetails} from "./movie-details";
import {Header} from "../resources/header";
import {MovieRepository} from "../api";
import {Movie} from "../models";
import retro_death_vector from './retro_death_vector.svg';
import './pages.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class HomePage extends React.Component {

    movieRepository = new MovieRepository();
    movie =new Movie();

    state={
        movieId:"",
        redirect:false
    };
    
    onSubmit(){
        this.redirect=true;
    }

    isIdValid(id){
        let isValid = false;
        let movie=this.movieRepository.getMovieById(id);
        if(movie.title){
            this.isValid=true;
        }
        return isValid
    }

    render(){
        return <>
            <Header></Header>
        
            <div className='search-bar'>
                <div className="row">                
                    
                    <div className="col col-sm-6">
                        <Link to={'/movies'} className="btn btn-info btn-block">Movie List</Link>  
                    </div>
                                        
                    <div className="col col-sm-6">
                        <form className="movie-id-search">
                            <div className="form-group p-0 m-0">
                                {
                                <input type="text"
                                id="movieId"
                                name="movieId"
                                className="form-control" 
                                placeholder="Enter a movie id"
                                value={this.state.movieId}
                                onChange={e =>this.setState({movieId:e.target.value})}
                                />       
                                }            
                            </div>
                            {
                                !this.state.movieId && 
                                <button className="btn btn-outline-info id-search-button">
                                    Submit
                                </button>
                            }
                            {
                                this.state.movieId && 
                                // this.isIdValid(this.state.movieId)&&
                                <Link to={'/movies/'+ this.state.movieId} className="btn btn-outline-info id-search-button">
                                    Submit
                                </Link> 
                            }
                        </form> 
                       
                    </div>   
                </div>  
            </div>   
            
            <div className="banner">
                 <img  className="image" id="retro-death" src={retro_death_vector} alt="retro death star logo"/>
            </div>
        
    </>
    }
}
export default withRouter(HomePage);