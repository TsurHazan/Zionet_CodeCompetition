
--create competition and return the new competition id
insert into Competitions ([Name],[Start],[End],numOfTeams,[status],hashcode,[max active Tasks])
values('second','2023-11-09 15:45:21','2023-11-11 13:23:44',5,'to-be','aaa',5) 
select COUNT(id) from Competitions 


--create 100 users
INSERT INTO Users (id, name, email)
SELECT
    LEFT(NEWID(), 10) AS id,
    LEFT(NEWID(), 10) AS name,
    LEFT(NEWID(), 10) + '@example.com' AS email
	DECLARE @i INT = 0;

WHILE @i < 5
BEGIN
    INSERT INTO Users (id, name, email)
    SELECT
        LEFT(NEWID(), 10) AS id,
       ('Name ' + CAST(@i AS VARCHAR(255))) AS name,
        LEFT(NEWID(), 10) + '@example.com' AS email
    FROM (VALUES (1)) AS numbers(n);

    SET @i = @i + 1;
END

select COUNT(id) from Competitions

--init tables
insert into [Competitions] values('','',0,'init','managersInit','',0)
insert into [Teams] values('competitionManagers',0,'','',1)