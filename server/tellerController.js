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

    getMembersAccounts: function(req, res){
        const db = req.app.get('db');
        db.getMembersAccounts([req.params.acctInput])
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
        const db = req.app.get('db');
        let sum = req.body.depositAmount + req.body.balance;
        // let balance = 0
        // db.getBalance([req.params.accountNumber])
        // .then( bal => {
        //     balance = bal + req.body.depositAmount;
        // })
        db.depositStepOne([req.params.accountNumber, sum])
        .then ( results => {
            console.log(results);
            return res.status(200).send( results )
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