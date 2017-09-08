select balance from memberAccounts
where acctnum = $1 and accounttype = 'checking'