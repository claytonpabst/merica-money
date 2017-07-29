import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';


class Home extends Component {

  render() {
    return (
      <div className="home">

          <Link to='/'>Home</Link>
          <Link to='/banker'>Banker</Link>
          <Link to='/teller'>Teller</Link>
          <Link to='/member'>Member</Link>

      </div>
    );
  }
}

export default Home;