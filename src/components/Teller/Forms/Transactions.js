import React, { Component } from 'react';
import axios from 'axios';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountInput: 0,
            transactionType: 'Deposit',
            accountType: 'Savings'
        }

        this.handleAmountInput = this.handleAmountInput.bind(this);
        this.handleTransactionType = this.handleTransactionType.bind(this);
        this.handleAccountType = this.handleAccountType.bind(this);
        //bind stuff here
    }

    handleAmountInput(e) {
        this.setState ({
            amountInput: parseFloat(e.target.value)
        })
        // console.log(this.state.amountInput)
    }

    handleTransactionType(e) {
        this.setState({
            transactionType: e
        })
    }

    handleAccountType(e) {
        this.setState({
            accountType: e
        })
    }

    render() {

        return (
            <section> 

                <br/>
                <h1>Transaction Type: </h1> 
                <select value={this.state.transactionType} name="transactionType" id='transactionType' onChange={ (e) => this.handleTransactionType(e.target.value)}>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdrawal">Withdrawal</option>
                    {/*<option value="transfer">Transfer</option>*/}
                </select>

                <br/>
                <br/>

                <h1>Account: </h1>
                <select value={ this.state.accountType} name="account" id='account' onChange={(e) => this.handleAccountType(e.target.value)}>
                    <option value="Savings">Savings</option>
                    <option value="Checking">Checking</option>
                </select>

                <br/>
                <br/>

                <h1>Amount: </h1>
                <input placeholder='Enter Amount of Cash' type="text" onChange={ this.handleAmountInput }/>

                <br/>
                <br/>

                <button onClick={ () => { this.props.checkTransactionPlacement(this.state.amountInput, 
                                                                                this.state.accountType, 
                                                                                this.state.transactionType) 
                                                                                }}>Submit</button>

            </section>
        )
    }

}

export default Transactions;