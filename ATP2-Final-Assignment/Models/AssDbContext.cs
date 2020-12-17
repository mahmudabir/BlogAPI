using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace ATP2_Final_Assignment.Models
{
    public class AssDbContext : DbContext
    {
        public AssDbContext() : base("AssDb")
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            modelBuilder.Entity<Post>()
                .Property(post => post.PostTime)
                .IsOptional();

            modelBuilder.Entity<Comment>()
                .Property(comment => comment.CommentTime)
                .IsOptional();
        }
    }
}