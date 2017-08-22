//@flow

import type { GiftCollection, Dispatch, RouterMatch } from 'modules/actions/types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectors } from 'modules/gift-search/index';
import {setFilters as setFiltersAction, resetFilters as resetFiltersAction} from 'modules/actions/giftListSearchSorting';
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

	constructor(props: GiftListSearchProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state={results: []};
	}

  componentDidMount() {
  	
  }

  componentWillReceiveProps(nextProps: GiftListSearchProps){
  	if(nextProps.giftCollection.length > 0)
  		this.createIndex(nextProps.giftCollection);

    //if(this.props.match.params.universe !== nextProps.match.params.universe)  
  }

  createIndex(giftCollection: GiftCollection){
  	this.lunrIndex = lunrHelper.createIndex(giftCollection);
  }

  searchIndex(value: string){
		const results = lunrHelper.searchIndex(value, this.lunrIndex);
  	const resultsIds = lunrHelper.getResultsIds(results);
  	this.props.setFilters({elasticSearch: resultsIds});


  	this.getResults(resultsIds);
  	console.log(results, resultsIds);
  }

  getResults(resultsIds: Array<mixed>){
  	const results = [];
		for(let i = 0, length = resultsIds.length ; i < length && i < 5; i++){
				const refObject = this.getGiftById(resultsIds[i], this.props.giftCollection);
				const resultObject = {
					"title": refObject.name,
					"price": refObject.price,
					"image": refObject.img,
					'id': resultsIds[i]
				};
				results.push(resultObject);
		}  
		this.setState({results})
		console.log('results', this.state);
  }

  getGiftById(id, collection){
  	return collection.find( element => element.id === id) 
  }

  resetFilter(){
  	this.props.resetFilters(['elasticSearch']);
  }

  handleChange(e: SyntheticEvent, data: Object){
  	const {value} = data;
  	if(value.length > 0)
			this.searchIndex(data.value);
		else
			this.resetFilter();
  }

  render(){
  	return (
  		<div>
  			<Search 
  				icon='search' 
  				fluid 
  				placeholder='Restaurant, Paris ...' 
  				onSearchChange={debounce(this.handleChange, 250)}
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
		setFilters: (filters: Filters) => dispatch(setFiltersAction(filters)),
		resetFilters: (filters: Array<string>) => dispatch(resetFiltersAction(filters))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftListSearchContainer));
