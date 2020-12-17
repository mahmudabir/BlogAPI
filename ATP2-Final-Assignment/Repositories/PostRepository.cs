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
            AssDbContext db = new AssDbContext();

            Post FormDB = db.Posts.Where(x => x.PostId == post.PostId).FirstOrDefault();
            Post ToUpdate = FormDB;

            ToUpdate = post;
            db.SaveChanges();
        }
    }
}