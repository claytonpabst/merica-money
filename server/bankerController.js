var app = require('./index.js')

module.exports = {

    createNewMember: function(req, res){
        const db = req.app.get('db');
        let newMember = req.body;
        // console.log(req.params.newMember)
        db.createNewMember([newMember.autoGeneratedAcctNumber,
                            newMember.firstName,
                            newMember.lastName,
                            newMember.middleInitial,
                            newMember.social])
        .then(function(response){
            res.status(200).send(response)
        })
        .catch( (err) => res.status(500).send(err))
    }

}