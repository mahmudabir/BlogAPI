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

        //public User Get(int id)
        //{
        //    return this.GetAll().Where(x => x.UserId == id).FirstOrDefault();
        //}

        public void Update(User user)
        {
            AssDbContext db = new AssDbContext();

            User FormDB = db.Users.Where(x => x.UserId == user.UserId).FirstOrDefault();
            User ToUpdate = FormDB;

            ToUpdate = user;
            db.SaveChanges();
        }
    }
}