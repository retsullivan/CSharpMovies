import React from 'react';
import {Movie} from '../models';
import {MovieRepository} from '../api';
import { Link } from 'react-router-dom';
import {Header} from "../resources/header";
import {ColorBand} from "../resources/color-band";
import './pages.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';



export class MovieDetails extends React.Component {

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
            .catch(() => this.setState({movieNotFound: true}));
        }
    }

    deleteMovie(){
        var onSaveComplete = () => {
            this.setState({});
            this.props.history.push(`/movies`); 
        };
        
        this.movieRepository.deleteMovie(this.state.movie.id)
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
        <>      
            <div className="row movie-details">
                <div className="row card movie-card">
                    <div className="card-title">
                        <h3 className="display-3">Movie Details</h3>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                {/* //used to be Id */}
                                <th>Code</th>   
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Director</th>
                                <th>Year</th>
                                <th>Runtime</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                </tr>
                            </thead>
                            {
                            this.state.movie &&  
                            <tbody>
                                <tr>
                                    <td id='movie-detail-code'>{this.state.movie.movieCode}</td>
                                    <td id='movie-detail-title'>{this.state.movie.title}</td>
                                    <td id='movie-detail-genre'>{this.state.movie.genre}</td>
                                    <td id = 'movie-detail-director'>{this.state.movie.director}</td>
                                    <td id = 'movie-detail-releaseYear'>{this.state.movie.releaseYear}</td>
                                    <td id='movie-detail-runTime'>{this.state.movie.runTime}</td>
                                
                                    <td> 
                                        {/* <div className="btn btn-outline-info  detail-button">Edit</div>  */}
                                        <Link to={'/edit/'+this.state.movie.id} className="btn btn-outline-info detail-button">
                                                Edit
                                        </Link>  
                                    </td>
                                    <td>    
                                        <div className="btn btn-danger detail-button" onClick={() => 
                                            { if (window.confirm('Are you sure you wish to delete this movie?'))
                                            this.deleteMovie()}}>Delete</div>
                                    </td>
                                </tr>
                            </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>  
        </>
        }
        </>    
    }
}
export default withRouter (MovieDetails);