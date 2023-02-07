


-- checks if user is in if he is then update his team if he isnt then add insert him with the correct information
DECLARE @CompetitionID INT = 2,
        @UserID varchar(max) = 'google-oauth2|108910326240003987025',
        @TeamID int = 2;
		
		select * from [Users competitions]
		update [Users competitions] set TeamID = 1 where [Users competitions].Admin = 0
		select * from [Users competitions]

 if exists(select * from [Users competitions] where [Competition ID]= @CompetitionID and [UserID] = @UserID)
 BEGIN
    update [Users competitions] set [TeamID] = @TeamID
	where( [Competition ID] = @CompetitionID) and ([UserID] like @UserID)
END
ELSE
BEGIN
    INSERT INTO [Users competitions] values (@UserID,0, @TeamID, @CompetitionID)
END;


