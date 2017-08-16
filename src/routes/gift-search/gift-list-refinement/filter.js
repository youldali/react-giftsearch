//@flow

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import { Radio, Menu } from 'semantic-ui-react';
import { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import type { Filters, Dispatch } from 'modules/actions/types';

const RangeWithTooltip = createSliderWithTooltip(Range);
type FilterPriceRangeProps = {
  maxValue: number,
  setFilters: Function,
  filterState: Filters
};

export
class FilterPriceRange extends PureComponent{
  state: { value: [number, number] };
  props: FilterPriceRangeProps;
  marks: {number: string};

  constructor(props: FilterPriceRangeProps) {
    super(props);
    this.state = {
      value: [0, this.props.maxValue]
    };

    this.marks = {
      '0': <strong>0€</strong>,
      '50': '',
      '100': '100€',
      '250': '250€',
      '500': '500€',
      [this.props.maxValue]: `${this.props.maxValue}€`
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps: FilterPriceRangeProps){
    let {minPrice, maxPrice} = nextProps.filterState;
    if(minPrice !== this.state.value[0] || maxPrice !== this.state.value[1]){
      minPrice = minPrice === undefined ? 0 : minPrice;
      maxPrice = maxPrice === undefined ? this.props.maxValue : maxPrice;
      this.setState({value: [minPrice, maxPrice]});
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.filterState.minPrice === this.state.value[0] && nextProps.filterState.maxPrice === this.state.value[1])
      return false;

    return true;
  }

  handleChange(){
    const [minValue, maxValue] = this.state.value;
    this.props.setFilters( {'minPrice': minValue, 'maxPrice': maxValue } );
  }

  render() {
    console.log('ff');
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
        defaultValue={[0, this.props.maxValue]}
      />
    );
  };  
};


type FilterRadioProps = {
  filterLabel: string,
  isActive: boolean,
  setFilters: Function,
  resetFilters: Function,
  componentFilters: Filters
};
export
const FilterRadio = (props: FilterRadioProps) => {
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
type OwnProps = {componentFilters: Filters};
const mapStateToProps = (state: Object, ownProps: OwnProps): Object => {
	const { componentFilters } = ownProps;
	const isActive = selectors.areFiltersActive(state, Object.keys(componentFilters));
  const filterState = ownProps.passFilterValues === true && selectors.getAllFilters(state);

	return {
		...ownProps,
		isActive,
    ...ownProps.passFilterValues === true && {filterState}
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		setFilters: (filters: Filters) => dispatch(actions.setFilters(filters)),
		resetFilters: (filters: Array<string>) => dispatch(actions.resetFilters(filters))
	}
}

export default
(FilterComponent: React.Element<*>) => connect(mapStateToProps, mapDispatchToProps)(FilterComponent);