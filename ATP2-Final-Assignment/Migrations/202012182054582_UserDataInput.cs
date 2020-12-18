namespace ATP2_Final_Assignment.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserDataInput : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO Users (Username, Password) VALUES ('1','1'), ('2', '2'),('3', '3'),('4', '4'),('abir', 'abir'),('leon', 'leon')");
        }
        
        public override void Down()
        {
        }
    }
}
