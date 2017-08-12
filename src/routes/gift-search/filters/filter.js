//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import { Radio, Menu } from 'semantic-ui-react';
import { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeWithTooltip = createSliderWithTooltip(Range);
export
class FilterPriceRange extends Component{
  state: { value: [number, number] };
  props: {
    maxValue: number,
    setFilters: Function,
  }

  constructor(props: props) {
    super(props);
    this.state = {
      value: [0, this.props.maxValue]
    };

    this.marks = {
      0: <strong>0€</strong>,
      50: '',
      100: '100€',
      250: '250€',
      500: '500€',
      [this.props.maxValue]: `${this.props.maxValue}€`
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    const [minValue, maxValue] = this.state.value;
    this.props.setFilters( {'minPrice': minValue, 'maxPrice': maxValue } );
  }

  render() {
    return(
      <RangeWithTooltip 
        min={0} 
        max={this.props.maxValue} 
        onChange={value => this.setState({ value })} 
        onAfterChange={this.handleChange} 
        value={this.state.value} 
        marks={this.marks}
        step={50}
        allowCross={false}
        tipFormatter={value => `${value}€`}
      />
    );
  };  
};

export
const FilterRadio = (props) => {
  const handleChange = () => {
    if(props.isActive)
      props.resetFilters(Object.keys(props.componentFilters));
    else
      props.setFilters(props.componentFilters);
  }  

  return (
      <Radio 
        toggle 
        label={props.filterLabel} 
        checked={props.isActive}
        onChange={handleChange}
      />
  );  
};


//Store connection
const mapStateToProps = (state, ownProps) => {
	const { componentFilters } = ownProps;
	const isActive = componentFilters === undefined ? false : selectors.areFiltersActive(state, componentFilters);

	return {
		...ownProps,
		isActive
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFilters: (filters) => dispatch(actions.setFilters(filters)),
		resetFilters: (filters) => dispatch(actions.resetFilters(filters))
	}
}

export default
(FilterComponent) => connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
