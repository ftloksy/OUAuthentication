import React, { Component } from 'react';

class UserRoleSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRolesPool: [],
      choiceUserRole: ''
    };
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
        this.setState( { userRolesPool: userroles } );
        userroles.forEach((ur) => {
          if (ur.role === "Normal") {
            this.setState({ choiceUserRole: ur._id });
            this.props.onSelect(ur._id);
          }
        })
        console.log( userroles );
      })
    })
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, id, value } = event.target;
    if ( name === "ur" && value ) {
      this.setState({choiceUserRole: value});
    }
    this.props.onSelect(value);
  }

  render() {
      const { userRolesPool } = this.state ;
      return (
        <>
          <label for="ur"><h2>Choose a User Roles</h2></label>
          <select name="ur"
            id="userroles" onChange={this.handleInputChange}>
            {userRolesPool.map(ur => (
              <option value={ur._id}>{ur.role}</option>
            ))}
          </select>
        </>
      );
  }
}

export default UserRoleSelecter;
