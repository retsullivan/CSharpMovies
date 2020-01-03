using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CSharpMovies.Models
{
    public class MovieDetailDTO
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
