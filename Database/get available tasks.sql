

CREATE PROCEDURE SelectAvailableTasks @TEAMID int,@COMPETITIONID int
AS
if ( select count(Status)
  from [Active Tasks]
  where teamID = @TEAMID and Status = 'In Progress') < (  select [max active Tasks] from Competitions where id=@COMPETITIONID)
SELECT  *
FROM [CompetitionsProject].[dbo].[Tasks]
where id  not in ( SELECT [taskID]    
FROM [CompetitionsProject].[dbo].[Active Tasks]
where teamID = @TEAMID ) and competitionID = @COMPETITIONID
else select null
GO

exec SelectAvailableTasks @TEAMID=2,@COMPETITIONID=2