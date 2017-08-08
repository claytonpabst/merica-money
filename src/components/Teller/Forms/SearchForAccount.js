import React, { Component } from 'react';
import axios from 'axios';

class SearchForAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastNameSearchResults: []
        }
        this.getMemberByLastName = this.getMemberByLastName.bind(this)
        //bind stuff here
    }

    getMemberByLastName(){
        console.log(this.props.lastNameInput)
        axios.get(`/api/getMemberByLastName/${this.props.lastNameInput}`)
        .then( res => {
            this.setState({
                lastNameSearchResults: res.data
            })
            console.log(res.data)
        })        
    }

    render() {
        return (
            <section>
                {/*{JSON.stringify(this.state.member)}*/}
                {/*<br/>*/}
                {/*{this.state.firstNames.map((name, index) => {
                    return name
                })}*/}
                Search Account Number
                <br/>   
                <input type="text" placeholder='enter acct number' onChange={this.props.handleAcctInput}/>
                <button onClick={ this.props.getMember }>Submit</button>
                <br/>
                <br/>
                Search Last Name
                <br/>
                <input type="text" placeholder='enter last name' onChange={this.props.handleLastNameInput}/>
                <button onClick={ this.getMemberByLastName }>Submit</button>
                <div className="searchForAccountLastNameResults">
                    {JSON.stringify(this.state.lastNameSearchResults)}
                </div>
            </section>
        )
    }

}

export default SearchForAccount;