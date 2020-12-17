﻿namespace ATP2_Final_Assignment.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class UserModelCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                {
                    UserId = c.Int(nullable: false, identity: true),
                    Username = c.String(nullable: false),
                    Password = c.String(nullable: false),
                })
                .PrimaryKey(t => t.UserId);

        }

        public override void Down()
        {
            DropTable("dbo.Users");
        }
    }
}
