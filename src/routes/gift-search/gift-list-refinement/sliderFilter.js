//@flow

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { Dispatch, Filters } from 'modules/actions/types';
import type {Element} from 'react';

const RangeWithTooltip = createSliderWithTooltip(Range);
type FilterPriceRangeProps = {
  maxValue: number,
  setFilters: Function,
  resetFilters: Function,
  filterState: Filters
};

type FilterPriceRangePropsState = {
  value: [number, number]
};
export
class FilterPriceRange extends PureComponent<FilterPriceRangeProps, FilterPriceRangePropsState>{
  marks: {[string]: string | Element<any>};
  topLimit: number;
  step: number;

  constructor(props: FilterPriceRangeProps) {
    super(props);
    ((this:any)).handleChange = this.handleChange.bind(this);
    this.step = 10;
    this.setNewMarks(this.getTopLimit(props.maxValue));
    this.state = {value: [0, this.topLimit]};
  }

  componentWillReceiveProps(nextProps: FilterPriceRangeProps){
    this.setNewMarks(this.getTopLimit(nextProps.maxValue));
    this.setNewState(nextProps);
  }

  setNewState(props: FilterPriceRangeProps){
    let {minPrice, maxPrice} = props.filterState;
    if(minPrice === this.state.value[0] && maxPrice === this.state.value[1])
      return;

    minPrice = minPrice === undefined ? 0 : parseInt(minPrice, 10);
    maxPrice = maxPrice === undefined ? this.topLimit : parseInt(maxPrice, 10);
    this.setState({value: [minPrice, maxPrice]});      
  }

  setNewMarks(nextTopLimit: number){
    if(this.topLimit === nextTopLimit)
      return;

    this.topLimit = nextTopLimit;
    this.marks = {
      '0': <strong>0€</strong>,
      [nextTopLimit]: <strong>{nextTopLimit}€</strong>
    };

    for(let i = 100; i < nextTopLimit; i += 100 ){
      this.marks[i] = '';
    }
  }

  getTopLimit(maxValue: number){
    return Math.ceil(maxValue / this.step) * this.step;
  }

  handleChange(){
    const [minValue, maxValue] = this.state.value;
    if(minValue === 0 && maxValue === this.topLimit)
      this.props.resetFilters( ['minPrice', 'maxPrice'] );
    else
      this.props.setFilters( {'minPrice': minValue, 'maxPrice': maxValue } );
  }

  render() {
    return(
      <RangeWithTooltip 
        min={0} 
        max={this.topLimit} 
        onChange={value => this.setState({ value })} 
        onAfterChange={this.handleChange} 
        value={this.state.value} 
        marks={this.marks}
        step={this.step}
        allowCross={false}
        tipFormatter={value => `${value}€`}
        defaultValue={[0, this.props.maxValue]}
      />
    );
  };  
};


//Store connection
const mapStateToProps = (state: Object): Object => {
  const filterState = selectors.getAllFilters(state);
  const maxValue = selectors.getHightestPrice(state);

	return {
    filterState,
    maxValue
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		setFilters: (filters: Filters) => dispatch(actions.setFilters(filters)),
    resetFilters: (filters: Array<string>) => dispatch(actions.resetFilters(filters))
	}
}

export default
connect(mapStateToProps, mapDispatchToProps)(FilterPriceRange);
