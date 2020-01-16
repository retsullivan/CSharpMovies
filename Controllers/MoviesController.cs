using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Description;
using CSharpMovies.Data;
using CSharpMovies.Models;
using Microsoft.AspNetCore.Cors;
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
    [ApiController]
    [ApiConventionType(typeof(DefaultApiConventions))]
    public class MoviesController : Controller
    {

        private readonly ILogger<MoviesController> _logger;
        private MovieContext _context;

        public MoviesController(ILogger<MoviesController> logger, Data.MovieContext context)
        {
            _logger = logger;
            _context = context;
        }
        // GET: Movies
      
        [HttpGet]
        [Route("api/Movies")]
        public IActionResult GetMovies()
        {
            var movies = _context.Movies.Where(e => e.isDeleted == false && e.isCurrent == true)
                                        .ToList();

            return Ok(movies);
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
        [Route("api/Movies/Create")]
        public IActionResult Create(Movie newMovie)
        {

            if (newMovie == null)
            {
                return View("Error");
            }
            else 
            {
                var newCode = this._context.Movies.Select(m => m.MovieCode).Max() + 1;

                newMovie.Id = 0;
                newMovie.MovieCode = newCode;
                newMovie.StartTime = DateTime.Now;
                newMovie.EndTime = DateTime.MaxValue;
                newMovie.isCurrent = true;
                newMovie.isDeleted = false;

                this._context.Movies.Add(newMovie);
                this._context.SaveChanges();

                return Ok();
            }
           
          
        }
        


        [HttpPut]
        [Route("api/Movies/Edit/{id}")]

        public IActionResult Edit(Movie movieToUpdate) 
        {

            if (this._context.Movies.Where(l => l.MovieCode == movieToUpdate.MovieCode).Any())
            {
               
                var movieCode = movieToUpdate.MovieCode;
                var oldMovieInfo = this._context.Movies.Where(e => e.MovieCode == movieCode)
                                                       .Where(e => e.isCurrent == true)
                                                       .FirstOrDefault();
                oldMovieInfo.EndTime = DateTime.Now;
                oldMovieInfo.isCurrent = false;

                movieToUpdate.Id = 0;
                movieToUpdate.StartTime = oldMovieInfo.EndTime;
                movieToUpdate.EndTime = DateTime.MaxValue;
                movieToUpdate.MovieCode = oldMovieInfo.MovieCode;
                movieToUpdate.isCurrent = true;
                movieToUpdate.isDeleted = false;
            
                this._context.Movies.Add(movieToUpdate);

                this._context.SaveChanges();
            

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
                this._context.SaveChanges();
                return Ok();
            }
            else
            {

                return View("Error");
            }
            
        }
    }
}