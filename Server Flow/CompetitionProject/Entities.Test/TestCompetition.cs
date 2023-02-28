using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using ZCC.Entities;
using ZCC.Models;


namespace ZCC.Entities.Test
{
    public class TestCompetition
    {
		static string userId = "vvv";
		User testUser = new User(userId, "User Test", "Test@test.test");

		[Test, Category("User Testing"), Ignore("Checked")]
		public void T1_AddUser()
		{
			MainManager.Instance.userEntities.insertUserToDB(testUser);
			bool CheckIfInDB = MainManager.Instance.userEntities.checkIfUserInDB(userId);
			Assert.True(CheckIfInDB, "Sould be Equal");
		}

		[Test, Category("Category Testing")]
		public void T2_UserToManager()
		{
			string newCategory = "ASP";
			MainManager.Instance.categoriesManager.setNewCategory(newCategory);
			Dictionary<string, Models.Categories> categoryDic =  MainManager.Instance.categoriesManager.allCategories();
			bool CheckIfInDB = categoryDic.ContainsKey(newCategory);
			Assert.True(CheckIfInDB, "Sould be Equal");
		}

		/*
		[Test, Category("User Testing")]
		public void T2_UserToManager()
		{
			User[] users= {testUser};
			Competition TestCompetition = new Competition() { Name= "Test",Start= DateTime.Now,End=DateTime.Now,hashcode="",maxActiveTasks=2,numOfTeams=0,status="TEST"  };
			int competitionID = MainManager.Instance.competitionsManager.createCompetition(TestCompetition);
			MainManager.Instance.userEntities.setManagers(users, competitionID);
			bool CheckIfManager = MainManager.Instance.userEntities.checkIfUserIsCompetitionManager(userId,competitionID.ToString());
			Assert.True(CheckIfManager, "Sould be Equal");
		}
		*/

	}
}
