import React, { Component } from 'react';
import axios from 'axios';

class TransactionHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gifToDisplay: ''
        }
        
        //bind stuff here
    }

    componentDidMount () {

        document.body.scrollTop=0;

        var userGifInput = 'check this out'
        axios.get(`http://api.giphy.com/v1/gifs/search?q=${ userGifInput }&api_key=d4ed0114c75c4e4e961030332aaf000a&limit=5`)
        .then( (response) => {
        //   console.log(response)
            this.setState({
                gifToDisplay: response.data.data[0].embed_url
            })
        })
    }

    render() {


        return (
            <section>
                <iframe className='gif' src={ this.state.gifToDisplay }></iframe>
            </section>
        )
    }

}

export default TransactionHistory;