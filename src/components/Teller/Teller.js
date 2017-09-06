import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Teller.css';

import SearchForAccount from './Forms/SearchForAccount'
import Transactions from './Forms/Transactions'
import TransactionHistory from './Forms/TransactionHistory'
import DeleteAccount from './Forms/DeleteAccount'
import EndSession from './Forms/EndSession'
import CreateNewMember from './Forms/CreateNewMember'

class Teller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMembers: [],
            firstNames: [],
            acctInput: '',
            lastNameInput: '',
            member: '',
            membersAccounts: [],
            savingsOneAccountType: null,
            savingsOneBalance: null,
            savingsOneAvailableBalance: null,
            savingsOneDateOpened: null,
            checkingAccountType: '',
            checkingBalance: '',
            checkingAvailableBalance: '',
            checkingDateOpened: '',
            currentContentForm: 1
        }

        this.getAllMembers = this.getAllMembers.bind(this);
        this.handleAcctInput = this.handleAcctInput.bind(this);
        this.getMember = this.getMember.bind(this);
        this.handleLastNameInput = this.handleLastNameInput.bind(this);
        this.changeTellerForm = this.changeTellerForm.bind(this);
        this.endSession = this.endSession.bind(this);
        this.deposit = this.deposit.bind(this);

    }

    handleAcctInput(e){
        // if (Number.isInteger(e.target.value)) {
            this.setState({
                acctInput: e.target.value
            })
        // }
    }

    handleLastNameInput(e){
        this.setState({
            lastNameInput: e.target.value
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

    getMember(mem){
        console.log(mem)
        const num = typeof mem === 'number' ? mem : this.state.acctInput
        console.log(num)

        axios.get(`/api/getMember/${num}`)
        .then( res => {
            if (res.data.length) {
                this.setState({
                    member: res.data[0],
                    currentContentForm: 2
                })
            }
        // console.log(this.state.member)
        })
        
        axios.get(`/api/getMembersAccountChecking/${num}`)
        .then( res => {
            if (res.data.length) {
                this.setState({
                    checkingAccountType: res.data[0].accounttype,
                    checkingBalance: res.data[0].balance,
                    checkingAvailableBalance: res.data[0].availablebalance,
                    checkingDateOpened: res.data[0].opendate.substring(0, 10)
                })
            }
        })

        axios.get(`/api/getMembersAccountSavings1/${num}`)
        .then( res => {
            // console.log(res)
            if (res.data.length) {
                this.setState({
                    membersAccounts: res.data,
                    savingsOneAccountType: res.data[0].accounttype,
                    savingsOneBalance: res.data[0].balance.toFixed(2),
                    savingsOneAvailableBalance: res.data[0].availablebalance,
                    savingsOneDateOpened: res.data[0].opendate.substring(0, 10),
                })
            } else {
                return alert('No member found by that account number, try searching by last name.')
            }
        // console.log(res.data)
        // console.log(this.state)
        })
    }

    deposit(amountInput) {
        console.log(amountInput)
        console.log(this.state.member.acctnum)
        //this.state.member.acctnum is coming in on req.params... the object is coming in on req.body
        axios.put(`/api/deposit/${this.state.member.acctnum}`, {depositAmount: amountInput})
        .then( res => {
            if ( res.data.length ) {
                this.getMember()
            }
            console.log(res)
        })
        // this.setState({
        //     savingsOneBalance: this.state.savingsOneBalance + amountInput
        // })
        // console.log(this.state)
    }

    changeTellerForm(form) {
        this.setState({
            currentContentForm: form
        })
    }

    endSession() {
        this.setState({
            allMembers: [],
            firstNames: [],
            acctInput: '',
            lastNameInput: '',
            member: '',
            membersAccounts: [],
            savingsOneAccountType: null,
            savingsOneBalance: null,
            savingsOneAvailableBalance: null,
            savingsOneDateOpened: null,
            checkingAccountType: '',
            checkingBalance: '',
            checkingAvailableBalance: '',
            checkingDateOpened: '',
            currentContentForm: 1           
        })
    }


    render() {

        let contentFormToShow;
        if (this.state.currentContentForm === 1) {
            contentFormToShow = <SearchForAccount getMember={this.getMember} 
                                                  handleAcctInput={this.handleAcctInput} 
                                                  handleLastNameInput={this.handleLastNameInput}
                                                  pushMemberByLastName={this.pushMemberByLastName}
                                                  lastNameInput={this.state.lastNameInput}
                                                  />
        } else if (this.state.currentContentForm === 2) {
            contentFormToShow = <Transactions deposit={this.deposit}/>
        } else if (this.state.currentContentForm === 3) {
            contentFormToShow = <TransactionHistory />
        } else if (this.state.currentContentForm === 4) {
            contentFormToShow = <DeleteAccount />
        } else if (this.state.currentContentForm === 5) {
            contentFormToShow = <EndSession endSession={this.endSession}/>
        } else if (this.state.currentContentForm === 6) {
            contentFormToShow = <CreateNewMember />
        }

        return (
            <section className='tellerMain'>
                <header className='tellerHeader'>
                    <img src="img/logoGrey.jpg" className='logoPicture'/>
                    <div className='acctInfoParent'>
                        {/*< thisIsTheInfoComponent savingsOneAccountType={this.state.savingsOneAccountType}
                                                savingsOneBalance={this.state.savingsOneBalance}
                                                >*/}
                        {/*<h1>{JSON.stringify(this.state.membersAccounts)}</h1>*/}
                        {/*{this.state.savingsOneAccountType}*/}
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
                                    <td>${this.state.savingsOneBalance}</td>
                                    <td>${this.state.savingsOneAvailableBalance}</td>
                                    <td>{this.state.savingsOneDateOpened}</td>                                  
                                </tr> 
                                <tr className="accountsRowThree">
                                    <td>{this.state.checkingAccountType}</td>
                                    <td>${this.state.checkingBalance}</td>
                                    <td>${this.state.checkingAvailableBalance}</td>
                                    <td>{this.state.checkingDateOpened}</td>                                  
                                </tr> 
                            </tbody>    
                        </table>                                              
                    </div>
                    <div className='memberStaticInfo'>
                        <h2>Member: {this.state.member.mbrfirstname} {this.state.member.mbrmiddlename} {this.state.member.mbrlastname}</h2>
                        <br/>
                        <h2>Account Number: {this.state.member.acctnum}</h2>
                    </div>
                </header>
                <header className='tellerSideNav'>
                    <div className='sideNavOptions' onClick={ () => this.changeTellerForm(1)}>Search For Account</div>
                    <div className='sideNavOptions' onClick={ () => this.changeTellerForm(2)}>Transactions</div>
                    <div className='sideNavOptions' onClick={ () => this.changeTellerForm(3)}>Entertainment</div>
                    <div className='sideNavOptions' onClick={ () => this.changeTellerForm(6)}>Create New Member</div>
                    <div className='sideNavOptions' onClick={ () => this.changeTellerForm(4)}>Delete Account</div>
                    <div className='sideNavOptions' onClick={ () => this.changeTellerForm(5)}>End Session</div>
                </header>
                <div className='tellerContentMain'>
                    <div className='tellerContentInner'>
                        { contentFormToShow }
                        {/*{JSON.stringify(this.state.member)}*/}
                        {/*<br/>*/}
                        {/*{this.state.firstNames.map((name, index) => {
                            return name
                        })}*/}
                        {/*Search account number*/}
                        {/*<br/>   */}
                        {/*<button onClick={ this.getAllMembers }>Get All Members</button>*/}
                        {/*<input type="text" placeholder='enter acct num' onChange={this.handleAcctInput}/>*/}
                        {/*<button onClick={ this.getMember }>Submit</button>*/}
                    </div>
                    <header className='tellerToolsWords'>TELLER-TOOLS</header>
                </div>
            </section>
        );
    }
}

export default Teller;