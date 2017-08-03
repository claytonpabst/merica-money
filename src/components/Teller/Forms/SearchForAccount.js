import React, { Component } from 'react';
import axios from 'axios';

class SearchForAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        //bind stuff here
    }

    render() {
        return (
            <section>
                {/*{JSON.stringify(this.state.member)}*/}
                {/*<br/>*/}
                {/*{this.state.firstNames.map((name, index) => {
                    return name
                })}*/}
                Search account number
                {/*<br/>   */}
                {/*<button onClick={ this.getAllMembers }>Get All Members</button>*/}
                {/*<input type="text" placeholder='enter acct num' onChange={this.handleAcctInput}/>*/}
                {/*<button onClick={ this.getMember }>Submit</button>*/}
            </section>
        )
    }

}

export default SearchForAccount;