//@flow

import type { GiftCollection, Dispatch, RouterMatch } from 'modules/actions/types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectors } from 'modules/gift-search/index';
import {setFilters as setFiltersAction, resetFilters as resetFiltersAction} from 'modules/actions/giftListSearchSorting';
import * as lunrHelper from 'modules/gift-search/helpers/lunr';
import { Input } from 'semantic-ui-react'
import debounce from 'lodash.debounce';

type GiftListSearchProps = {
  giftCollection: GiftCollection,
  match: RouterMatch,
};

export
class GiftListSearchContainer extends PureComponent{
	props: GiftListSearchProps;
	lunrIndex: Object;

	constructor(props: GiftListSearchProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
  			<Input 
  				icon='search' 
  				fluid 
  				placeholder='Restaurant, Paris ...' 
  				onChange={debounce(this.handleChange, 250)}
  			/>
  		</div>
  	);
  }
}


//store Connection
type OwnProps = { match: RouterMatch };
const mapStateToProps = (state: Object, ownProps: OwnProps): Object => {
  const giftCollection = selectors.getList(state);
  const {match} = ownProps;

	return {
		giftCollection,
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
