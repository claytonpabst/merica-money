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
            if (response.status === 200) {
                axios.post(`/api/createSavings1/${newMember.autoGeneratedAcctNumber}`)
                .then(function(response2) {
                    if (response2.status === 200) {
                        axios.post(`/api/createChecking`, {
                            accountNumber: newMember.autoGeneratedAcctNumber
                        })
                        .then(function(response3) {
                            if (response3.status === 200) {
                                return alert("New member created successfully")
                            }
                        })
                    }
                })
            }
            console.log(response);
        }) .catch(function (error) {
            console.log(error);
        });
    }

    render() {

        return (
            <section>
                <h1>Hey there! Creating a new member is easy. Simply put in a name and</h1>
                <h1>some mock info and that's all there is to it. Once a member has been</h1>
                <h1>added to the data base, you can do a search by name or account number,</h1>
                <h1>then perform transactions.</h1>
                <br/>
                <h1>Member's Account number: { this.state.autoGeneratedAcctNumber }</h1>
                <button onClick={ this.generateNewAccountNumber }>Get Account Number</button><br/><br/>
                <h1>Member's First Name</h1>
                <input type="text" placeholder="Member's First Name" onChange={ this.firstNameInput }/><br/><br/>
                <h1>Member's Last Name</h1>
                <input type="text" placeholder="Member's Last Name" onChange={ this.lastNameInput }/><br/><br/>
                <h1>Member's Middle Initial</h1>
                <input type="text" placeholder="Member's Middle Initial" onChange={ this.middleInitialInput }/><br/><br/>
                <h1>Member's SSN</h1>
                <input type="text" placeholder="Member's SSN" onChange={ this.socialInput }/><br/><br/>
                <button onClick={ this.createNewMember }>Create New Member</button>
            </section>
        )
    }

}

export default CreateNewMember;