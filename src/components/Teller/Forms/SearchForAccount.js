import React, { Component } from 'react';
import axios from 'axios';

class SearchForAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastNameSearchResults: [],
            searchList: ''
        }
        this.getMemberByLastName = this.getMemberByLastName.bind(this)
        //bind stuff here
    }

    getMemberByLastName(){
        axios.get(`/api/getMemberByLastName/${this.props.lastNameInput}`)
        .then( res => {
            this.setState({
                lastNameSearchResults: res.data
            })
        })        
    }

    render() {

        let searchList = 'Search Results:'
        if(this.state.lastNameSearchResults.length > 0) {
            searchList = this.state.lastNameSearchResults[0].acctnum
        }


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
                <div className="searchForAccountLastNameResults" >
                    <ul className='searchForAccountLastNameResultsHeader'>
                        <li className='lineOfThree'>Member:</li>
                        <li className='lineOfThree'>Account:</li>
                        <li className='lineOfThree'>Member SSN:</li>
                    </ul>
                    {this.state.lastNameSearchResults.map((member, i) =>{
                        return  <div>
                                    <p value={member.acctnum} 
                                        onClick={() => this.props.getMember(member.acctnum)}
                                        className='searchForAccountLastNameResultsList'
                                        >
                                            <li className='lineOfThree'>{member.mbrfirstname + ' ' + member.mbrlastname}</li>
                                            <li className='lineOfThree'>{member.acctnum}</li>
                                            <li className='lineOfThree'>{member.mbrssn}</li>
                                    </p>

                                </div>
                    })}
                    {/*{ searchList }*/}
                </div>
            </section>
        )
    }

}

export default SearchForAccount;