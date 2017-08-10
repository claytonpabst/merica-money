import React, { Component } from 'react';
import axios from 'axios';

class CreateNewMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoGeneratedAcctNumber: null,
            firstName: '',
            lastName: '',
            middleInitial: '',
            social: null

        }

        this.generateNewAccountNumber = this.generateNewAccountNumber.bind(this)
        this.firstNameInput = this.firstNameInput.bind(this)
        this.lastNameInput = this.lastNameInput.bind(this)
        this.middleInitialInput = this.middleInitialInput.bind(this)
        this.socialInput = this.socialInput.bind(this)
        this.createNewMember = this.createNewMember.bind(this)       
        //bind stuff here
    }

    generateNewAccountNumber(){
        let min = 1000;
        let max = 9999;
        let newNum = Math.floor(Math.random() * (max - min + 1)) + min;
        this.setState({
            autoGeneratedAcctNumber: newNum
        })
    }

    firstNameInput(e){
        this.setState({
            firstName: e.target.value
        })
    }

    lastNameInput(e){
        this.setState({
            lastName: e.target.value
        })
    }

    middleInitialInput(e){
        this.setState({
            middleInitial: e.target.value
        })
    }

    socialInput(e){
        this.setState({
            social: e.target.value
        })
    }

    createNewMember(){
        let newMember = {
            autoGeneratedAcctNumber: this.state.autoGeneratedAcctNumber,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            middleInitial: this.state.middleInitial,
            social: this.state.social
        }
        console.log(newMember)
        axios.post(`/api/createNewMember`, newMember)
        .then(function(response) {
            console.log(response);
        }) .catch(function (error) {
            console.log(error);
        });
    }

    render() {

        return (
            <section>   
                <h1>Member's Account number: { this.state.autoGeneratedAcctNumber }</h1>
                <button onClick={ this.generateNewAccountNumber }>Get Account Number</button>
                <h1>Member's First Name</h1><br/>
                <input type="text" placeholder="Member's First Name" onChange={ this.firstNameInput }/><br/>
                <h1>Member's Last Name</h1><br/>
                <input type="text" placeholder="Member's Last Name" onChange={ this.lastNameInput }/><br/>
                <h1>Member's Middle Initial</h1><br/>
                <input type="text" placeholder="Member's Middle Initial" onChange={ this.middleInitialInput }/><br/>
                <h1>Member's SSN</h1><br/>
                <input type="text" placeholder="Member's SSN" onChange={ this.socialInput }/><br/>
                <button onClick={ this.createNewMember }>Create New Member</button>
            </section>
        )
    }

}

export default CreateNewMember;