create procedure ChooseTask @TEAMID int,@COMPETITIONID int,@TASKID int,@TIMEFRAME int
as

if (( select count(Status)
  from [Active Tasks]
  where teamID = @TEAMID and Status = 'In Progress') < (  select [max active Tasks] from Competitions where id=@COMPETITIONID))
  and  (select count(taskID) from [Active Tasks] where taskID = @TASKID and teamID = @TEAMID ) < (1)
  insert into [Active Tasks] values (@TEAMID,@COMPETITIONID,@TASKID,GETDATE(),DATEADD(minute,@TIMEFRAME,GETDATE()),'1990-01-01 00:00','In Progress',0,'')

  else select null 
  go

  exec ChooseTask @TEAMID = , @COMPETITIONID =, @TASKID = ,@TIMEFRAME =