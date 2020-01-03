using CSharpMovies.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace CSharpMovies.Data
{
    public class MovieContext : DbContext
    {
        public MovieContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server=(localdb)\mssqllocaldb;Database=Blogging;Integrated Security=True");
        }


    }

    public class Movie
    {
        public int Id { get; set; }
        public int MovieCode { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public int ReleaseYear { get; set; }
        public int Runtime { get; set; }
        public bool isDeleted { get; set; }
        public bool isCurrent { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

    }
}
