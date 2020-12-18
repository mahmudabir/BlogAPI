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
    [RoutePrefix("api/posts")]
    public class PostsController : ApiController
    {
        private PostRepository postRepository = new PostRepository();


        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(postRepository.GetAll().OrderByDescending(x => x.PostTime));
        }

        [Route("{id}", Name = "GetPostByID")]
        public IHttpActionResult Get(int id)
        {
            var postFromDB = postRepository.Get(id);

            if (postFromDB != null)
            {
                return Ok(postFromDB);
            }
            else
            {
                return BadRequest("Post Not Found");
            }
        }

        [Route(""), BasicAuthentication]
        public IHttpActionResult Post(Post post)
        {
            post.PostTime = DateTime.Now;
            if (ModelState.IsValid)
            {
                postRepository.Insert(post);
                string uri = Url.Link("GetPostByID", new { id = post.PostId });
                return Created(uri, post);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("{id}"), BasicAuthentication]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Post post)
        {
            if (ModelState.IsValid)
            {

                var postFromDB = postRepository.Get(id);

                if (postFromDB != null)
                {
                    postRepository.Update(post);
                    return Ok(post);
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

        [Route("{id}"), BasicAuthentication]
        public IHttpActionResult Delete(int id)
        {
            var postFromDB = postRepository.Get(id);

            if (postFromDB != null)
            {
                postRepository.Delete(id);
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return BadRequest("Post Not Found");
            }
        }
    }
}
