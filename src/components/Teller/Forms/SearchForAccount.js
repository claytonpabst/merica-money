import React, { Component } from 'react';
import axios from 'axios';

class SearchForAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        //bind stuff here
    }

    getMemberByLastName(){
        
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
                {/*<button onClick={ this.getAllMembers }>Get All Members</button>*/}
                <input type="text" placeholder='enter acct number' onChange={this.props.handleAcctInput}/>
                <button onClick={ this.props.getMember }>Submit</button>
                <br/>
                <br/>
                Search Last Name
                <br/>
                <input type="text" placeholder='enter last name' onChange={this.props.handleLastNameInput}/>
                <button onClick={ this.getMemberByLastName }>Submit</button>
                <div className="searchForAccountLastNameResults">
                
                </div>
            </section>
        )
    }

}

export default SearchForAccount;