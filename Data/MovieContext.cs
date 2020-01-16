using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;


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
            base.OnConfiguring(optionsBuilder);
           // optionsBuilder.UseSqlServer(
           // @"Server=(localdb)\mssqllocaldb;Database=master;Integrated Security=True");
        }

    }

    //[Table("Movies", Schema = "dbo")]
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
