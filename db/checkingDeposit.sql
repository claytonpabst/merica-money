update memberAccounts
set balance = $2
where acctnum = $1 and accounttype = 'checking'
returning *