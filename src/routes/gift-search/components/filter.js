// @flow weak

import React, { Component } from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

class Filter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }  

  state = {
    checkedA: true,
  };

  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={(event, checked) => this.setState({ checkedA: checked })}
            />
          }
          label={this.props.label}
        />
      </div>
    );
  }
}

export default Filter;