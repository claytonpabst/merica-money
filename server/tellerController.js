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
    } 
    
  
}