using ATP2_Final_Assignment.Attirbutes;
using ATP2_Final_Assignment.Models;
using ATP2_Final_Assignment.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Web.Http;

namespace ATP2_Final_Assignment.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private UserRepository userRepository = new UserRepository();

        [Route(""), BasicAuthentication]
        public IHttpActionResult GetLogin()
        {
            if (ModelState.IsValid)
            {
                return Ok(userRepository.GetAll());
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("login")]
        public IHttpActionResult PostLogin(User user)
        {
            if (ModelState.IsValid)
            {
                User userFromDB = userRepository.GetUserByUsernameNPassword(user.Username, user.Password);
                if (userFromDB != null)
                {
                    return Ok(userFromDB);
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Route("logout"), BasicAuthentication]
        public IHttpActionResult GetLogout()
        {

            Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(""), null);
            var authOrNot = Thread.CurrentPrincipal.Identity.IsAuthenticated;
            var authUsername = Thread.CurrentPrincipal.Identity.Name.ToString();
            var authUserRole = Thread.CurrentPrincipal.IsInRole(null);
            var authInstanceType = Thread.CurrentPrincipal.GetType();
            var authType = Thread.CurrentPrincipal.Identity.AuthenticationType;
            return StatusCode(HttpStatusCode.OK);
        }


        [Route("register")]
        public IHttpActionResult PostRegister(User user)
        {
            if (ModelState.IsValid)
            {
                User userFromDB = userRepository.GetUserByUsernameNPassword(user.Username, user.Password);
                if (userFromDB != null)
                {
                    return BadRequest("Username already exists");
                }
                else
                {
                    userRepository.Insert(user);
                    return StatusCode(HttpStatusCode.Created);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


    }
}
