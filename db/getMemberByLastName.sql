-- select * from members
-- where mbrlastname like $1

SELECT DISTINCT * FROM members WHERE UPPER(mbrlastname) LIKE UPPER($1)