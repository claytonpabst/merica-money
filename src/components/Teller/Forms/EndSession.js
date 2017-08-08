import React, { Component } from 'react';
import axios from 'axios';

class EndSession extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        //bind stuff here
    }


    render() {

        return (
            <section>   
                <br/><h1>Are you sure you want to end session?</h1><br/>
                <button onClick={this.props.endSession}>End Session</button>

            </section>
        )
    }

}

export default EndSession;