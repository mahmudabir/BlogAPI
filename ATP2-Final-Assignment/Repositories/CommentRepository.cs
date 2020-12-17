using ATP2_Final_Assignment.Models;
using Inventory_Rest_API.Repositories;
using System;
using System.Collections.Generic;
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
            AssDbContext db = new AssDbContext();

            Comment FormDB = db.Comments.Where(x => x.CommentId == comment.CommentId).FirstOrDefault();
            Comment ToUpdate = FormDB;

            ToUpdate = comment;
            db.SaveChanges();
        }

    }
}