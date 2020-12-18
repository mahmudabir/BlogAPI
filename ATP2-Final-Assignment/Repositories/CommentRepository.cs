using ATP2_Final_Assignment.Models;
using Inventory_Rest_API.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ATP2_Final_Assignment.Repositories
{
    public class CommentRepository : Repository<Comment>
    {
        public List<Comment> GetAllCommentsByPost(int pid)
        {
            return this.GetAll().Where(x => x.PostId == pid).ToList();
        }

        public Comment GetPostCommentByID(int pid, int cid)
        {
            return this.GetAll().Where(x => x.PostId == pid && x.CommentId == cid).FirstOrDefault();
        }

        //public Comment Get(int id)
        //{
        //    return this.GetAll().Where(x => x.CommentId == id).FirstOrDefault();
        //}

        public void Update(Comment comment)
        {
            using (AssDbContext db = new AssDbContext())
            {

                var fromDB = db.Comments.Where(x => x.CommentId == comment.CommentId).First<Comment>();

                fromDB.Text = comment.Text;
                fromDB.CommentTime = comment.CommentTime;
                fromDB.Username = comment.Username;

                db.SaveChanges();
            }
        }

    }
}