import React, { Component } from 'react';

class DeleteAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gifToDisplay: ''
        }
        
        //bind stuff here
    }


    render() {


        return (
            <section>
                <h1>Once a member, always a member. Jk, just try back soon and you'll be</h1>
                <h1>able to delete your account.</h1>
            </section>
        )
    }

}

export default DeleteAccount;