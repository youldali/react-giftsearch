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
import { Button, Image } from 'semantic-ui-react';
import './css/elasticSearch.css';


/**
 * [GiftListElacticSearchProps presentational component]
 * @type {Object}
 */
type GiftSearchResult = {
  "key": number,
  "id": number,
  "title": string,
  "price": string,
  "image": string
};
type GiftListElacticSearchProps = {
  onFocus: Function,
  onResultSelect: Function,
  onSearchChange: Function,
  searchValue: string,
  results: Array<GiftSearchResult>,
  isSearchActive: boolean
};

export
const GiftListElacticSearch = (props: GiftListElacticSearchProps) => {
  const inputProps = { 
    icon: 'search', 
    iconPosition: 'left', 
    fluid: true, 
    onFocus: props.onFocus,
    value: props.searchValue
  };

  return (
    <div>
      <Search 
        input={inputProps}
        fluid 
        placeholder='Restaurant, Paris ...' 
        showNoResults={false}
        onSearchChange={(e: SyntheticEvent, data: Object) => props.onSearchChange(data.value)}
        onResultSelect={(e: SyntheticEvent, data: Object) => props.onResultSelected(data.result)}
        results={props.results}
      />
      { props.isSearchActive &&
        <div className='elastic-search__filter-description'>
          Coffrets correspondant à la recherche <strong><em>{props.searchValue}</em></strong> <Button icon='delete' size='small' circular color='google plus' />
        </div>
      }
    </div>
  );
}


/**
 * [GiftListElacticSearchProps Container component]
 * @type {Object}
 */

type GiftListElacticSearchContainerProps = {
  giftCollection: GiftCollection,
  giftListFiltered: GiftCollection,
  match: RouterMatch,
  elasticSearchFilter: ?Array<number>
};


class GiftListElacticSearchContainer extends PureComponent{
  props: GiftListElacticSearchContainerProps;
  lunrIndex: Object;
  numberToShow: number;
  state: {giftsMatched: Array<GiftSearchResult>, searchValue: string};
  onSearchValueChange: Function;
  refreshSearch: Function;
  onResultSelected: Function;

  constructor(props: GiftListElacticSearchContainerProps) {
    super(props);
    this.numberToShow = 5;
    this.onSearchValueChange = this.createOnSearchValueChange().bind(this);
    this.refreshSearch = this.refreshSearch.bind(this);
    this.onResultSelected = this.onResultSelected.bind(this);
    this.state={giftsMatched: [], searchValue: ''};
  }

  componentDidMount() {
    if(this.props.giftCollection.length > 0)
      this.getIndex(this.props.match.params.universe, this.props.giftCollection);
  }

  componentWillReceiveProps(nextProps: GiftListElacticSearchContainerProps){
    const universe = this.props.match.params.universe;
    const nextUniverse = nextProps.match.params.universe;
    if(this.props.giftCollection !== nextProps.giftCollection && nextProps.giftCollection.length  > 0 ){
      this.getIndex(nextUniverse, nextProps.giftCollection);
      this.refreshSearch();
    }
  }

  getIndex(universe: string, giftCollection: GiftCollection){
    lunrHelper.getIndex(universe, giftCollection)
      .then( index => {this.lunrIndex = index; console.log(universe, this.lunrIndex);})
      .catch( e => console.log('failed loading the index'));    
  }

  searchIndex(value: string){
    if(this.lunrIndex === undefined || value.length < 3)
      return;

    const results = lunrHelper.searchIndex(value, this.lunrIndex);
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

  refreshSearch(){
    this.setState({giftsMatched: []});
    this.props.resetFilters(['elasticSearch']);
    this.props.setOrder('');
    this.searchIndex(this.state.searchValue);
  }

  createOnSearchValueChange(){
    const debouncedSearchIndex = debounce(searchValue => {
      if(this.state.giftsMatched.length > 0)
       this.setState({giftsMatched: []});
      
      this.searchIndex(searchValue);
    }, 250);

    return (value: string) => {
      this.setState({searchValue: value});
      debouncedSearchIndex(value);
    }
  }

  onResultSelected(giftSelected: GiftSearchResult){
    const selectedGiftId = giftSelected.id;
    this.resultsIds = [...this.resultsIds];
    this.resultsIds.splice(this.resultsIds.indexOf(selectedGiftId), 1);
    this.resultsIds.unshift(selectedGiftId);
    this.props.setFilters({elasticSearch: this.resultsIds});
    this.props.setOrder(this.resultsIds);
  }

  render(){
    return (
      <GiftListElacticSearch
        onFocus={this.refreshSearch}
        onResultSelected={this.onResultSelected}
        onSearchChange={this.onSearchValueChange}
        searchValue={this.state.searchValue}
        results={this.state.giftsMatched}
        isSearchActive={this.props.elasticSearchFilter !== undefined}
      />
    );
  }
}


//store Connection
type OwnProps = { match: RouterMatch };
const mapStateToProps = (state: Object, ownProps: OwnProps): Object => {
  const giftCollection = selectors.getList(state);
  const giftListFiltered = selectors.getFilteredList(state);
  const elasticSearchFilter = selectors.getFilter(state, 'elasticSearch')
  const {match} = ownProps;

	return {
		giftCollection,
		giftListFiltered,
    elasticSearchFilter,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftListElacticSearchContainer));
