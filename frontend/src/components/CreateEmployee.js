import React, { Component } from 'react';
import SetOuDivGroup from './SetOuDivGroup';
import SetDivGroup from './SetDivGroup';
import OuDivName from './OuDivName';
import DivName from './DivName';

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnitDivsGroup: [],
      orgUnitDivsSelect: false,
      divsGroup: [],
      divsSelect: false
    };
    this.ouDivGroup = this.ouDivGroup.bind(this);
    this.setOuDivsSelect = this.setOuDivsSelect.bind(this);

    this.divGroup = this.divGroup.bind(this);
    this.setDivsSelect = this.setDivsSelect.bind(this);
  };

  ouDivGroup(oudivGroup) {
    this.setState({ orgUnitDivsGroup: oudivGroup });
    this.setOuDivsSelect();
  }

  divGroup(dGroup) {
    this.setState({ divsGroup: dGroup })
    this.setDivsSelect();
  }

  setOuDivsSelect() {
    const select = this.state.orgUnitDivsSelect ;
    this.setState({orgUnitDivsSelect: !select})
  }

  setDivsSelect() {
    const select = this.state.divsSelect ;
    this.setState({divsSelect: !select})
  }

  render() {
      const { orgUnitDivsGroup, orgUnitDivsSelect, 
        divsGroup, divsSelect }  = this.state ;

      return (
        <>
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

          <div id="showdivgroup">
            {divsSelect
              ? <SetDivGroup 
                  onSetDivGroup={(dGroup) => this.divGroup(dGroup)}
                  selectedoudiv={divsGroup}
                />
              : <> 
              {divsGroup.map(dv => (
                <div>
                  <DivName divid={dv} />
                </div>
              ))}
              <br/>
              <button onClick={this.setDivsSelect}>Update</button>
            </>
            }
          </div>
        </>
      );
  }
}

export default CreateEmployee;
