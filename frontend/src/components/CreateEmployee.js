import React, { Component } from 'react';
import SetOuDivGroup from './SetOuDivGroup';
import OuDivName from './OuDivName';

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnitDivsGroup: [],
      orgUnitDivsSelect: false
    };
    this.ouDivGroup = this.ouDivGroup.bind(this);
    this.setOuDivsSelect = this.setOuDivsSelect.bind(this);
  };

  ouDivGroup(oudivGroup) {
    this.setState({ orgUnitDivsGroup: oudivGroup });
    this.setOuDivsSelect();
  }

  setOuDivsSelect() {
    const select = this.state.orgUnitDivsSelect ;
    this.setState({orgUnitDivsSelect: !select})
  }

  render() {
      const { orgUnitDivsGroup, orgUnitDivsSelect }  = this.state ;
      return (
          <div id="showoudivgroup">
            {orgUnitDivsSelect
              ? <SetOuDivGroup 
                  onSetDivGroup={(oudivGroup) => this.ouDivGroup(oudivGroup)}
                  selectedoudiv={orgUnitDivsGroup}
                />
              : <> 
              {orgUnitDivsGroup.map(oudiv => (
                <div>
                  <OuDivName oudivid={oudiv}/>
                </div>
              ))}
              <br/>
              <button onClick={this.setOuDivsSelect}>Update</button>
            </>
            }
          </div>
      );
  }
}

export default CreateEmployee;