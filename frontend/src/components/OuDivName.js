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
    // } else {
    //   this.setState( {
    //     ouName: "unknown",
    //     divName: "unknown"
    //   })
    // }
  }

  render() {
      const { ouName, divName } = this.state ;
      return (
        <span> {ouName}, {divName}</span>
      );
  }
}

export default OuDivName;
