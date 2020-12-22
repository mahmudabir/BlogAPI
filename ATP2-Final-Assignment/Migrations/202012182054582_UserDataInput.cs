namespace ATP2_Final_Assignment.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class UserDataInput : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO Users (Username, Password) VALUES ('abir', 'abir'),('leon', 'leon'),('hasib','hasib'), ('tanvir', 'tanvir'),('imran', 'imran'),('milon', 'milon')");
        }

        public override void Down()
        {
        }
    }
}
