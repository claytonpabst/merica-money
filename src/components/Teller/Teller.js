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
            member: '',
            membersAccounts: []
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
                member: res.data[0]
            })
        console.log(this.state.member)
        })
        axios.get(`/api/getMembersAccounts/${this.state.acctInput}`)
        .then( res => {
            this.setState({
                membersAccounts: res.data
            })
        console.log(res.data)
        })
    }

    render() {
        return (
            <section className='tellerMain'>
                <header className='tellerHeader'>
                    <img src="img/mericaMoneyLogo.jpg" className='logoPicture'/>
                    <div className='acctInfoParent'>
                        <h1>{JSON.stringify(this.state.membersAccounts)}</h1>
                    </div>
                    <div className='memberStaticInfo'>
                        <h1>{this.state.member.mbrfirstname}Hello</h1>
                    </div>
                </header>
                <header className='tellerSideNav'></header>
                <div className='tellerContentMain'>
                    <div className='tellerContentInner'>
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
                    <header className='tellerToolsWords'>TELLER-TOOLS</header>
                </div>
            </section>
        );
    }
}

export default Teller;