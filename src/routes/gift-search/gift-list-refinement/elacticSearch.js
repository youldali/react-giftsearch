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
	resultsIds: Array<mixed>;
	state: {results: Array<Object>};

	constructor(props: GiftListSearchProps) {
    super(props);
    this.numberToShow = 5;
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleResultSelected = this.handleResultSelected.bind(this);
    this.state={results: []};
	}

  componentDidMount() {
		if(this.props.giftCollection.length > 0)
  		this.lunrIndex = lunrHelper.getIndex(this.props.giftCollection, this.props.match.params.universe);  	
  }

  componentWillReceiveProps(nextProps: GiftListSearchProps){
  	const universe = this.props.match.params.universe;
  	const nextUniverse = nextProps.match.params.universe;
  	if(nextProps.giftCollection.length > 0 )
  		this.lunrIndex = lunrHelper.getIndex(nextProps.giftCollection, nextUniverse);
  }

  searchIndex(value: string){
		const results = lunrHelper.searchIndex(value, this.lunrIndex);
  	this.resultsIds = lunrHelper.getResultsIds(results);
  	this.setResults(this.resultsIds);
  }

  setResults(resultsIds: Array<mixed>){
  	const results = [];
		for(let i = 0, length = resultsIds.length ; i < length && i <= this.numberToShow; i++){
				const refObject = this.props.giftListFiltered.find(element => element.id === resultsIds[i]);
				if(refObject !== undefined){
					const resultObject = {
            'key': parseInt(resultsIds[i], 10),
						"title": refObject.name,
						"price": refObject.price,
						"image": refObject.img,
            "id": resultsIds[i]
					};
					results.push(resultObject);
				}
		}
		this.setState({results});
  }

  handleChange(e: SyntheticEvent, data: Object){
  	const {value} = data;
  	if(value.length > 2)
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
    this.props.resetFilters(['elasticSearch']);
  }

  render(){
  	return (
  		<div>
  			<Search 
  				icon='search' 
  				fluid 
  				placeholder='Restaurant, Paris ...' 
  				onSearchChange={debounce(this.handleChange, 250)}
  				onResultSelect={this.handleResultSelected}
          onFocus={this.handleFocus}
  				showNoResults={false}
  				results={this.state.results}
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
