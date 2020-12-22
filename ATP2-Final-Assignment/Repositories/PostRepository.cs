using ATP2_Final_Assignment.Models;
using Inventory_Rest_API.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ATP2_Final_Assignment.Repositories
{
    public class PostRepository : Repository<Post>
    {
        //public Post Get(int id)
        //{
        //    return this.GetAll().Where(x => x.PostId == id).FirstOrDefault();
        //}


        public void Update(Post post)
        {
            using (AssDbContext db = new AssDbContext())
            {

                var fromDB = db.Posts.Where(x => x.PostId == post.PostId).First<Post>();

                fromDB.Title = post.Title;
                fromDB.Content = post.Content;


                db.SaveChanges();
            }
        }





        public List<Post> PostSearch(string search)
        {
            return this.GetAll().Where(x => x.Title.Contains(search) || x.Content.Contains(search) || x.User.Username.Contains(search)).ToList();
        }
    }
}