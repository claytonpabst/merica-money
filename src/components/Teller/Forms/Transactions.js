import React, { Component } from 'react';
import axios from 'axios';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountInput: 0
        }
        this.handleAmountInput = this.handleAmountInput.bind(this);
        //bind stuff here
    }

    handleAmountInput(e) {
        this.setState ({
            amountInput: parseFloat(e.target.value)
        })
        // console.log(this.state.amountInput)
    }

    render() {

        return (
            <section> 

                <br/>
                <h1>Transaction Type: </h1> 
                <select name="transactionType" id='transactionType'>
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                    {/*<option value="transfer">Transfer</option>*/}
                </select>

                <br/>
                <br/>

                <h1>Account: </h1>
                <select name="account" id='account'>
                    <option value="saving1">Savings 1</option>
                    <option value="checking">Checking</option>
                </select>

                <br/>
                <br/>

                <h1>Amount: </h1>
                <input placeholder='enter amount of cash' type="text" onChange={ this.handleAmountInput }/>

                <br/>
                <br/>

                <button onClick={ () => { this.props.deposit(this.state.amountInput) }}>Submit</button>

            </section>
        )
    }

}

export default Transactions;