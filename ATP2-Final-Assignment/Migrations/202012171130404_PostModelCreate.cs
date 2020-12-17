namespace ATP2_Final_Assignment.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class PostModelCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Posts",
                c => new
                {
                    PostId = c.Int(nullable: false),
                    Title = c.String(nullable: false),
                    Content = c.String(nullable: false),
                    PostTime = c.DateTime(nullable: false),
                    UserId = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.PostId)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId);

        }

        public override void Down()
        {
            DropForeignKey("dbo.Posts", "UserId", "dbo.Users");
            DropIndex("dbo.Posts", new[] { "UserId" });
            DropTable("dbo.Posts");
        }
    }
}
