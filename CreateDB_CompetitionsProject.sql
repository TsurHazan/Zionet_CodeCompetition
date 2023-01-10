CREATE TABLE "Users"(
    "id" NVARCHAR(255) NOT NULL,
    "Email" NVARCHAR(80) NOT NULL,
    "name" NVARCHAR(50) NOT NULL
);
ALTER TABLE
    "Users" ADD CONSTRAINT "users_id_primary" PRIMARY KEY("id");
CREATE TABLE "Teams"(
    "id" INT identity NOT NULL,
    "Name" NVARCHAR(20) NOT NULL,
    "Points" INT NOT NULL,
    "email" NVARCHAR(80) NOT NULL,
    "Icon (IMAGE)" NVARCHAR(255) NOT NULL,
    "CompetitionID" INT NOT NULL
);
ALTER TABLE
    "Teams" ADD CONSTRAINT "teams_id_primary" PRIMARY KEY("id");
CREATE  INDEX "teams_competitionid_" ON
    "Teams"("CompetitionID");
CREATE TABLE "Competitions"(
    "id" INT identity NOT NULL,
    "Start" DATETIME NOT NULL,
    "End" DATETIME NOT NULL,
    "numOfTeams" INT NOT NULL,
    "status" NVARCHAR(20) NOT NULL,
    "Name" NVARCHAR(30) NOT NULL,
    "hashcode" NVARCHAR(255) NOT NULL,
    "max active Tasks" INT NOT NULL
);
ALTER TABLE
    "Competitions" ADD CONSTRAINT "competitions_id_primary" PRIMARY KEY("id");
CREATE TABLE "Tasks"(
    "id" INT identity NOT NULL,
    "CompetitionID" INT NOT NULL,
    "CategoryID" INT NOT NULL,
    "Timeframe(minutes)" INT NOT NULL,
    "points" INT NOT NULL,
    "Description" NVARCHAR(255) NOT NULL,
    "Bonus points" INT NOT NULL,
    "Bonus Time(minutes)" INT NOT NULL,
    "name" NVARCHAR(100) NOT NULL
);
ALTER TABLE
    "Tasks" ADD CONSTRAINT "tasks_id_primary" PRIMARY KEY("id");
CREATE  INDEX "tasks_competitionid_" ON
    "Tasks"("CompetitionID");
CREATE  INDEX "tasks_categoryid_" ON
    "Tasks"("CategoryID");
CREATE TABLE "Active Tasks"(
    "id" INT identity NOT NULL,
    "teamID" INT NOT NULL,
    "competitionID" INT NOT NULL,
    "taskID" INT NOT NULL,
    "start time" DATE NOT NULL,
    "end time" DATE NOT NULL,
    "Status" NVARCHAR(20) NOT NULL,
    "bonus" BIT NOT NULL,
    "git repo" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "Active Tasks" ADD CONSTRAINT "active tasks_id_primary" PRIMARY KEY("id");
CREATE  INDEX "active tasks_teamid_" ON
    "Active Tasks"("teamID");
CREATE  INDEX "active tasks_competitionid_" ON
    "Active Tasks"("competitionID");
CREATE  INDEX "active tasks_taskid_" ON
    "Active Tasks"("taskID");
CREATE TABLE "Categories"(
    "id" INT identity NOT NULL,
    "name" NVARCHAR(50) NOT NULL
);
ALTER TABLE
    "Categories" ADD CONSTRAINT "categories_id_primary" PRIMARY KEY("id");
CREATE TABLE "Active task Participants"(
    "id" INT identity NOT NULL,
    "userID" NVARCHAR(255) NOT NULL,
    "active task ID" INT NOT NULL
);
ALTER TABLE
    "Active task Participants" ADD CONSTRAINT "active task participants_id_primary" PRIMARY KEY("id");
CREATE  INDEX "active task participants_userid_" ON
    "Active task Participants"("userID");
CREATE  INDEX "active task participants_active task id_" ON
    "Active task Participants"("active task ID");
CREATE TABLE "Users competitions"(
    "UserID" NVARCHAR(255) NOT NULL,
    "Admin" BIT NOT NULL,
    "TeamID" INT NOT NULL,
    "Competition ID" INT NOT NULL
);
CREATE  INDEX "users competitions_userid_" ON
    "Users competitions"("UserID");
CREATE  INDEX "users competitions_teamid_" ON
    "Users competitions"("TeamID");
CREATE  INDEX "users competitions_competition id_" ON
    "Users competitions"("Competition ID");
ALTER TABLE
    "Teams" ADD CONSTRAINT "teams_competitionid_foreign" FOREIGN KEY("CompetitionID") REFERENCES "Competitions"("id");
ALTER TABLE
    "Tasks" ADD CONSTRAINT "tasks_categoryid_foreign" FOREIGN KEY("CategoryID") REFERENCES "Categories"("id");
ALTER TABLE
    "Tasks" ADD CONSTRAINT "tasks_competitionid_foreign" FOREIGN KEY("CompetitionID") REFERENCES "Competitions"("id");
ALTER TABLE
    "Active Tasks" ADD CONSTRAINT "active tasks_teamid_foreign" FOREIGN KEY("teamID") REFERENCES "Teams"("id");
ALTER TABLE
    "Active Tasks" ADD CONSTRAINT "active tasks_competitionid_foreign" FOREIGN KEY("competitionID") REFERENCES "Competitions"("id");
ALTER TABLE
    "Active Tasks" ADD CONSTRAINT "active tasks_taskid_foreign" FOREIGN KEY("taskID") REFERENCES "Tasks"("id");
ALTER TABLE
    "Users competitions" ADD CONSTRAINT "users competitions_competition id_foreign" FOREIGN KEY("Competition ID") REFERENCES "Competitions"("id");
ALTER TABLE
    "Users competitions" ADD CONSTRAINT "users competitions_userid_foreign" FOREIGN KEY("UserID") REFERENCES "Users"("id");
ALTER TABLE
    "Users competitions" ADD CONSTRAINT "users competitions_teamid_foreign" FOREIGN KEY("TeamID") REFERENCES "Teams"("id");
ALTER TABLE
    "Active task Participants" ADD CONSTRAINT "active task participants_active task id_foreign" FOREIGN KEY("active task ID") REFERENCES "Active Tasks"("id");
ALTER TABLE
    "Active task Participants" ADD CONSTRAINT "active task participants_userid_foreign" FOREIGN KEY("userID") REFERENCES "Users"("id");


	--init tables
insert into [Competitions] values('','',0,'init','managersInit','',0)
insert into [Teams] values('competitionManagers',0,'','',1)