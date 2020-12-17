using ATP2_Final_Assignment.Attirbutes;
using ATP2_Final_Assignment.Models;
using ATP2_Final_Assignment.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ATP2_Final_Assignment.Controllers
{
    [RoutePrefix("api/posts/{pid}")]
    public class CommentsController : ApiController
    {

        private CommentRepository commentRepository = new CommentRepository();



        [Route("comments")]
        public IHttpActionResult Get(int pid)
        {
            var commentFromDB = commentRepository.GetAllCommentsByPost(pid);

            if (commentFromDB != null)
            {
                return Ok(commentFromDB);
            }
            else
            {
                return BadRequest("empty");
            }
        }

        [Route("comments/{cid}", Name = "GetCommentByID")]
        public IHttpActionResult Get(int pid, int cid)
        {
            var commentFromDB = commentRepository.GetPostCommentByID(pid, cid);

            if (commentFromDB != null)
            {
                return Ok(commentFromDB);
            }
            else
            {
                return BadRequest("empty");
            }
        }

        [Route("comments"), BasicAuthentication]
        public IHttpActionResult Post(Comment comment)
        {
            comment.CommentTime = DateTime.Now;

            if (ModelState.IsValid)
            {
                commentRepository.Insert(comment);
                string uri = Url.Link("GetCommentByID", new { id = comment.PostId });
                return Created(uri, comment);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Route("comments/{cid}"), BasicAuthentication]
        public IHttpActionResult Put(int pid, int cid, Comment comment)
        {
            if (ModelState.IsValid)
            {

                var commentFromDB = commentRepository.GetPostCommentByID(pid, cid);

                if (commentFromDB != null)
                {
                    commentRepository.Update(comment);
                    return Ok(comment);
                }
                else
                {
                    return BadRequest("Post Not Found");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Route("comments/{cid}"), BasicAuthentication]
        public IHttpActionResult Delete(int cid)
        {
            var commentFromDB = commentRepository.Get(cid);

            if (commentFromDB != null)
            {
                commentRepository.Delete(cid);
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return BadRequest("Post Not Found");
            }
        }
    }
}
