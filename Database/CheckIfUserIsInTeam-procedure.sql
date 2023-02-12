  
  create procedure CheckIfUserIsInTeam @userID nvarchar(50),@competitionID int,@teamID int
  as
  declare @isInTeam bit
   if exists (select userComp.TeamID from [Competitions] as comp
  inner join [Users competitions] as userComp on userComp.[Competition ID] = comp.id
  where userComp.UserID = @userID and userComp.[Competition ID] = @competitionID and userComp.TeamID = @teamID) 
  select @isInTeam = 1
  else select @isInTeam = 0 
  select @isInTeam
  go

  exec CheckIfUserIsInTeam @userID = , @competitionID = , @teamID = 

