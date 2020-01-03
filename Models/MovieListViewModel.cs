using CSharpMovies.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CSharpMovies.Models
{
    public class MovieListViewModel
    {
        public IQueryable<Movie> movies { get; set; }
    }
}
