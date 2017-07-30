import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Teller.css';

class Teller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMembers: [],
            firstNames: [],
            acctInput: '',
            member: ''
        }

        this.getAllMembers = this.getAllMembers.bind(this);
        this.handleAcctInput = this.handleAcctInput.bind(this);
        this.getMember = this.getMember.bind(this);

    }

    handleAcctInput(e){
        this.setState({
            acctInput: e.target.value
        })
    }

    getAllMembers(){
        axios.get('/api/members')
        .then( res => {
            let firstNames = []
            res.data.map((item) => {
                firstNames.push(item.mbrfirstname)
            })

            this.setState({
                allMembers: res.data,
                firstNames: firstNames
            })
        })
    }

    getMember(){
        axios.get(`/api/getMember/${this.state.acctInput}`)
        .then( res => {
            this.setState({
                member: res.data
            })
        })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.member)}
                <br/>
                {this.state.firstNames.map((name, index) => {
                    return name
                })}
                <br/>   
                This is the Teller's Page
                <button onClick={ this.getAllMembers }>Get All Members</button>
                <input type="text" placeholder='enter acct num' onChange={this.handleAcctInput}/>
                <button onClick={ this.getMember }>Submit</button>
            </div>
        );
    }
}

export default Teller;