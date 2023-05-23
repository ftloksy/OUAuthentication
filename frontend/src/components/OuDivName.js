/**
 *  It is a React component 
 * that displays the name of an organization unit (OU) and division. 
 * The component first fetches the name of the OU and division 
 * from the server. When the component receives the names, 
 * it displays them in a span element.
 */
import React, { Component } from 'react';

class OuDivName extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ouName: "",
        divName: ""
     };
     this.fetchNames = this.fetchNames.bind(this);
  };

  componentDidMount() {
    this.fetchNames();
  }

  async fetchNames() {
    // if ( this.props.oudivid ) {
    fetch('/login/getoudivnamebyid/' + this.props.oudivid)
    .then(response => {
      if (!response.ok){
        throw Error(response.statusText);
      }
      response.json().then(names => {
        this.setState( { 
          ouName: names.orgunitsname,
          divName: names.divisionsname
        } );
        console.log( names );
      })
    })
    .catch( err => {
      console.log("Error: ", err.message);
    })
  }

  render() {
      const { ouName, divName } = this.state ;
      return (
        <span> {ouName}, {divName}</span>
      );
  }
}

export default OuDivName;
