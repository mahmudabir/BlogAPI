namespace ATP2_Final_Assignment.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class CommentModelCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                {
                    CommentId = c.Int(nullable: false),
                    Text = c.String(nullable: false),
                    CommentTime = c.DateTime(nullable: false),
                    UserId = c.Int(nullable: false),
                    PostId = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.CommentId)
                .ForeignKey("dbo.Posts", t => t.PostId)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId)
                .Index(t => t.PostId);

        }

        public override void Down()
        {
            DropForeignKey("dbo.Comments", "UserId", "dbo.Users");
            DropForeignKey("dbo.Comments", "PostId", "dbo.Posts");
            DropIndex("dbo.Comments", new[] { "PostId" });
            DropIndex("dbo.Comments", new[] { "UserId" });
            DropTable("dbo.Comments");
        }
    }
}
