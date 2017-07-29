import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Teller.css';

class Teller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMembers: []
        }

        this.getAllMembers = this.getAllMembers.bind(this);

    }

    getAllMembers(){
        axios.get('/api/Members')
        .then( res => {
            console.log(res)
            this.setState({
                allMembers: res.data
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.allMembers}       
                This is the Teller's Page
                <button onClick={ this.getAllMembers }>Get All Members</button>
            </div>
        );
    }
}

export default Teller;