using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ATP2_Final_Assignment.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }

        public DateTime PostTime { get; set; }


        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        [JsonIgnore]
        public ICollection<Comment> Comments { get; set; }
    }
}