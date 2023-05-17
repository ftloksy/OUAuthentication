import React, { Component } from 'react';

class UserRoleSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRolesPool: [],
      choiceUserRole: ''
    };
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  componentDidMount() {
    this.fetchDiv();
  }

  async fetchDiv() {
    fetch('/login/getuserroles')
    .then(response => {
      if (!response.ok){
        throw Error(response.statusText);
      }
      response.json().then( userroles => {
        let userRolesPool = [{_id: "", name: ""}];
        userroles.forEach( ur => {
          userRolesPool.push(ur);
        })
        this.setState( { userRolesPool: userRolesPool } );
        console.log( userRolesPool );
      })
    })
  }

  handleInputSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.choiceUserRole);
    console.log(this.state.choiceUserRole);
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, id, value } = event.target;
    if ( name === "ur" && value ) {
      this.setState({choiceUserRole: value});
    }
  }

  render() {
      const { userRolesPool } = this.state ;
      return (
        <form onSubmit={this.handleInputSubmit}>
          <label for="ur">Choose a User Roles</label>
          <select name="ur"
            id="userroles" onChange={this.handleInputChange}>
            {userRolesPool.map(ur => (
              <option value={ur._id}>{ur.role}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      );
  }
}

export default UserRoleSelecter;
