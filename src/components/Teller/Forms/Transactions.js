import React, { Component } from 'react';
import axios from 'axios';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        //bind stuff here
    }


    render() {

        return (
            <section>  
                <h1>Transaction Type: </h1> 
                <select name="transactionType">
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                    <option value="transfer">Transfer</option>
                </select>
                <br/>
                <br/>
                <h1>Account: </h1>
                <select name="Account">
                    <option value="saving1">Savings 1</option>
                    <option value="checking">Checking</option>
                </select>
            </section>
        )
    }

}

export default Transactions;