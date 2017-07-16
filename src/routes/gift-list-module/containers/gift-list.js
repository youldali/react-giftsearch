//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as selectors from 'modules/gift-search/selectors';
import * as actions from 'modules/actions/gift-list-fetch';

import {GridList, GridTile} from 'material-ui/GridList';

class GiftListContainer extends Component{
	giftList: Array<Object>;

	constructor(props) {
    super(props)
    //this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchList();
    //console.log(this.props.fetchList);
  }

  componentDidUpdate(prevProps) {

  }

  render(){
  	//console.log(this.props.giftList);
  	return (
  		<div>
  			<h1>LIST</h1>
	  		<GridList>
		      {this.props.giftList.map((tile) => (
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
	const giftList = selectors.getGiftListSelector(state);

	return {
		//value: universe
		//filter,
		//order
		giftList
	}
}

function mapDispatchToProps(dispatch){
	return {
		//onChange: (e, universe) => dispatch(actions.setUniverse(universe)),
		fetchList: () => dispatch(actions.fetchGiftList('gastronomy'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListContainer);