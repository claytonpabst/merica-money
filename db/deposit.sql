update memberAccounts
set balance = $2
where acctnum = $1 and accounttype = 'savings1'
returning *