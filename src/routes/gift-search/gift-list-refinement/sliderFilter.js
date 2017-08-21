import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

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
  marks: {[string]: string | React.Element<*>};
  topLimit: number;
  step: number;

  constructor(props: FilterPriceRangeProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
      '50': '',
      '100': '100€',
      '250': '250€'
    };

    if(nextTopLimit >= 300)
      this.marks[nextTopLimit] = `${nextTopLimit}€`;
  }

  getTopLimit(maxValue: number){
    return Math.ceil(maxValue / this.step) * this.step;
  }

  handleChange(){
    const [minValue, maxValue] = this.state.value;
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
	}
}

export default
connect(mapStateToProps, mapDispatchToProps)(FilterPriceRange);
