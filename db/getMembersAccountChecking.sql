select * from Members join memberAccounts
on members.acctnum = memberaccounts.acctnum
where members.acctnum = $1 and memberAccounts.accounttype = 'checking'