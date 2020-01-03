using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CSharpMovies.Data;
using CSharpMovies.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using HttpDeleteAttribute = Microsoft.AspNetCore.Mvc.HttpDeleteAttribute;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using HttpPutAttribute = Microsoft.AspNetCore.Mvc.HttpPutAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace CSharpMovies.Controllers
{
    public class MoviesController : Controller
    {

        private readonly ILogger<MoviesController> _logger;
        private readonly MovieContext _context;

        public MoviesController(ILogger<MoviesController> logger, Data.MovieContext context)
        {
            _logger = logger;
            _context = context;
        }
        // GET: Movies
      
        [HttpGet]
        [Route("api/Movies")]
        public IQueryable<Movie> GetMovies()
        {
            var movies = from movie in _context.Movies
                        select new Movie()
                        {
                            Id = movie.Id,
                            MovieCode = movie.MovieCode,
                            Title = movie.Title,
                            Genre = movie.Genre,
                            Director = movie.Director,
                            ReleaseYear = movie.ReleaseYear,
                            Runtime = movie.Runtime
                        };

            return movies;
        }

        
        // GET: Movie/Details/5
       [HttpGet]
       [Route("api/Movies/{id}")]
        [ResponseType(typeof(MovieDetailDTO))]
        public async Task<IActionResult> GetMovie(int id)
        {
            var movie = await this._context.Movies.Where(e => e.isDeleted == false)
                                                .Where(e => e.isCurrent == true)
                                                .Select(movie => new MovieDetailDTO()
                                                {
                                                    Id = movie.Id,
                                                    MovieCode = movie.MovieCode,
                                                    Title = movie.Title,
                                                    Genre = movie.Genre,
                                                    Director = movie.Director,
                                                    ReleaseYear = movie.ReleaseYear,
                                                    Runtime = movie.Runtime
                                                }).SingleOrDefaultAsync(m => m.Id == id);                
                

            if (movie == null)
            {
                
              return View("Error");
                
            }

            return Ok(movie);
        }

       

        // POST: Movie/Create
        [HttpPost]
        [Route("api/Movies/Add")]
      
        public IActionResult Add(Movie newMovie)
        {
            try
            {

                var newCode = this._context.Movies.Select(m => m.MovieCode).Max() + 1;

                newMovie.MovieCode = newCode;
                newMovie.StartTime = DateTime.Now;
                newMovie.EndTime = DateTime.MaxValue;

                this._context.Movies.Add(newMovie);

                return Ok();
            }
            catch
            {
                return View("Error");
            }
        }
        


        [HttpPut]
        [Route("api/Movies/Edit/{id}")]

        public IActionResult Edit(int id, Movie editedMovie) {

            if (this._context.Movies.Where(l => l.MovieCode == id).Any())
            {
               
            var movieCode = id;
            var oldMovieInfo = this._context.Movies.Where(e => e.MovieCode == movieCode)
                                                   .Where(e => e.isCurrent == true)
                                                   .FirstOrDefault();

            oldMovieInfo.EndTime = DateTime.Now;
            oldMovieInfo.isCurrent = false;

            editedMovie.StartTime = oldMovieInfo.EndTime;
            editedMovie.MovieCode = oldMovieInfo.MovieCode;


            this._context.Movies.Add(editedMovie);

            return Ok();
            }

            else
            {
                return View("Error");
            }

        }

        // POST: Movie/Delete/5
        [HttpDelete]
        [Route("api/Movies/Delete/{id}")]

        public IActionResult Delete(int id)
        {
           
            if (this._context.Movies.Where(l => l.MovieCode == id).Any())
            {

                var movieCode = id;
                
                foreach (Movie deleteMovie in this._context.Movies.Where(l => l.MovieCode == id))
                {
                    deleteMovie.isDeleted = true;
                }
                return Ok();

            }
            
            return View("Error");
            
        }
    }
}