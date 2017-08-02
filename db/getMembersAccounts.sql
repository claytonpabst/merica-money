select * from members join memberAccounts
on members.acctNum = memberAccounts.acctNum
where members.acctNum = $1