using ATP2_Final_Assignment.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace ATP2_Final_Assignment.Models
{
    public class User : IValidatableObject
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }



        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> messages = new List<ValidationResult>();
            UserRepository userRepository = new UserRepository();

            //Username property
            if (Username == null || Username == "")
            {
                messages.Add(new ValidationResult($"{nameof(Username)} Field Cannot be empty.", new List<string> { nameof(Username) }));
            }
            if (Username.Length < 8)
            {
                messages.Add(new ValidationResult($"{nameof(Username)} must contain more than 8 characters.", new List<string> { nameof(Username) }));
            }
            if (userRepository.GetAll().Where(x => x.Username == Username).FirstOrDefault() != null)
            {
                messages.Add(new ValidationResult($"{nameof(Username)} is used already", new List<string> { nameof(Username) }));
            }


            //Password property
            if (Password == null || Password == "")
            {
                messages.Add(new ValidationResult($"{nameof(Password)} Field Cannot be empty.", new List<string> { nameof(Password) }));
            }
            if (Password.Length < 8)
            {
                messages.Add(new ValidationResult($"{nameof(Password)} must contain more than 8 characters.", new List<string> { nameof(Password) }));
            }
            return messages;
        }
    }
}