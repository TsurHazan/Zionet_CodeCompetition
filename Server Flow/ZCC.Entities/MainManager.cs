using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZCC.Models;

namespace ZCC.Entities
{
    public class MainManager
    {
        private MainManager()
        {
            userEntities = new userManager();
            competitionsManager = new CompetitionManager();
            categoriesManager = new CategoriesManager();
            taskManager = new TaskManager();
            teamsManager = new TeamsManager();
            activeTasksManager = new ActiveTasksManager();
            participantsManager = new ParticipantManager();
        }

        private static readonly MainManager _Instance = new MainManager();

        public static MainManager Instance
        { get { return _Instance; } private set { } }

        public userManager userEntities;
        public ParticipantManager participantsManager;
        public CompetitionManager competitionsManager;
        public CategoriesManager categoriesManager;
        public TaskManager taskManager;
        public TeamsManager teamsManager;
        public ActiveTasksManager activeTasksManager;
    }
}