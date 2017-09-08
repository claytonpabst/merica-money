var app = require('./index.js');

module.exports = {

    getAllMembers: function(req, res){
        const db = req.app.get('db');
        db.getAllMembers()
        .then( allMembers => {
            console.log(allMembers)
            return res.status(200).send( allMembers )
        })
        .catch(err => res.status(500).send(err))
    },

    getMember: function(req, res){
        const db = req.app.get('db');
        db.getMember([req.params.acctInput])
        .then( member => {
            return res.status(200).send( member )
        })
    },

    getMembersAccountSavings1: function(req, res){
        const db = req.app.get('db');
        db.getMembersAccountSavings1([req.params.acctInput])
        .then( member => {
            console.log(member)
            return res.status(200).send( member )
        })
    },

    getMembersAccountChecking: function(req, res){
        const db = req.app.get('db');
        db.getMembersAccountChecking([req.params.acctInput])
        .then( member => {
            console.log(member)
            return res.status(200).send( member )
        })
    },

    getMemberByLastName: function(req, res){
        const db = req.app.get('db');
        db.getMemberByLastName([`%${req.params.lastNameInput}%`])
        .then( searchResults => {
            console.log( searchResults )
            return res.status(200).send( searchResults )
        })
    },
    
    deposit: function(req, res){
        console.log(req.body, req.params)
        const db = req.app.get('db');
        // let sum = req.body.depositAmount + req.body.balance;
        let balance = 0.00
        db.getBalance([req.params.accountNumber])
        .then( (bal, err) => {
            console.log(err)
            if ( bal.length ) {
                balance = bal[0].balance + req.body.depositAmount;
                console.log(balance)
                db.deposit([req.params.accountNumber, balance])
                .then ( results => {
                    console.log(results);
                    return res.status(200).send( results )
                })
            }
        })
    },

    checkingDeposit: function(req, res){
        const db = req.app.get('db');
        let balance = 0.00
        db.getCheckingBalance([req.params.accountNumber])
        .then( (bal, err) => {
            if (bal.length) {
                balance = bal[0].balance + req.body.depositAmount;
                db.checkingDeposit([req.params.accountNumber, balance])
                .then ( results => {
                    return res.status(200).send( results ) 
                })
            }
        })
    },
    savingsWithdrawal: function(req, res){
        console.log(req.body, req.params)
        const db = req.app.get('db');
        // let sum = req.body.depositAmount + req.body.balance;
        let balance = 0.00
        db.getBalance([req.params.accountNumber])
        .then( (bal, err) => {
            console.log(err)
            if ( bal.length ) {
                balance = bal[0].balance - req.body.depositAmount;
                console.log(balance)
                db.deposit([req.params.accountNumber, balance])
                .then ( results => {
                    console.log(results);
                    return res.status(200).send( results )
                })
            }
        })
    },
    checkingWithdrawal: function(req, res){
        const db = req.app.get('db');
        let balance = 0.00
        db.getCheckingBalance([req.params.accountNumber])
        .then( (bal, err) => {
            if (bal.length) {
                balance = bal[0].balance - req.body.depositAmount;
                db.checkingDeposit([req.params.accountNumber, balance])
                .then ( results => {
                    return res.status(200).send( results ) 
                })
            }
        })
    }

    // deposit: function(req, res){
    //     const db = req.app.get('db');
    //     let balance = 0
    //     // let final = null
    //     db.getBalance([req.params.accountNumber])
    //     .then( bal => {
    //         db.depositStepOne([req.params.accountNumber, bal + req.body.depositAmount])
    //         .then(results => {
    //             console.log(results);
    //             return res.status(200).send( results );
    //         })
    //     })
        // db.depositStepOne([req.params.accountNumber, balance])
        // .then ( results => {
        //     console.log(results);
        //     return res.status(200).send( results )
        // })
    // }
  
}