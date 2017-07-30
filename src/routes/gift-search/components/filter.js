// @flow

import React, { Component } from 'react';
import { Radio } from 'semantic-ui-react';



const Filter = (props) => {

  const handleChange = () => {
    if(props.filterState === props.filterForValue)
      props.resetFilters([props.filterName]);
    else
      props.setFilters( {[props.filterName]: props.filterForValue } );
  }  

  return (
    <div>
      <Radio 
        toggle 
        label={props.filterLabel} 
        checked={props.filterState === props.filterForValue}
        onChange={handleChange}
      />
    </div>
  );  

};

export default Filter;