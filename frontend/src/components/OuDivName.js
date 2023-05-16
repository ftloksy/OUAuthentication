import React, { Component } from 'react';

class OuDivSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ouName: "",
        divName: ""
     };
  };

  componentDidMount() {
    this.fetchNames();
  }

  async fetchNames() {
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
  }

  render() {
      const { ouName, divName } = this.state ;
      return (
        <span>Org Unit: {ouName}, Division: {divName}</span>
      );
  }
}

export default OuDivSelecter;
