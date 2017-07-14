//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as selectors from 'modules/gift-search/selectors';
import * as actions from 'modules/actions/gift-list';

import {GridList, GridTile} from 'material-ui/GridList';

class GiftListContainer extends Component{
	giftList: Array<Object>;

	constructor(props) {
    super(props)
    this.giftList = [];
    //this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const fetchConfig = {
			method: 'POST'
		};
		const url = '//www.smartbox.com/fr/cloudsearch/search/thematic/?sortby=position&price[from]=0&price[to]=50&pagesize=100';
		fetch(url, fetchConfig)
			.then(response => response.json())
			.then(data => {this.giftList = data.items; this.forceUpdate();});
		
  }

  componentDidUpdate(prevProps) {

  }

  render(){
  	console.log(this.giftList);
  	return (
  		<div>
  			<h1>LIST</h1>
	  		<GridList>
		      {this.giftList.map((tile) => (
		        <GridTile
		          key={tile.id}
		          title={tile.name}
		          
		        >
		          <img src={tile.img} />
		        </GridTile>
		      ))}
	 	   </GridList>
	 	  </div>
  	);
  }
}

function mapStateToProps(state){
	const universe = selectors.getUniverseSelector(state);
	const filter = selectors.getFilterSelector(state);
	const order = selectors.getOrderSelector(state);

	return {
		value: universe
		//filter,
		//order
	}
}

function mapDispatchToProps(dispatch){
	return {
		onChange: (e, universe) => dispatch(actions.setUniverse(universe))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListContainer);