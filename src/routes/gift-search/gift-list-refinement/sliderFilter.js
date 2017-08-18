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

  componentDidMount() {
    this.setNewState(this.props);
  }

  componentWillReceiveProps(nextProps: FilterPriceRangeProps){
    this.setNewState(nextProps);
  }

  setNewState(props: FilterPriceRangeProps){
    let {minPrice, maxPrice} = props.filterState;
    if(minPrice !== this.state.value[0] || maxPrice !== this.state.value[1]){
      minPrice = minPrice === undefined ? 0 : parseInt(minPrice, 10);
      maxPrice = maxPrice === undefined ? this.props.maxValue : parseInt(maxPrice, 10);
      this.setState({value: [minPrice, maxPrice]});
    }    
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
