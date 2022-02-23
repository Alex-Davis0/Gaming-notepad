import React from 'react';
import NavBar from '../components/nav-bar';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: []
    };
  }

  render() {
    return (
    <NavBar />
    );
  }
}

export default Notes;
