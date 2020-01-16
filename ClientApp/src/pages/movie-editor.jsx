import React from 'react';
import {Movie} from '../models';
import {MovieRepository} from '../api';
import { Link } from 'react-router-dom';
import {Header, ColorBand} from "../resources";
import './pages.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';


export class MovieEditor extends React.Component {

    movieRepository = new MovieRepository();
    state = {movieNotFound:true};
      
    componentDidMount(){
        let movieId=this.props.match.params.id;
        
        if(movieId){
        this.movieRepository.getMovieById(movieId)
                            .then(movie => {
                                this.setState({movie:movie});
                                this.setState({movieNotFound:false})
                            })
        }
    }

    editMovie(){
        var onSaveComplete = () => {
            this.setState({});
            this.props.history.push('/movies'); 
        };
        this.movieRepository.editMovie(this.state.movie.movieCode, this.state.movie)
                            .then(onSaveComplete);
    }

    render(){
        return<>
            <Header></Header>
            <ColorBand></ColorBand>     
           
            {
            this.state.movieNotFound &&
            <>
             <div className="bottom"></div>
            <div className = "top">
                {/* <img className="txt404"  src='./404-text.png' alt="404-text"/> */}
                <h5 className="site-title">
                    This is not the movie you're looking for.   Move along to the movie list.
                </h5>
                <div className="bottom"></div>
                <Link to={'/movies'} className="btn btn-info btn-block">Movie List</Link>  
            </div>
            <div className="bottom"></div>
                       
            </>
        }

        {  
        !this.state.movieNotFound &&
       
        <div className="row movie-details">
            <div className="card movie-card">
                <div className="card-body movie-card">
                    
                    <div className="card">
                        <h3 className="display-4">Edit Movie</h3>
                        {
                        this.state.movie &&    
                        <form className="movie-form">
                            {/* <div className="form-group">
                                <div className="d-flex">
                                    <input type="text"
                                    id="newMovieId"
                                    name="newMovieId"
                                    className="form-control" 
                                    placeholder= "movie id"
                                    value={this.state.movie.id}
                                    onChange={e =>this.setState({movie:{...this.state.movie, id: e.target.value}})}
                                    /> 
                                </div>
                            </div> */}
                            <div className="form-group">
                                <div className="d-flex"> 
                                    <input type="text"
                                    id="newMovieTitle"
                                    name="newMovieTitle"
                                    className="form-control" 
                                    placeholder="title"
                                    value={this.state.movie.title}
                                    onChange={e =>this.setState({movie:{...this.state.movie, title: e.target.value}})}
                                    />    
                                </div>         
                            </div>
                            <div className="form-group">
                                <div className="d-flex"> 
                                    <input type="text"
                                    id="newMovieGenre"
                                    name="newMovieGenre"
                                    className="form-control" 
                                    placeholder= "genre"
                                    value={this.state.movie.genre}
                                    onChange={e =>this.setState({movie:{...this.state.movie, genre:e.target.value}})}
                                    />    
                                </div>         
                            </div>
                            <div className="form-group">
                                <div className="d-flex"> 
                                    <input type="text"
                                    id="newMovieDirector"
                                    name="newMovieDirector"
                                    className="form-control" 
                                    placeholder= "director"
                                    value={this.state.movie.director}
                                    onChange={e =>this.setState({movie:{...this.state.movie,director:e.target.value}})}
                                    />    
                                </div>         
                            </div>
                            <div className="form-group">
                                <div className="d-flex"> 
                                    <input type="number"
                                    id="newMovieReleaseYear"
                                    name="newMovieReleaseYear"
                                    className="form-control" 
                                    placeholder= "release year"
                                    value={this.state.movie.releaseYear}
                                                    onChange={e => this.setState({ movie: { ...this.state.movie, releaseYear: new Number(e.target.value)}})}
                                    />    
                                </div>         
                            </div>
                            <div className="form-group">
                                <div className="d-flex"> 
                                    <input type="number"
                                    id="newMovieRunTime"
                                    name="newMovieRunTimer"
                                    className="form-control" 
                                    placeholder= "run time"
                                    value={this.state.movie.runtime}
                                                    onChange={e => this.setState({ movie: { ...this.state.movie, runtime: new Number(e.target.value)}})}
                                    />    
                                </div>         
                            </div>
                    </form>      
                    }
                    <button className="btn btn-info btn-block" onClick={e =>this.editMovie()}> Save Changes </button>
                    </div>
                        
                </div>
            </div>
        </div>  
        }
        </>    
    }
}
export default withRouter (MovieEditor);