//@flow

import type { GiftCollection, Dispatch, RouterMatch } from 'modules/actions/types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import * as lunrHelper from 'modules/gift-search/helpers/lunr';
import { Search } from 'semantic-ui-react'
import debounce from 'lodash.debounce';

type GiftListSearchProps = {
  giftCollection: GiftCollection,
  giftListFiltered: GiftCollection,
  match: RouterMatch,
};

export
class GiftListSearchContainer extends PureComponent{
	props: GiftListSearchProps;
	lunrIndex: Object;
  searchValue: string;
	state: {giftsMatched: Array<Object>};

	constructor(props: GiftListSearchProps) {
    super(props);
    this.numberToShow = 5;
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleResultSelected = this.handleResultSelected.bind(this);
    this.state={giftsMatched: []};
    this.searchValue = '';
	}

  componentDidMount() {
		if(this.props.giftCollection.length > 0)
  		this.getIndex(this.props.match.params.universe, this.props.giftCollection);
  }

  componentWillReceiveProps(nextProps: GiftListSearchProps){
  	const universe = this.props.match.params.universe;
  	const nextUniverse = nextProps.match.params.universe;
  	if(this.props.giftCollection !== nextProps.giftCollection && nextProps.giftCollection.length  > 0 )
      this.getIndex(nextUniverse, nextProps.giftCollection);
  }

  getIndex(universe: string, giftCollection: GiftCollection){
    lunrHelper.getIndex(universe, giftCollection)
      .then( index => {this.lunrIndex = index; console.log(universe, this.lunrIndex);})
      .catch( e => console.log('failed loading the index'));    
  }

  searchIndex(value: string){
    if(this.lunrIndex === undefined || value.length < 3)
      return;

		const results = lunrHelper.searchIndex(value, this.lunrIndex);console.log(results);
  	this.resultsIds = lunrHelper.getResultsIds(results);
  	const giftsMatched = this.setResults(this.resultsIds);
    this.setState({giftsMatched});
  }

  setResults(resultsIds: Array<mixed>){
  	const results = [];
		for(let i = 0, length = resultsIds.length ; i < length && i < this.numberToShow; i++){
				const refObject = this.props.giftListFiltered.find(element => element.id === resultsIds[i]);
				if(refObject !== undefined){
					const resultObject = {
            'key': resultsIds[i],
            "id": resultsIds[i],
						"title": refObject.name,
						"price": refObject.price,
						"image": refObject.img
					};
					results.push(resultObject);
				}
		}
    return results;
  }

  handleChange(e: SyntheticEvent, data: Object){
    this.searchValue = data.value;
		this.searchIndex(data.value);
  }

  handleResultSelected(e: SyntheticEvent, data: Object){
  	const {id} = data.result;
  	this.resultsIds.splice(this.resultsIds.indexOf(id), 1);
  	this.resultsIds.unshift(id);
  	this.props.setFilters({elasticSearch: this.resultsIds});
  	this.props.setOrder(this.resultsIds);
  }

  handleFocus(){
    this.setState({giftsMatched: []});
    this.props.resetFilters(['elasticSearch']);
    this.props.setOrder('');
    this.searchIndex(this.searchValue);
  }

  render(){
  	return (
  		<div>
  			<Search 
          input={{ icon: 'search', iconPosition: 'left', fluid: true }}
  				fluid 
  				placeholder='Restaurant, Paris ...' 
  				onSearchChange={debounce(this.handleChange, 250)}
  				onResultSelect={this.handleResultSelected}
          onFocus={this.handleFocus}
  				showNoResults={false}
  				results={this.state.giftsMatched}
  			/>
  		</div>
  	);
  }
}


//store Connection
type OwnProps = { match: RouterMatch };
const mapStateToProps = (state: Object, ownProps: OwnProps): Object => {
  const giftCollection = selectors.getList(state);
  const giftListFiltered = selectors.getFilteredList(state);
  const {match} = ownProps;

	return {
		giftCollection,
		giftListFiltered,
    match
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		setFilters: (filters: Filters) => dispatch(actions.setFilters(filters)),
		resetFilters: (filters: Array<string>) => dispatch(actions.resetFilters(filters)),
		setOrder: (order: Array<mixed>) => dispatch(actions.setOrder(order))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftListSearchContainer));
