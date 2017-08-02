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
            membersAccounts: [],
            savingsOneAccountType: undefined,
            savingsOneBalance: undefined,
            savingsOneAvailableBalance: undefined,
            savingsOneDateOpened: undefined,
            checkingAccountType: undefined,
            checkingBalance: undefined,
            checkingAvailableBalance: undefined,
            checkingDateOpened: undefined
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
                membersAccounts: res.data,
                savingsOneAccountType: res.data[0].accounttype,
                savingsOneBalance: res.data[0].balance,
                savingsOneAvailableBalance: res.data[0].availablebalance,
                savingsOneDateOpened: res.data[0].opendate,
                checkingAccountType: res.data[1].accounttype,
                checkingBalance: res.data[1].balance,
                checkingAvailableBalance: res.data[1].availablebalance,
                checkingDateOpened: res.data[1].opendate
            })
        console.log(res.data)
        console.log(this.state)
        })
    }

    render() {
        return (
            <section className='tellerMain'>
                <header className='tellerHeader'>
                    <img src="img/logoGrey.jpg" className='logoPicture'/>
                    <div className='acctInfoParent'>
                        {/*<h1>{JSON.stringify(this.state.membersAccounts)}</h1>*/}
                        <table className="accountsTable">
                            <tbody>
                                <tr className="accountsRowOne">
                                    <th>Account:</th>
                                    <th>Balance:</th>
                                    <th>Available Balance:</th>
                                    <th>Date Opened:</th>                                   
                                </tr>
                                <tr className="accountsRowTwo">
                                    <td>{this.state.savingsOneAccountType}</td>
                                    <td>{this.state.savingsOneBalance}</td>
                                    <td>{this.state.savingsOneAvailableBalance}</td>
                                    <td>{this.state.savingsOneDateOpened}</td>                                  
                                </tr> 
                                <tr className="accountsRowThree">
                                    <td>{this.state.checkingAccountType}</td>
                                    <td>{this.state.checkingBalance}</td>
                                    <td>{this.state.checkingAvailableBalance}</td>
                                    <td>{this.state.checkingDateOpened}</td>                                  
                                </tr> 
                            </tbody>    
                        </table>                                              
                    </div>
                    <div className='memberStaticInfo'>
                        <h2>Member:{this.state.member.mbrfirstname} {this.state.member.mbrmiddlename} {this.state.member.mbrlastname}</h2>
                        <br/>
                        <h2>Account Number:{this.state.member.acctnum}</h2>
                    </div>
                </header>
                <header className='tellerSideNav'></header>
                <div className='tellerContentMain'>
                    <div className='tellerContentInner'>
                        {/*{JSON.stringify(this.state.member)}*/}
                        <br/>
                        {/*{this.state.firstNames.map((name, index) => {
                            return name
                        })}*/}
                        Search account number
                        <br/>   
                        {/*<button onClick={ this.getAllMembers }>Get All Members</button>*/}
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