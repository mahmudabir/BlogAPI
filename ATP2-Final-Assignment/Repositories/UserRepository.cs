using ATP2_Final_Assignment.Models;
using Inventory_Rest_API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Final_Assignment.Repositories
{
    public class UserRepository : Repository<User>
    {
        public User GetUserByUsernameNPassword(string username, string password)
        {
            return this.GetAll().Where(user => user.Username == username && user.Password == password).FirstOrDefault();
        }
    }
}