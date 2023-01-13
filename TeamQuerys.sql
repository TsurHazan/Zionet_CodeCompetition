


-- checks if user is in if he is then update his team if he isnt then add insert him with the correct information
DECLARE @CompetitionID INT = 4,
        @UserID varchar(max) = '582427FB-9',
        @TeamID int = 2;
		
 if exists(select * from [Users competitions] where [Competition ID]= @CompetitionID and [UserID] = @UserID)
 BEGIN
    update [Users competitions] set [TeamID] = @TeamID
	where( [Competition ID] = @CompetitionID) and ([UserID] like @UserID)
END
ELSE
BEGIN
    INSERT INTO [Users competitions] values (@UserID,0, @TeamID, @CompetitionID)
END;


